import { render } from '@testing-library/react';

import { ActionTextField } from './action-text-field';
import React from 'react';

describe('ActionTextField', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ActionTextField />);
    expect(baseElement).toBeTruthy();
  });
});
