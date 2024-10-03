import { render } from '@testing-library/react';

import SignInForm from './signin-form';

describe('SignInForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SignInForm />);
    expect(baseElement).toBeTruthy();
  });
});
