import React from 'react';

export default function JobListings({ isLoading, results }) {
  if (results.length === 0) {
    return <p>Sorry! We couldn't find any listings like that.</p>;
  }

  return (
    <ul>
      {results.map((result, index) => (
        <li key={index} data-testid="listing">
          {result.id}
        </li>
      ))}
    </ul>
  );
}
