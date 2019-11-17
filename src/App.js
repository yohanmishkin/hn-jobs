import Container from './components/effects/Container';
import SearchResults from './components/effects/SearchResults';
import JobFilters from './components/ui/JobFilters';
import JobListings from './components/ui/JobListings';
import React from 'react';

function App() {
  return (
    <div className="App">
      <h1>Welcome</h1>

      <Container>
        {container => {
          if (container.isLoading) {
            return <h2 data-testid="loading">Loading...</h2>;
          }

          return (
            <SearchResults listings={container.listings}>
              {(remoteChanged, technologiesChanged, results) => (
                <div>
                  <JobFilters
                    technologiesChanged={technologiesChanged}
                    remoteChanged={remoteChanged}
                  />

                  <h2>{results.length} job listings</h2>

                  <JobListings results={results} />
                </div>
              )}
            </SearchResults>
          );
        }}
      </Container>
    </div>
  );
}

export default App;
