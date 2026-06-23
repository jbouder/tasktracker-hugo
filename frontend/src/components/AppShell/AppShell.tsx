import { useAtom } from 'jotai';
import {
  BarChart3,
  FolderKanban,
  LayoutDashboard,
  ListTodo,
  Menu,
  Moon,
  PanelLeftClose,
  PanelLeftOpen,
  Sun,
} from 'lucide-react';
import type { ReactNode } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { useTheme } from '@/providers/ThemeProvider';
import { sidebarOpenAtom } from '@/store/appAtoms';

const navItems = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/projects', label: 'Projects', icon: FolderKanban },
  { to: '/reports', label: 'Reports', icon: BarChart3 },
];

const pageTitles: Record<string, string> = {
  '/': 'Dashboard',
  '/projects': 'Projects',
  '/reports': 'Reports',
};

function AppShell({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useAtom(sidebarOpenAtom);
  const { pathname } = useLocation();
  const { theme, setTheme } = useTheme();
  const pageTitle = pageTitles[pathname] ?? 'TaskTracker';
  const nextTheme = theme === 'dark' ? 'light' : 'dark';

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flex min-h-screen w-full">
        <aside
          className={cn(
            'hidden border-sidebar-border border-r bg-sidebar text-sidebar-foreground md:flex md:flex-col',
            sidebarOpen ? 'w-64' : 'w-20',
          )}
        >
          <div className="flex h-16 items-center gap-3 px-4">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
              <ListTodo className="size-5" />
            </span>
            {sidebarOpen && (
              <div className="min-w-0">
                <p className="truncate font-semibold">TaskTracker</p>
                <p className="truncate text-muted-foreground text-xs">
                  Nebari workspace
                </p>
              </div>
            )}
          </div>
          <Separator />
          <nav className="flex flex-1 flex-col gap-2 p-3" aria-label="Main">
            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  title={!sidebarOpen ? item.label : undefined}
                  className={({ isActive }) =>
                    cn(
                      'flex h-10 items-center rounded-md px-3 font-medium text-sm outline-none motion-safe:transition-[color,background-color] motion-safe:duration-[--duration-fast] motion-safe:ease-[--ease-standard] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 focus-visible:ring-sidebar-ring',
                      sidebarOpen ? 'gap-3' : 'justify-center',
                      isActive &&
                        'bg-sidebar-accent text-sidebar-accent-foreground',
                    )
                  }
                >
                  <Icon className="size-4 shrink-0" />
                  {sidebarOpen && <span>{item.label}</span>}
                </NavLink>
              );
            })}
          </nav>
          <div className="border-sidebar-border border-t p-3">
            <Button
              type="button"
              variant="ghost"
              className={cn('w-full', sidebarOpen ? 'justify-start' : 'px-0')}
              onClick={() => setSidebarOpen((open) => !open)}
              aria-expanded={sidebarOpen}
              aria-label={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
            >
              {sidebarOpen ? <PanelLeftClose /> : <PanelLeftOpen />}
              {sidebarOpen && <span>Collapse</span>}
            </Button>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background/95 px-4 backdrop-blur md:px-6">
            <div className="flex min-w-0 items-center gap-3">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setSidebarOpen((open) => !open)}
                aria-expanded={sidebarOpen}
                aria-label="Toggle sidebar"
              >
                <Menu />
              </Button>
              <div className="min-w-0">
                <p className="text-muted-foreground text-xs">TaskTracker</p>
                <h1 className="truncate font-semibold text-lg tracking-tight">
                  {pageTitle}
                </h1>
              </div>
            </div>
            <Button
              type="button"
              variant="outline"
              onClick={() => setTheme(nextTheme)}
              aria-label={`Switch to ${nextTheme} theme`}
            >
              {theme === 'dark' ? <Sun /> : <Moon />}
              <span className="hidden sm:inline">
                {theme === 'dark' ? 'Light' : 'Dark'}
              </span>
            </Button>
          </header>
          {sidebarOpen && (
            <nav
              className="grid gap-2 border-b bg-sidebar p-3 text-sidebar-foreground md:hidden"
              aria-label="Mobile main"
            >
              {navItems.map((item) => {
                const Icon = item.icon;

                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.end}
                    onClick={() => setSidebarOpen(false)}
                    className={({ isActive }) =>
                      cn(
                        'flex h-10 items-center gap-3 rounded-md px-3 font-medium text-sm outline-none hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 focus-visible:ring-sidebar-ring',
                        isActive &&
                          'bg-sidebar-accent text-sidebar-accent-foreground',
                      )
                    }
                  >
                    <Icon className="size-4" />
                    {item.label}
                  </NavLink>
                );
              })}
            </nav>
          )}
          <main className="flex w-full flex-1 flex-col p-4 md:p-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}

export default AppShell;
