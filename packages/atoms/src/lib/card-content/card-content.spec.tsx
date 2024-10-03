import { render } from '@testing-library/react';
import React from 'react';
import { CardContent } from './card-content';

describe('Card', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CardContent />);
    expect(baseElement).toBeTruthy();
  });
});
