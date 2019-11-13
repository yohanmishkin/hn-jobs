import React from 'react';
import Select from 'react-select';

const technologies = [
  { value: 'clojure', label: 'Clojure' },
  { value: 'elm', label: 'Elm' }
];

export default function JobFilters(props) {
  const toggleRemoteJobs = event => {
    props.toggleRemote(event.target.checked);
  };

  const filterListings = ({ value: technology }) => {
    props.filterListingsByTechnology(technology);
  };

  return (
    <form>
      <label htmlFor="technologies-multi-select">Technologies</label>
      <Select
        inputId="technologies-multi-select"
        options={technologies}
        onChange={filterListings}
      />

      <label htmlFor="remote-checkbox">Remote</label>
      <input
        id="remote-checkbox"
        onChange={toggleRemoteJobs}
        type="checkbox"
        value={props.includeRemote}
      />
    </form>
  );
}
