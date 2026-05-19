import Layout from '../../components/layout/Layout';

import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../hooks/useAuth';

const SettingsPage = () => {
  const { darkMode, toggleTheme } = useTheme();
  const { user, logout } = useAuth();

  return (
    <Layout>
      {/* TOP */}

      <div className="mb-10 flex items-center justify-between">

        <div>

          <h1 className="text-5xl font-bold">
            Settings
          </h1>

          <p
            className={`mt-2 ${
              darkMode
                ? 'text-gray-400'
                : 'text-gray-600'
            }`}
          >
            Manage your account settings
          </p>

        </div>

        <button
          onClick={toggleTheme}
          className={`rounded-lg border px-4 py-2 ${
            darkMode
              ? 'bg-[#1e293b]'
              : 'bg-white'
          }`}
        >
          {darkMode
            ? '☀️'
            : '🌙'}
        </button>

      </div>

      {/* PROFILE CARD */}

      <div
        className={`max-w-2xl rounded-2xl p-8 ${
          darkMode
            ? 'bg-[#1e293b]'
            : 'bg-white'
        }`}
      >

        <h2 className="mb-8 text-3xl font-bold">
          Profile Information
        </h2>

        {/* NAME */}

        <div className="mb-6">

          <label className="mb-2 block text-gray-400">
            Name
          </label>

          <input
            type="text"
            value={user?.name || ''}
            readOnly
            className="w-full rounded-lg border border-gray-600 bg-transparent p-4"
          />

        </div>

        {/* EMAIL */}

        <div className="mb-6">

          <label className="mb-2 block text-gray-400">
            Email
          </label>

          <input
            type="email"
            value={user?.email || ''}
            readOnly
            className="w-full rounded-lg border border-gray-600 bg-transparent p-4"
          />

        </div>

        {/* ROLE */}

        <div className="mb-8">

          <label className="mb-2 block text-gray-400">
            Role
          </label>

          <input
            type="text"
            value={user?.role || ''}
            readOnly
            className="w-full rounded-lg border border-gray-600 bg-transparent p-4"
          />

        </div>

        {/* ACTIONS */}

        <div className="flex gap-4">

          <button
            className="rounded-lg bg-blue-500 px-6 py-3 text-white"
          >
            Update Profile
          </button>

          <button
            onClick={logout}
            className="rounded-lg bg-red-500 px-6 py-3 text-white"
          >
            Logout
          </button>

        </div>

      </div>
    </Layout>
  );
};

export default SettingsPage;