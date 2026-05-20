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
      } catch {
        setError('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <Layout>
      <div className="mb-10 overflow-hidden rounded-4xl bg-gradient-to-br from-cyan-500 via-sky-500 to-indigo-600 p-10 text-white shadow-2xl shadow-cyan-500/20">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-cyan-100/90">
              Dashboard
            </p>
            <h1 className="mt-4 text-5xl font-semibold">
              Your CRM cockpit
            </h1>
            <p className="mt-3 max-w-xl text-slate-100/90">
              Track lead momentum, review key metrics, and stay focused on growth.
            </p>
          </div>

          <button
            onClick={toggleTheme}
            className="btn-secondary"
          >
            {darkMode ? 'Switch to Light' : 'Switch to Dark'}
          </button>
        </div>
      </div>

      {loading ? (
        <p className="text-slate-400">Loading...</p>
      ) : error ? (
        <p className="text-rose-400">{error}</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-3">
          <div className="card-panel">
            <h2 className="text-sm uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
              Total Leads
            </h2>
            <p className="mt-4 text-5xl font-semibold text-slate-950 dark:text-white">
              {stats.total}
            </p>
          </div>

          <div className="card-panel">
            <h2 className="text-sm uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
              Qualified
            </h2>
            <p className="mt-4 text-5xl font-semibold text-slate-950 dark:text-white">
              {stats.qualified}
            </p>
          </div>

          <div className="card-panel">
            <h2 className="text-sm uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
              Contacted
            </h2>
            <p className="mt-4 text-5xl font-semibold text-slate-950 dark:text-white">
              {stats.contacted}
            </p>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default DashboardPage;