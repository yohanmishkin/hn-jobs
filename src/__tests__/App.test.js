import App from '../App';
import { Polly } from '@pollyjs/core';
import XHRAdapter from '@pollyjs/adapter-xhr';
import FSPersister from '@pollyjs/persister-fs';
import {
  fireEvent,
  render,
  waitForElementToBeRemoved
} from '@testing-library/react';
import React from 'react';
import { setupPolly } from 'setup-polly-jest';

Polly.register(XHRAdapter);
Polly.register(FSPersister);

describe('gnews', () => {
  let context = setupPolly({
    adapters: ['xhr'],
    persister: 'fs'
  });

  beforeEach(() => {
    context.polly.configure({ recordIfMissing: true });
  });

  afterEach(async () => {
    await context.polly.flush();
  });

  it('renders without crashing', () => {
    const { getByText } = render(<App />);

    expect(getByText('Welcome'));
  });

  it('can filter for remote listings', async () => {
    const { getByTestId, getByLabelText, getByText } = render(<App />);

    await waitForElementToBeRemoved(() => getByTestId('loading'), {
      timeout: 10000
    });

    expect(getByText('664 job listings'));

    fireEvent.click(getByLabelText('Remote'));

    expect(getByText('220 job listings'));
  });

  it('can filter by multiple technologies', async () => {
    const { getByTestId, getByLabelText, getByText } = render(<App />);

    await waitForElementToBeRemoved(() => getByTestId('loading'), {
      timeout: 10000
    });

    expect(getByText('664 job listings'));

    fireEvent.change(getByLabelText('Technologies'), {
      target: { value: 'clojure' }
    });
    fireEvent.click(getByText('Clojure'));

    expect(getByText('14 job listings'));

    fireEvent.change(getByLabelText('Technologies'), {
      target: { value: 'elm' }
    });
    fireEvent.click(getByText('Elm'));

    expect(getByText('17 job listings'));
  });

  it('loading spinner displayed while fetching listings', () => {
    const { getByTestId } = render(<App />);

    expect(getByTestId('loading'));
  });

  it('it shows message when no listings found', async () => {
    const { getByTestId, getByText, getByLabelText } = render(<App />);

    await waitForElementToBeRemoved(() => getByTestId('loading'), {
      timeout: 10000
    });

    fireEvent.change(getByLabelText('Technologies'), {
      target: { value: 'ocaml' }
    });
    fireEvent.click(getByText('Ocaml'));

    fireEvent.click(getByLabelText('Remote'));

    expect(getByText("Sorry! We couldn't find any listings like that."));
  });
});
