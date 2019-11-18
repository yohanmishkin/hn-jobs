import JobListings from '../components/ui/JobListings';
import { render } from '@testing-library/react';
import React from 'react';

describe('JobListings', () => {
  it('displays listing info', () => {
    const listings = [{ description: 'hey hey hey' }];

    const { getByText } = render(<JobListings results={listings} />);

    expect(getByText('hey hey hey'));
  });
});
