import React, { useEffect, useState } from 'react';
import './App.css';
import FetchedListings from './components/side-effects/FetchedListings';
import JobFilters from './components/ui/JobFilters';
import JobListings from './components/ui/JobListings';
import store from './components/side-effects/store';

function App() {
  const [listings, setListings] = useState([]);
  const [includeRemote, setIncludeRemote] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      let response = await fetch(
        `/api/listings?includeRemote=${includeRemote}`
      );
      let json = await response.json();
      setListings(json.listings);
      setIsLoading(false);
    };

    fetchData();
  }, [includeRemote]);

  return (
    <div className="App">
      <h1>Welcome</h1>
      <React.Fragment>
        <JobFilters
          includeRemote={includeRemote}
          toggleRemote={setIncludeRemote}
        />

        <JobListings isLoading={isLoading} results={listings} />
      </React.Fragment>
    </div>
  );
}

export default App;
