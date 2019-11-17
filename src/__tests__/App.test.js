import {
  fireEvent,
  render,
  waitForElementToBeRemoved
} from '@testing-library/react';
import React from 'react';
import App from '../App';
import { makeServer } from '../server';

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
    let listingA = server.create('listing', { remote: true });
    let listingB = server.create('listing', { remote: true });
    server.create('listing', { remote: false });

    const { getByTestId, getByLabelText, getByText, findByTestId } = render(
      <App />
    );

    await waitForElementToBeRemoved(() => getByTestId('loading'));

    fireEvent.click(getByLabelText('Remote'));

    await findByTestId(`listing-${listingA.id}`);
    await findByTestId(`listing-${listingB.id}`);

    expect(getByText('2 job listings'));
  });

  it('can filter by multiple technologies', async () => {
    let listingA = server.create('listing', {
      description: 'Clojure is INTRIGUING',
      remote: false
    });
    let listingB = server.create('listing', {
      description: 'Elm is COOL',
      remote: true
    });
    server.create('listing', { description: 'C is FAST' });
    server.create('listing', { description: 'Javascript' });

    const { findByTestId, getByTestId, getByLabelText, getByText } = render(
      <App />
    );

    await waitForElementToBeRemoved(() => getByTestId('loading'));

    fireEvent.change(getByLabelText('Technologies'), {
      target: { value: 'clojure' }
    });
    fireEvent.click(getByText('Clojure'));

    await findByTestId(`listing-${listingA.id}`);

    fireEvent.change(getByLabelText('Technologies'), {
      target: { value: 'elm' }
    });
    fireEvent.click(getByText('Elm'));

    await findByTestId(`listing-${listingB.id}`);
  });

  it('loading spinner displayed while fetching listings', () => {
    const { getByTestId } = render(<App />);

    expect(getByTestId('loading')).toBeDefined();
  });

  it('it shows message when no listings found', async () => {
    const { getByTestId, getByText, getByLabelText } = render(<App />);

    await waitForElementToBeRemoved(() => getByTestId('loading'));

    fireEvent.click(getByLabelText('Remote'));

    expect(
      getByText("Sorry! We couldn't find any listings like that.")
    ).toBeDefined();
  });
});
