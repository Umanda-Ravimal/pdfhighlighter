import { render } from '@testing-library/react';

import {TableWithInlineView} from './table-with-inline-view';
import React from 'react';

describe('TableWithInlineView', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TableWithInlineView records={[]} />);
    expect(baseElement).toBeTruthy();
  });
});
