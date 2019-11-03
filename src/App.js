import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Welcome</h1>
      <label htmlFor="remote-checkbox">Remote</label>
      <input id="remote-checkbox" type="checkbox" />
      <JobListingResults />
    </div>
  );
}

function JobListingResults(props) {
  return (
    <ul>
      <li data-testid="listing"></li>
    </ul>
  );
}

export default App;
