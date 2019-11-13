import FilteredListings from '../components/ui/FilteredListings';
import { render } from '@testing-library/react';
import React from 'react';

describe('FilteredListings', () => {
  it('filter the for a single technology', () => {
    let listings = [
      { description: 'Elm is cool' },
      { description: 'Python is cool' },
      { description: 'C# is cool' }
    ];

    const { getByText } = render(
      <FilteredListings listings={listings}>
        {(_, __, filteredListings, ___) => (
          <h1>{filteredListings.length} results</h1>
        )}
      </FilteredListings>
    );

    expect(getByText('0 results')).toBeDefined();
  });

  it('filter the union of multiple technologies', () => {
    let listings = [];

    const { getByText } = render(
      <FilteredListings listings={[]}>
        {(_, __, filteredListings, ___) => (
          <h1>{filteredListings.length} results</h1>
        )}
      </FilteredListings>
    );

    expect(getByText('0 results')).toBeDefined();
  });
});
