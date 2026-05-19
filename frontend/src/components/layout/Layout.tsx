import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import type { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const { darkMode } = useTheme();

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
                location.pathname === '/dashboard'
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
                location.pathname === '/leads'
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
                location.pathname === '/settings'
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

      <div className="flex-1 p-10">{children}</div>
    </div>
  );
};

export default Layout;
