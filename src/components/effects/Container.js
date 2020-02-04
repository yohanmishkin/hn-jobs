import { useEffect, useState } from 'react';

export default function(props) {
  const [listings, setListings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isCancelled = false;

    const fetchData = async () => {
      setIsLoading(true);

      let response = await fetch(
        `https://hacker-news.firebaseio.com/v0/user/whoishiring.json`
      );
      let {
        submitted: [latestWhoIsHiringId]
      } = await response.json();
      let whoIsHiringRequest = await fetch(
        `https://hacker-news.firebaseio.com/v0/item/${latestWhoIsHiringId}.json`
      );
      let { kids: listingIds } = await whoIsHiringRequest.json();
      let listingResponses = await Promise.all(
        listingIds.map(id =>
          fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
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
    listings
  });
}
