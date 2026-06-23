import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Home from './Home';

describe('Home', () => {
  it('renders welcome heading', () => {
    render(<Home />);
    expect(
      screen.getByRole('heading', { name: /welcome/i }),
    ).toBeInTheDocument();
  });

  it('creates a task from the dialog', async () => {
    const user = userEvent.setup();

    render(<Home />);

    expect(
      screen.queryByRole('heading', { name: /quick add/i }),
    ).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /new task/i }));
    await user.type(
      screen.getByRole('textbox', { name: /new task/i }),
      'Review the pull request',
    );
    await user.click(screen.getByRole('button', { name: /add task/i }));

    expect(screen.getByText('Review the pull request')).toBeInTheDocument();
    expect(
      screen.queryByRole('dialog', { name: /create task/i }),
    ).not.toBeInTheDocument();
  });
});
