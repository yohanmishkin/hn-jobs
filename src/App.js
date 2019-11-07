import React from 'react';
import './App.css';
import Container from './components/side-effects/Container';
import JobFilters from './components/ui/JobFilters';
import JobListings from './components/ui/JobListings';

function App() {
  return (
    <div className="App">
      <h1>Welcome</h1>
      <Container>
        {container => (
          <div>
            <JobFilters
              includeRemote={container.includeRemote}
              toggleRemote={container.setIncludeRemote}
            />

            <JobListings
              isLoading={container.isLoading}
              results={container.listings}
            />
          </div>
        )}
      </Container>
    </div>
  );
}

export default App;
