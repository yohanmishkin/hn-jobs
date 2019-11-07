import React from 'react';

export default function JobFilters(props) {
  const toggleRemoteJobs = event => {
    props.toggleRemote(event.target.checked);
  };

  return (
    <form>
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
