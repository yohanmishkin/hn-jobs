import React, { useEffect, useState } from 'react';
import './App.css';
import JobListings from './components/JobListings';
import store from './components/side-effects/store';

function App() {
  const [listings, setListings] = useState([]);
  const [includeRemote, setIncludeRemote] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      let response = await fetch(
        `/api/listings?includeRemote=${includeRemote}`
      );
      let json = await response.json();
      setListings(json.listings);
    };

    fetchData();
  }, [includeRemote]);

  return (
    <div className="App">
      <h1>Welcome</h1>

      <JobFilters
        includeRemote={includeRemote}
        toggleRemote={setIncludeRemote}
      />

      <JobListings results={listings} />
    </div>
  );
}

function JobFilters(props) {
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

export default App;
