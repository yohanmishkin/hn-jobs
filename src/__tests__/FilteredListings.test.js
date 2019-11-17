import filteredListings from '../domain/filteredListings';

describe('filteredListings', () => {
  it('yields listings for a single technology', () => {
    const listings = [
      { description: 'Elm is cool' },
      { description: 'Python is cool' },
      { description: 'C# is cool' }
    ];
    const remote = false;
    const technologies = ['elm'];

    expect(filteredListings(listings, technologies, remote).length).toBe(1);
  });

  it('yields the union of multiple technologies', () => {
    const listings = [
      { description: 'Elm is cool' },
      { description: 'Python is cool' },
      { description: 'C# is cool' }
    ];
    const remote = false;
    const technologies = ['elm', 'python'];

    expect(filteredListings(listings, technologies, remote).length).toBe(2);
  });

  it('yields the intersection of remoteness and multiple technologies', () => {
    const listings = [
      { description: 'Elm is cool', remote: true },
      { description: 'Python is cool', remote: false },
      { description: 'C# is cool', remote: true }
    ];
    const remote = true;
    const technologies = ['elm', 'python'];

    expect(filteredListings(listings, technologies, remote).length).toBe(1);
  });

  it('yields all remote listings if no technologies provided', () => {
    const listings = [
      { description: 'Elm is cool', remote: true },
      { description: 'Python is cool', remote: false },
      { description: 'C# is cool', remote: true }
    ];
    const remote = true;
    const technologies = [];

    expect(filteredListings(listings, technologies, remote).length).toBe(2);
  });

  it('yields both remote and in-office listings if remote not specifically expected', () => {
    const listings = [
      { description: 'Elm is cool', remote: true },
      { description: 'Python is cool', remote: false },
      { description: 'C# is cool', remote: true }
    ];
    const remote = false;
    const technologies = ['elm', 'python'];

    expect(filteredListings(listings, technologies, remote).length).toBe(2);
  });
});
