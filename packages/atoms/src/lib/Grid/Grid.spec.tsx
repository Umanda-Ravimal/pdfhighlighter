import { render } from '@testing-library/react';
import React from 'react';
import { Grid } from './grid';

describe('Grid', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Grid />);
    expect(baseElement).toBeTruthy();
  });
});
