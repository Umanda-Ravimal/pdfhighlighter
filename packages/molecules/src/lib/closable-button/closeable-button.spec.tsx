import { render } from '@testing-library/react';

import { CloseableButton } from './closeable-button';
import React from 'react';

describe('CloseableButton', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <CloseableButton icon={undefined} label={''} url={''} active={false} />
    );
    expect(baseElement).toBeTruthy();
  });
});
