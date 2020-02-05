import ProgressBar from '../components/ui/ProgressBar';
import { render } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom'

describe('ProgressBar', () => {
  it('displays zero completion by default', () => {
    const { container } = render(<ProgressBar />);

    expect(container.querySelector('progress')).toHaveAttribute('value', '0');
  });

  it('displays completion percentage', () => {
    const { container } = render(<ProgressBar complete={2} toComplete={4} />);

    expect(container.querySelector('progress')).toHaveAttribute('value', '2');
    expect(container.querySelector('progress')).toHaveAttribute('max', '4');
  });
});
