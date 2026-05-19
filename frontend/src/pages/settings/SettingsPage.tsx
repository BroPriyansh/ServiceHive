import {
  Link,
  useLocation,
  useNavigate,
} from 'react-router-dom';

import { useState } from 'react';

const SettingsPage = () => {

  const location = useLocation();

  const navigate = useNavigate();

  const [darkMode, setDarkMode] =
    useState(true);

  // USER DATA

  const user =
    JSON.parse(
      localStorage.getItem('user') || '{}'
    );

  // LOGOUT

  const handleLogout = () => {

    localStorage.removeItem('token');

    localStorage.removeItem('user');

    navigate('/login');

  };

  return (

    <div
      className={`flex min-h-screen ${
        darkMode
          ? 'bg-[#0f172a] text-white'
          : 'bg-gray-100 text-black'
      }`}
    >

      {/* SIDEBAR */}

      <div
        className={`w-[250px] p-6 ${
          darkMode
            ? 'bg-[#1e293b]'
            : 'bg-white border-r'
        }`}
      >

        <h1 className="mb-10 text-4xl font-bold">
          ServiceHive
        </h1>

        <ul className="space-y-4">

          <Link to="/dashboard">

            <li
              className={`cursor-pointer rounded-lg p-4 ${
                location.pathname ===
                '/dashboard'
                  ? 'bg-blue-500 text-white'
                  : darkMode
                  ? 'hover:bg-[#334155]'
                  : 'hover:bg-gray-200'
              }`}
            >
              Dashboard
            </li>

          </Link>

          <Link to="/leads">

            <li
              className={`cursor-pointer rounded-lg p-4 ${
                location.pathname ===
                '/leads'
                  ? 'bg-blue-500 text-white'
                  : darkMode
                  ? 'hover:bg-[#334155]'
                  : 'hover:bg-gray-200'
              }`}
            >
              Leads
            </li>

          </Link>

          <Link to="/settings">

            <li
              className={`cursor-pointer rounded-lg p-4 ${
                location.pathname ===
                '/settings'
                  ? 'bg-blue-500 text-white'
                  : darkMode
                  ? 'hover:bg-[#334155]'
                  : 'hover:bg-gray-200'
              }`}
            >
              Settings
            </li>

          </Link>

        </ul>

      </div>

      {/* MAIN */}

      <div className="flex-1 p-10">

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
            onClick={() =>
              setDarkMode(
                !darkMode
              )
            }
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
              value={user.name || ''}
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
              value={user.email || ''}
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
              value={user.role || ''}
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
              onClick={handleLogout}
              className="rounded-lg bg-red-500 px-6 py-3 text-white"
            >
              Logout
            </button>

          </div>

        </div>

      </div>

    </div>
  );
};

export default SettingsPage;