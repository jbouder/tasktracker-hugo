import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createStore, Provider as JotaiProvider } from 'jotai';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { sidebarOpenAtom } from '@/store/appAtoms';
import AppShell from './AppShell';

function renderShell(initialEntry = '/') {
  const store = createStore();
  store.set(sidebarOpenAtom, true);

  return render(
    <ThemeProvider>
      <JotaiProvider store={store}>
        <MemoryRouter initialEntries={[initialEntry]}>
          <AppShell>
            <div>Page content</div>
          </AppShell>
        </MemoryRouter>
      </JotaiProvider>
    </ThemeProvider>,
  );
}

describe('AppShell', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders sidebar navigation and page content', () => {
    renderShell();

    const mainNav = screen.getByRole('navigation', { name: 'Main' });
    expect(mainNav).toBeInTheDocument();
    expect(
      within(mainNav).getByRole('link', { name: /dashboard/i }),
    ).toHaveAttribute('href', '/');
    expect(
      within(mainNav).getByRole('link', { name: /projects/i }),
    ).toHaveAttribute('href', '/projects');
    expect(screen.getByText('Page content')).toBeInTheDocument();
  });

  it('collapses the sidebar', async () => {
    renderShell();

    await userEvent.click(
      screen.getByRole('button', { name: /collapse sidebar/i }),
    );

    expect(
      screen.getByRole('button', { name: /expand sidebar/i }),
    ).toHaveAttribute('aria-expanded', 'false');
  });

  it('shows the active page title in the header', () => {
    renderShell('/reports');

    expect(
      screen.getByRole('heading', { name: 'Reports' }),
    ).toBeInTheDocument();
  });
});
