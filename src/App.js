import React from 'react';
import './App.css';
import Container from './components/side-effects/Container';
import FilteredListings from './components/ui/FilteredListings';
import JobFilters from './components/ui/JobFilters';
import JobListings from './components/ui/JobListings';

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
            <FilteredListings listings={container.listings}>
              {(
                changeRemoteness,
                changeTechnology,
                filteredListings,
                includeRemote
              ) => (
                <div>
                  <JobFilters
                    filterListingsByTechnology={changeTechnology}
                    includeRemote={includeRemote}
                    toggleRemote={changeRemoteness}
                  />

                  <h2>{filteredListings.length} job listings</h2>

                  <JobListings results={filteredListings} />
                </div>
              )}
            </FilteredListings>
          );
        }}
      </Container>
    </div>
  );
}

export default App;
