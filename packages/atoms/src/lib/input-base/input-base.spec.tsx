import { render } from '@testing-library/react';
import React from 'react';
import { InputBase } from './input-base';

describe('TextField', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<InputBase name={''} placeholder={''} />);
    expect(baseElement).toBeTruthy();
  });
});
