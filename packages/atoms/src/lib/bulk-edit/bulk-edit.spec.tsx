import { render } from '@testing-library/react';
import React from 'react';
import { BulkEdit } from './bulk-edit';

describe('BulkEdit', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<BulkEdit />);
    expect(baseElement).toBeTruthy();
  });
});
