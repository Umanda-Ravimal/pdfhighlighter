import { render } from '@testing-library/react';
import React from 'react';
import { Stack } from './stack';

describe('Stack', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Stack />);
    expect(baseElement).toBeTruthy();
  });
});
