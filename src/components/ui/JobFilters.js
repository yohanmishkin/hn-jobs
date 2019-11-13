import React from 'react';
import Select from 'react-select';

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
        options={[{ value: 'clojure', label: 'Clojure' }]}
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
