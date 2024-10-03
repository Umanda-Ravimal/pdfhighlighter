import React from 'react';
import { render } from '@testing-library/react';

import { ActionBar } from './action-bar';

describe('Action Bar', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ActionBar />);
    expect(baseElement).toBeTruthy();
  });
});
