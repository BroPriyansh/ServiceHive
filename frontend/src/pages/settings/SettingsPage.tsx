import Layout from '../../components/layout/Layout';

import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../hooks/useAuth';

const SettingsPage = () => {
  const { darkMode, toggleTheme } = useTheme();
  const { user, logout } = useAuth();

  return (
    <Layout>
      {/* TOP */}

      <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-5xl font-semibold tracking-tight">
            Settings
          </h1>
          <p className="mt-2 max-w-xl text-slate-500 dark:text-slate-400">
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
        <h2 className="mb-8 text-3xl font-bold">
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