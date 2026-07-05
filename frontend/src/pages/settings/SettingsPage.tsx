import Layout from '../../components/layout/Layout';

import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../hooks/useAuth';

const SettingsPage = () => {
  const { darkMode, toggleTheme } = useTheme();
  const { user, logout } = useAuth();

  return (
    <Layout>
      {/* TOP */}

      <div className="mb-10 flex flex-col gap-6 rounded-[1.75rem] border border-slate-200/80 bg-white/85 p-8 shadow-[0_18px_60px_rgba(15,23,42,0.06)] backdrop-blur-xl dark:border-slate-700/70 dark:bg-slate-900/80 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-indigo-700 dark:border-indigo-500/20 dark:bg-indigo-500/10 dark:text-indigo-300">
            Preferences
          </div>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
            Settings
          </h1>
          <p className="mt-2 max-w-xl text-slate-600 dark:text-slate-300">
            Manage your account, appearance preferences, and logout options.
          </p>
        </div>

        <button
          onClick={toggleTheme}
          className="btn-secondary"
        >
          {darkMode ? 'Switch to Light' : 'Switch to Dark'}
        </button>
      </div>

      {/* PROFILE CARD */}

      <div className="glass-card max-w-2xl">
        <h2 className="mb-8 text-3xl font-semibold text-slate-900 dark:text-white">
          Profile Information
        </h2>

        <div className="mb-6">
          <label className="mb-2 block text-sm font-semibold text-slate-500 dark:text-slate-400">
            Name
          </label>
          <input
            type="text"
            value={user?.name || ''}
            readOnly
            className="input-field bg-slate-50 dark:bg-slate-950/80"
          />
        </div>

        <div className="mb-6">
          <label className="mb-2 block text-sm font-semibold text-slate-500 dark:text-slate-400">
            Email
          </label>
          <input
            type="email"
            value={user?.email || ''}
            readOnly
            className="input-field bg-slate-50 dark:bg-slate-950/80"
          />
        </div>

        <div className="mb-8">
          <label className="mb-2 block text-sm font-semibold text-slate-500 dark:text-slate-400">
            Role
          </label>
          <input
            type="text"
            value={user?.role || ''}
            readOnly
            className="input-field bg-slate-50 dark:bg-slate-950/80"
          />
        </div>

        <div className="flex flex-col gap-4 sm:flex-row">
          <button className="btn-primary w-full sm:w-auto">
            Update Profile
          </button>
          <button
            onClick={logout}
            className="btn-secondary w-full sm:w-auto"
          >
            Logout
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default SettingsPage;