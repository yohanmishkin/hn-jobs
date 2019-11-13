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

    const { getByTestId, getAllByTestId, getByLabelText, getByText } = render(
      <App />
    );

    await waitForElementToBeRemoved(() => getByTestId('loading'));

    fireEvent.click(getByLabelText('Remote'));

    let listings = await waitForElement(() => getAllByTestId('listing'));

    expect(listings.length).toBe(2);
    expect(getByText('2 job listings')).toBeDefined();
  });

  it('can filter by technology', async () => {
    server.create('listing', { description: 'C is FAST' });
    server.create('listing', { description: 'Elm is COOL' });
    server.create('listing', { description: 'Javascript' });
    server.create('listing', { description: 'Clojure is INTRIGUING' });

    const { getByTestId, getAllByTestId, getByLabelText, getByText } = render(
      <App />
    );

    await waitForElementToBeRemoved(() => getByTestId('loading'));

    fireEvent.change(getByLabelText('Technologies'), {
      target: { value: 'cloj' }
    });
    fireEvent.click(getByText('Clojure'));

    let listings = await waitForElement(() => getAllByTestId('listing'));

    expect(listings.length).toBe(1);
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
      getByText(`Sorry! We couldn't find any listings like that.`)
    ).toBeDefined();
  });
});
