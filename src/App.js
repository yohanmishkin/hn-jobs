import React, { useState } from 'react';
import './App.css';
import JobListings from './components/JobListings';

function App() {
  let results = [{}, {}];
  let fetchListings = params => {
    console.log('fetching listings...', params);
  };

  return (
    <div className="App">
      <h1>Welcome</h1>

      <JobFilters fetchListings={fetchListings} />
      <JobListings results={results} />
    </div>
  );
}

function JobFilters(props) {
  const [includeRemote, setIncludeRemote] = useState(false);

  const toggleRemoteJobs = event => {
    let includeRemote = event.target.checked;
    props.fetchListings(includeRemote);
    setIncludeRemote(includeRemote);
  };

  return (
    <form>
      <label htmlFor="remote-checkbox">Remote</label>

      <input
        id="remote-checkbox"
        onChange={toggleRemoteJobs}
        type="checkbox"
        value={includeRemote}
      />
    </form>
  );
}

export default App;
