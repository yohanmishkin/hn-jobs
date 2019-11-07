import { useEffect, useState } from 'react';

export default function(props) {
  const [listings, setListings] = useState([]);
  const [includeRemote, setIncludeRemote] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      let response = await fetch(
        `/api/listings?includeRemote=${includeRemote}`
      );
      let json = await response.json();
      setListings(json.listings);
      setIsLoading(false);
    };

    fetchData();
  }, [includeRemote]);

  return props.children({
    includeRemote,
    setIncludeRemote,
    isLoading,
    listings
  });
}
