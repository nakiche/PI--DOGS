import { render, screen } from '@testing-library/react';
import Welcome from './components/welcome/Welcome.jsx';


test('renders Tommys Dogs api', () => {
  render(<Welcome />);
  const linkElement = screen.getByText(/Tommy's Dogs api/i);
  expect(linkElement).toBeInTheDocument();
});