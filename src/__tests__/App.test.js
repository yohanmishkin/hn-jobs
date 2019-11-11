import App from '../App';
import { makeServer } from '../server';
import {
  fireEvent,
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

    const { container, getAllByTestId, getByLabelText, getByText } = render(
      <App />
    );

    fireEvent.click(getByLabelText('Remote'));

    let listings = await waitForElement(() => getAllByTestId('listing'));

    expect(listings.length).toBe(2);
    expect(getByText('2 job listings')).toBeDefined();
  });

  it('loading spinner displayed while fetching listings', () => {
    const { container, getAllByTestId, getByLabelText } = render(<App />);

    fireEvent.click(getByLabelText('Remote'));

    let loadingSpinner = getAllByTestId('loading');

    expect(loadingSpinner).toBeDefined();
  });

  it('it shows message when no listings found', async () => {
    const { container, getByTestId, getByText, getByLabelText } = render(
      <App />
    );

    fireEvent.click(getByLabelText('Remote'));

    await waitForElementToBeRemoved(() => getByTestId('loading'));

    expect(
      getByText(`Sorry! We couldn't find any listings like that.`)
    ).toBeDefined();
  });
});
