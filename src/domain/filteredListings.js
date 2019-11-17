export default function(listings, technologies, remote) {
  const remoteFilter = listing => {
    if (remote) {
      return listing.remote === remote;
    }

    return true;
  };

  const technologyFilter = listing => {
    if (technologies.length === 0) {
      return true;
    }

    return technologies.some(technology =>
      listing.description.toUpperCase().includes(technology.toUpperCase())
    );
  };

  return listings.filter(
    listing => technologyFilter(listing) && remoteFilter(listing)
  );
}
