import { render } from '@testing-library/react';
import React from 'react';
import { EditorToolbar } from './editor-toolbar';

describe('EditorToolbar', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<EditorToolbar items={[]} />);
    expect(baseElement).toBeTruthy();
  });
});
