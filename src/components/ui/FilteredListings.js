import React, { useState } from 'react';

export default function FilteredListings(props) {
  const [includeRemote, setIncludeRemote] = useState(false);
  const [filteredListings, setListings] = useState(props.listings);

  const changeRemoteness = isRemote => {
    setListings(props.listings.filter(listing => listing.remote === isRemote));
    setIncludeRemote(isRemote);
  };

  const filterByTechnology = technology => {
    setListings(
      props.listings.filter(listing =>
        listing.description.toUpperCase().includes(technology.toUpperCase())
      )
    );
  };

  const [byRemoteness, _] = useState(() => {});
  const [byTechnologies, __] = useState(() => {});
  const listings = props.listings.filter(byRemoteness).filter(byTechnologies);
  // const updateRemoteness =

  return props.children(
    changeRemoteness,
    filterByTechnology,
    filteredListings,
    includeRemote
  );
}
