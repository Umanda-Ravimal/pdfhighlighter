import React from 'react';
import { render } from '@testing-library/react';

import { ActionDropdown } from './action-dropdown';

describe('action-dropdown', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ActionDropdown />);
    expect(baseElement).toBeTruthy();
  });
});
