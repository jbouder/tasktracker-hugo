import { render, screen } from '@testing-library/react';
import Projects from './Projects';

describe('Projects', () => {
  it('renders project cards', () => {
    render(<Projects />);

    expect(
      screen.getByRole('heading', { name: /organize work/i }),
    ).toBeInTheDocument();
    expect(screen.getByText('Product launch')).toBeInTheDocument();
  });
});
