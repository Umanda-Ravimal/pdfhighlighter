import { render } from '@testing-library/react';
import React from 'react';
import { Link } from './link';

describe('Link', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Link />);
    expect(baseElement).toBeTruthy();
  });
});
