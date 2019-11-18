import filteredListings from '../../domain/filteredListings';
import { useEffect, useState } from 'react';

export default function SearchResults(props) {
  const [remote, remoteChanged] = useState(false);
  const [technologies, technologiesChanged] = useState([]);
  const [results, setResults] = useState([]);

  useEffect(() => {
    setResults(filteredListings(props.listings, technologies, remote));
  }, [props.listings, remote, technologies]);

  return props.children(remoteChanged, technologiesChanged, results);
}
