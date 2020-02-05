import React from 'react';

export default function JobListings({ isLoading, results }) {
  if (results.length === 0) {
    return <h2 className="heading">Sorry! We couldn&apos;t find any listings like that.</h2>;
  }

  return (
    <ul>
      {results.map((result, index) => (
        <li key={index} className="mb-1" data-testid={`listing-${result.id}`}>
          <h3 className="heading mb-25">{result.description.substring(0, result.description.indexOf('<p>'))}</h3>
          <p>{result.description.substring(result.description.indexOf('<p>'))}</p>
        </li>
      ))}
    </ul>
  );
}
