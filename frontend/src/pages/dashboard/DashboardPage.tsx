import {
  Link,
  useLocation,
} from 'react-router-dom';

import { useState } from 'react';

const DashboardPage = () => {

  const location = useLocation();

  const [darkMode, setDarkMode] =
    useState(true);

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
              Dashboard
            </h1>

            <p
              className={`mt-2 ${
                darkMode
                  ? 'text-gray-400'
                  : 'text-gray-600'
              }`}
            >
              Welcome to your CRM dashboard
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

        {/* STATS */}

        <div className="grid grid-cols-3 gap-6">

          <div
            className={`rounded-2xl p-8 ${
              darkMode
                ? 'bg-[#1e293b]'
                : 'bg-white'
            }`}
          >

            <h2 className="text-gray-400">
              Total Leads
            </h2>

            <p className="mt-4 text-5xl font-bold">
              24
            </p>

          </div>

          <div
            className={`rounded-2xl p-8 ${
              darkMode
                ? 'bg-[#1e293b]'
                : 'bg-white'
            }`}
          >

            <h2 className="text-gray-400">
              Qualified
            </h2>

            <p className="mt-4 text-5xl font-bold">
              10
            </p>

          </div>

          <div
            className={`rounded-2xl p-8 ${
              darkMode
                ? 'bg-[#1e293b]'
                : 'bg-white'
            }`}
          >

            <h2 className="text-gray-400">
              Contacted
            </h2>

            <p className="mt-4 text-5xl font-bold">
              7
            </p>

          </div>

        </div>

      </div>

    </div>
  );
};

export default DashboardPage;