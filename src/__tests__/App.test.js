import App from '../App';
import { Polly } from '@pollyjs/core';
import FSPersister from '@pollyjs/persister-fs';
import NodeHttpAdapter from '@pollyjs/adapter-node-http';
import {
  fireEvent,
  render,
  waitForElementToBeRemoved
} from '@testing-library/react';
import React from 'react';
import { setupPolly } from 'setup-polly-jest';

Polly.register(NodeHttpAdapter);
Polly.register(FSPersister);

describe('hn-jobs', () => {
  let context = setupPolly({
    adapters: ['node-http'],
    persister: 'fs'
  });

  beforeEach(() => {
    context.polly.configure({ recordIfMissing: true });
  });

  afterEach(async () => {
    await context.polly.flush();
  });

  it('can filter for remote listings', async () => {
    const { getByTestId, getByLabelText, getByText } = render(<App />);

    await waitForElementToBeRemoved(() => getByTestId('loading'), {
      timeout: 10000
    });

    expect(getByText('409 job listings'));

    fireEvent.click(getByLabelText('Remote'));

    expect(getByText('147 job listings'));
  });

  it('can filter by multiple technologies', async () => {
    const { getByTestId, getByLabelText, getByText } = render(<App />);

    await waitForElementToBeRemoved(() => getByTestId('loading'), {
      timeout: 10000
    });

    expect(getByText('409 job listings'));

    fireEvent.change(getByLabelText('Technologies'), {
      target: { value: 'clojure' }
    });
    fireEvent.click(getByText('Clojure'));

    expect(getByText('7 job listings'));

    fireEvent.change(getByLabelText('Technologies'), {
      target: { value: 'elm' }
    });
    fireEvent.click(getByText('Elm'));

    expect(getByText('8 job listings'));
  });

  it('loading spinner displayed while fetching listings', async () => {
    const { getByTestId } = render(<App />);

    expect(getByTestId('loading'));
  });

  it('it shows message when no listings found', async () => {
    const { getByTestId, getByText, getByLabelText } = render(<App />);

    await waitForElementToBeRemoved(() => getByTestId('loading'), {
      timeout: 10000
    });

    fireEvent.change(getByLabelText('Technologies'), {
      target: { value: 'foundationdb' }
    });
    fireEvent.click(getByText('Foundationdb'));

    fireEvent.click(getByLabelText('Remote'));

    expect(getByText("Sorry! We couldn't find any listings like that."));
  });
});
