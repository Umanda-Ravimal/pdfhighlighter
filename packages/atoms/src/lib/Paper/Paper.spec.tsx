import { render } from '@testing-library/react';
import React from 'react';
import { Paper } from './paper';

describe('Paper', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Paper />);
    expect(baseElement).toBeTruthy();
  });
});
