import FilteredListings from '../components/domain/FilteredListings';

describe('FilteredListings', () => {
  it('filters single technology', () => {
    let listings = [
      { description: 'Elm is cool' },
      { description: 'Python is cool' },
      { description: 'C# is cool' }
    ];

    expect(FilteredListings(listings, ['elm']).length).toBe(1);
  });

  it('filters the union of multiple technologies', () => {
    let listings = [
      { description: 'Elm is cool' },
      { description: 'Python is cool' },
      { description: 'C# is cool' }
    ];

    expect(FilteredListings(listings, ['elm', 'python']).length).toBe(2);
  });

  it('filters the intersection of remoteness and multiple technologies', () => {
    let listings = [
      { description: 'Elm is cool', remote: true },
      { description: 'Python is cool', remote: false },
      { description: 'C# is cool', remote: true }
    ];

    expect(FilteredListings(listings, ['elm', 'python'], true).length).toBe(1);
  });
});
