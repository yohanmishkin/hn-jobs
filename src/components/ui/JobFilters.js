import technologies from '../../domain/technologies';
import React from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';

const JobFilters = function jobFilters(props) {
  const toggleRemoteJobs = event => {
    props.remoteChanged(event.target.checked);
  };

  const updateTechnologies = technologies => {
    props.technologiesChanged((technologies || []).map(tech => tech.value));
  };

  return (
    <form>
      <label htmlFor="technologies-multi-select">Technologies</label>
      <Select
        inputId="technologies-multi-select"
        isMulti={true}
        options={technologies.map(t => ({
          value: t,
          label: t
        }))}
        onChange={updateTechnologies}
      />

      <label htmlFor="remote-checkbox">Remote</label>
      <input id="remote-checkbox" onChange={toggleRemoteJobs} type="checkbox" />
    </form>
  );
};

JobFilters.propTypes = {
  technologiesChanged: PropTypes.func.isRequired,
  remoteChanged: PropTypes.func.isRequired
};

export default JobFilters;
