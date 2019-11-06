import App from '../App';
import { makeServer } from '../server';
import {
  fireEvent,
  getByLabelText,
  render,
  waitForElement,
  waitForElementToBeRemoved
} from '@testing-library/react';
import React from 'react';

describe('gnews', () => {
  let server;

  beforeEach(() => {
    server = makeServer({ environment: 'test' });
  });

  afterEach(() => {
    server.shutdown();
  });

  it('renders without crashing', () => {
    const { getByText } = render(<App />);

    expect(getByText('Welcome')).toBeDefined();
  });

  it('can filter for remote listings', async () => {
    server.create('listing', { remote: false });
    server.create('listing', { remote: true });
    server.create('listing', { remote: true });

    const { container, getAllByTestId } = render(<App />);

    fireEvent.click(getByLabelText(container, 'Remote'));

    let listings = await waitForElement(() => getAllByTestId('listing'));

    expect(listings.length).toBe(2);
  });

  it('loading spinner displayed while fetching listings', () => {
    const { container, getAllByTestId } = render(<App />);

    fireEvent.click(getByLabelText(container, 'Remote'));

    let loadingSpinner = getAllByTestId('loading');

    expect(loadingSpinner).toBeDefined();
  });

  it.skip('it shows message when no listings found', () => {});
});
