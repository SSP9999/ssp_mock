import { render, screen } from '@testing-library/react';
import App from './App';

test('renders login page with SSO button', () => {
  render(<App />);
  const loginHeader = screen.getAllByText(/Login/i)[0];
  expect(loginHeader).toBeInTheDocument();

  const ssoButton = screen.getByText(/Login with SSO/i);
  expect(ssoButton).toBeInTheDocument();
});

test('shows processing state when sso_token is in URL', () => {
  // Mock window.location.search
  delete window.location;
  window.location = new URL('http://localhost/?sso_token=test-token');

  render(<App />);
  const processingText = screen.getByText(/Processing SSO login.../i);
  expect(processingText).toBeInTheDocument();
});
