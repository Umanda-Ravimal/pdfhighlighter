import React from 'react';
import { render } from '@testing-library/react';

import { SearchBar } from './search-bar';

describe('SearchBar', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SearchBar name={''} placeholder={''} />);
    expect(baseElement).toBeTruthy();
  });
});
