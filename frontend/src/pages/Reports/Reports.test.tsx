import { render, screen } from '@testing-library/react';
import Reports from './Reports';

describe('Reports', () => {
  it('renders report stats', () => {
    render(<Reports />);

    expect(
      screen.getByRole('heading', { name: /understand your task flow/i }),
    ).toBeInTheDocument();
    expect(screen.getByText('Completed')).toBeInTheDocument();
  });
});
