import App from '../App';
import { makeServer } from '../server';
import { fireEvent, getByLabelText, render } from '@testing-library/react';
import React from 'react';

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

it('can filter for remote listings', () => {
  server.create('listing', { remote: false });
  server.create('listing', { remote: true });
  server.create('listing', { remote: true });

  const { container, getAllByTestId } = render(<App />);

  fireEvent.click(getByLabelText(container, 'Remote'));

  expect(getAllByTestId('listing').length).toBe(2);
});

it.skip('it shows message when no listings found', () => {});
