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
    <form className="mb-1 flex">
      <fieldset className="flex-grow-1">
        <label className="size-115" htmlFor="technologies-multi-select">Technologies</label>
        <Select
          classNamePrefix="tech-select"
          inputId="technologies-multi-select"
          isMulti={true}
          options={technologies.map(t => ({
            value: t,
            label: t
          }))}
          onChange={updateTechnologies}
        />
      </fieldset>

      <fieldset className="flex">
        <label className="size-115" htmlFor="remote-checkbox">Remote</label>
        <input id="remote-checkbox" onChange={toggleRemoteJobs} type="checkbox" />
      </fieldset>
    </form>
  );
};

JobFilters.propTypes = {
  technologiesChanged: PropTypes.func.isRequired,
  remoteChanged: PropTypes.func.isRequired
};

export default JobFilters;
