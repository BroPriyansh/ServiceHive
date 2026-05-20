import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import type { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const navItems = [
  { label: 'Dashboard', path: '/dashboard' },
  { label: 'Leads', path: '/leads' },
  { label: 'Settings', path: '/settings' },
];

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const { darkMode } = useTheme();

  return (
    <div
      className={`flex min-h-screen overflow-hidden transition-colors duration-300 ${
        darkMode
          ? 'bg-slate-950 text-slate-100'
          : 'bg-slate-100 text-slate-900'
      }`}
    >
      <aside
        className="hidden min-h-screen w-72 flex-col border-r border-slate-200/80 bg-white/90 p-6 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/90 md:flex"
      >
        <div className="mb-10">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-cyan-500">
                ServiceHive
              </p>
              <h1 className="text-3xl font-semibold tracking-tight">
                CRM Studio
              </h1>
            </div>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Smart lead management. Faster follow-ups. Clear results.
          </p>
        </div>

        <nav className="space-y-3">
          {navItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link key={item.path} to={item.path}>
                <div
                  className={`group flex items-center gap-3 rounded-3xl px-4 py-4 text-sm font-medium transition-all duration-200 ${
                    active
                      ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/20'
                      : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
                  }`}
                >
                  <span className="h-2.5 w-2.5 rounded-full bg-cyan-500 opacity-90" />
                  {item.label}
                </div>
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto rounded-3xl border border-slate-200/70 bg-slate-50 p-4 text-sm text-slate-600 dark:border-slate-700/70 dark:bg-slate-900 dark:text-slate-300">
          <p className="font-semibold">Need a refresh?</p>
          <p className="mt-2 text-sm leading-6">
            Toggle dark mode in-app and keep your workspace polished and readable.
          </p>
        </div>
      </aside>

      <div className="flex-1">
        <div className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/80 px-6 py-4 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/80 md:hidden">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-cyan-500">
                ServiceHive
              </p>
              <h2 className="text-xl font-semibold">CRM Studio</h2>
            </div>
          </div>
        </div>

        <main className="p-6 md:p-10">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
