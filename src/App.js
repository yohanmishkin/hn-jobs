import React from 'react';
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

class JobFilters extends React.Component {
  constructor(props) {
    super(props);
    this.state = { includeRemote: false };

    this.toggleRemoteJobs = this.toggleRemoteJobs.bind(this);
  }

  toggleRemoteJobs(event) {
    let includeRemote = event.target.checked;
    this.props.fetchListings(includeRemote);
    this.setState({ includeRemote });
  }

  render() {
    return (
      <form>
        <label htmlFor="remote-checkbox">Remote</label>

        <input
          id="remote-checkbox"
          onChange={this.toggleRemoteJobs}
          type="checkbox"
          value={this.state.includeRemote}
        />
      </form>
    );
  }
}

export default App;
