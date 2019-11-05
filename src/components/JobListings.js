import React from 'react';

export default function JobListings(props) {
  return (
    <ul>
      {props.results.map((result, index) => (
        <li key={index} data-testid="listing"></li>
      ))}
    </ul>
  );
}
