import { useEffect, useState } from 'react';

const HACKER_NEWS_API = 'https://hacker-news.firebaseio.com';

export default function(props) {
  const [listings, setListings] = useState([]);
  const [requestCount, setRequestCount] = useState(0);
  const [completedRequests, setCompletedRequests] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isCancelled = false;

    const fetchData = async () => {
      setIsLoading(true);

      let latestWhoIsHiringId = await getLatestWhoIsHiring();

      let listingIds = await getListingIds(latestWhoIsHiringId);

      setRequestCount(listingIds.length);

      let listingResponses = await Promise.all(
        listingIds.map(id =>
          fetch(`${HACKER_NEWS_API}/v0/item/${id}.json`).then(response => {
            setCompletedRequests(previous => previous + 1);
            return response;
          })
        )
      );

      let jsonListings = await Promise.all(
        listingResponses.map(resp => resp.json())
      );

      let mungedListings = jsonListings
        .filter(
          jsonListing =>
            jsonListing.text !== null && jsonListing.text !== undefined
        )
        .map(jsonListing => ({
          description: jsonListing.text,
          id: jsonListing.id,
          remote: jsonListing.text.toUpperCase().includes('REMOTE')
        }));

      if (!isCancelled) {
        setListings(mungedListings);
        setIsLoading(false);
      }
    };

    fetchData();

    return function cleanup() {
      isCancelled = true;
    };
  }, []);

  return props.children({
    isLoading,
    listings,
    requestCount,
    completedRequests
  });
}

async function getLatestWhoIsHiring() {
  let response = await fetch(
    `${HACKER_NEWS_API}/v0/user/whoishiring.json`
  );

  let {
    submitted: [latestWhoIsHiringId]
  } = await response.json();

  return latestWhoIsHiringId;
}

async function getListingIds(latestWhoIsHiringId) {
  let whoIsHiringRequest = await fetch(
    `${HACKER_NEWS_API}/v0/item/${latestWhoIsHiringId}.json`
  );

  let { kids: listingIds } = await whoIsHiringRequest.json();
  
  return listingIds;
}
