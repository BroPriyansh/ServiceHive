import { useState, useEffect } from 'react';

import api from '../../api/axios';

import Layout from '../../components/layout/Layout';

import { useTheme } from '../../context/ThemeContext';

const DashboardPage = () => {
  const { darkMode, toggleTheme } = useTheme();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [stats, setStats] = useState({
    total: 0,
    qualified: 0,
    contacted: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get('/leads');
        const leads = response.data.data;
        setStats({
          total: leads.length,
          qualified: leads.filter((l: { status: string }) => l.status === 'Qualified').length,
          contacted: leads.filter((l: { status: string }) => l.status === 'Contacted').length,
        });
      } catch (err) {
        setError('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <Layout>
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

      {/* STATS */}

      {loading ? (
        <p className="text-gray-400">Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
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
              {stats.total}
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
              {stats.qualified}
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
              {stats.contacted}
            </p>

          </div>

        </div>
      )}
    </Layout>
  );
};

export default DashboardPage;