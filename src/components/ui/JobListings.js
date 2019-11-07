import React from 'react';

export default function JobListings({ isLoading, results }) {
  if (isLoading) {
    return <span data-testid="loading"></span>;
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
