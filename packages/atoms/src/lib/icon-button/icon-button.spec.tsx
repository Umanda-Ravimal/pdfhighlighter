import { render } from '@testing-library/react';
import React from 'react';
import { IconButton } from './icon-button';

describe('IconButton', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<IconButton />);
    expect(baseElement).toBeTruthy();
  });
});
