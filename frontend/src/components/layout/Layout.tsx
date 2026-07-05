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
          ? 'bg-[#090d16] text-slate-100'
          : 'bg-[radial-gradient(circle_at_top_left,rgba(99,102,241,0.10),transparent_24%),radial-gradient(circle_at_top_right,rgba(59,130,246,0.08),transparent_20%),linear-gradient(135deg,#f7f7fb_0%,#f4f6fb_44%,#f8f4fb_100%)] text-slate-900'
      }`}
    >
      <aside
        className={`hidden min-h-screen w-72 flex-col border-r p-6 backdrop-blur-xl md:flex ${
          darkMode
            ? 'border-slate-800/90 bg-slate-950/85'
            : 'border-slate-200/80 bg-white/80 shadow-[12px_0_40px_rgba(15,23,42,0.06)]'
        }`}
      >
        <div className="mb-10">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-cyan-500">
                ServiceHive
              </p>
              <h1 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">
                CRM Studio
              </h1>
            </div>
          </div>
          <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
            Smart lead management. Faster follow-ups. Clear results.
          </p>
        </div>

        <nav className="space-y-3">
          {navItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link key={item.path} to={item.path}>
                <div
                  className={`group flex items-center gap-3 rounded-2xl px-4 py-3.5 text-sm font-semibold transition-all duration-200 ${
                    active
                      ? 'bg-slate-900 text-white shadow-[0_10px_24px_rgba(15,23,42,0.14)] dark:bg-indigo-500 dark:text-slate-950'
                      : '!text-slate-900 hover:bg-slate-100 hover:shadow-sm dark:!text-slate-200 dark:hover:bg-slate-800'
                  }`}
                >
                  <span className="h-2.5 w-2.5 rounded-full bg-cyan-500 opacity-90" />
                  {item.label}
                </div>
              </Link>
            );
          })}
        </nav>

        <div className={`mt-auto rounded-3xl border p-4 text-sm ${
          darkMode
            ? 'border-slate-700/70 bg-slate-900 text-slate-300'
            : 'border-slate-200/80 bg-slate-50 text-slate-700 shadow-sm'
        }`}>
          <p className="font-semibold">Need a refresh?</p>
          <p className="mt-2 text-sm leading-6">
            Toggle dark mode in-app and keep your workspace polished and readable.
          </p>
        </div>
      </aside>

      <div className="flex-1">
        <div className={`sticky top-0 z-20 border-b px-6 py-4 backdrop-blur-xl md:hidden ${
          darkMode
            ? 'border-slate-800 bg-slate-950/80'
            : 'border-slate-200/80 bg-white/80 shadow-sm'
        }`}>
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
