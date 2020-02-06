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
    <form className="mb-2 flex" onSubmit={e => e.preventDefault()}>
      <fieldset className="flex flex-col flex-grow-1 pr-2">
        <label className="color-green mb-25 size-115" htmlFor="technologies-multi-select">Technologies</label>
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

      <fieldset className="flex flex-col">
        <label className="color-green mb-25 size-115" htmlFor="remote-checkbox">Remote</label>
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
