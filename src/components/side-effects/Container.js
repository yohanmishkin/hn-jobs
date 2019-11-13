import { useEffect, useState } from 'react';

export default function(props) {
  const [listings, setListings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isCancelled = false;

    const fetchData = async () => {
      setIsLoading(true);

      let response = await fetch(`/api/listings`);
      let json = await response.json();

      if (!isCancelled) {
        setListings(json);
        setIsLoading(false);
      }
    };

    fetchData();

    return () => {
      isCancelled = true;
    };
  }, []);

  return props.children({
    isLoading,
    listings
  });
}
