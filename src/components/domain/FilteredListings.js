export default function(listings, technologies, remote) {
  const remoteFilter = listing => listing.remote === remote;

  const technologyFilter = listing =>
    technologies.some(technology =>
      listing.description.toUpperCase().includes(technology.toUpperCase())
    );

  return listings.filter(
    listing => technologyFilter(listing) && remoteFilter(listing)
  );
}
