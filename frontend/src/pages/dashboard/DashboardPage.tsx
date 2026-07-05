import { useEffect, useState } from 'react';
import {
  Activity,
  ArrowUpRight,
  BarChart3,
  CheckCircle2,
  Clock3,
  Sparkles,
  TrendingUp,
} from 'lucide-react';

import api from '../../api/axios';
import Layout from '../../components/layout/Layout';
import { useTheme } from '../../context/ThemeContext';

const DashboardPage = () => {
  const { darkMode, toggleTheme } = useTheme();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [leads, setLeads] = useState<any[]>([]);
  const [stats, setStats] = useState({
    total: 0,
    qualified: 0,
    contacted: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get('/leads');
        const fetchedLeads = response.data.data;
        setLeads(fetchedLeads);
        setStats({
          total: fetchedLeads.length,
          qualified: fetchedLeads.filter((l: { status: string }) => l.status === 'Qualified').length,
          contacted: fetchedLeads.filter((l: { status: string }) => l.status === 'Contacted').length,
        });
      } catch {
        setError('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const conversionRate = stats.total > 0 ? Math.round((stats.qualified / stats.total) * 100) : 0;
  const recentLeads = leads.slice(0, 4);

  const getStatusClasses = (status: string) => {
    switch (status) {
      case 'Qualified':
        return 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200 dark:bg-emerald-500/15 dark:text-emerald-300 dark:ring-emerald-500/20';
      case 'Contacted':
        return 'bg-sky-50 text-sky-700 ring-1 ring-sky-200 dark:bg-sky-500/15 dark:text-sky-300 dark:ring-sky-500/20';
      case 'Lost':
        return 'bg-rose-50 text-rose-700 ring-1 ring-rose-200 dark:bg-rose-500/15 dark:text-rose-300 dark:ring-rose-500/20';
      default:
        return 'bg-amber-50 text-amber-700 ring-1 ring-amber-200 dark:bg-amber-500/15 dark:text-amber-300 dark:ring-amber-500/20';
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-white/85 p-8 shadow-[0_18px_60px_rgba(15,23,42,0.06)] backdrop-blur-xl dark:border-slate-700/70 dark:bg-slate-900/80">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-indigo-700 dark:border-indigo-500/20 dark:bg-indigo-500/10 dark:text-indigo-300">
                <Sparkles size={14} />
                CRM overview
              </div>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
                Welcome back to your pipeline.
              </h1>
              <p className="mt-3 text-base leading-7 text-slate-600 dark:text-slate-300">
                Track momentum, surface opportunities, and keep every lead moving forward with clarity.
              </p>
            </div>

            <button onClick={toggleTheme} className="btn-secondary">
              {darkMode ? 'Switch to Light' : 'Switch to Dark'}
            </button>
          </div>
        </div>

        {loading ? (
          <div className="rounded-[1.5rem] border border-slate-200/80 bg-white/80 p-10 text-center text-sm font-medium text-slate-600 shadow-[0_12px_36px_rgba(15,23,42,0.05)] dark:border-slate-700/70 dark:bg-slate-900/80 dark:text-slate-300">
            Loading your workspace...
          </div>
        ) : error ? (
          <div className="rounded-[1.5rem] border border-rose-200 bg-rose-50 p-10 text-center text-sm font-medium text-rose-700 dark:border-rose-500/20 dark:bg-rose-500/10 dark:text-rose-300">
            {error}
          </div>
        ) : (
          <>
            <div className="grid gap-4 lg:grid-cols-3">
              {[
                {
                  label: 'Total leads',
                  value: stats.total,
                  detail: '+12% vs last week',
                  icon: Activity,
                  tone: 'from-indigo-500/10 via-white to-white dark:from-indigo-500/15 dark:via-slate-900 dark:to-slate-900',
                },
                {
                  label: 'Qualified',
                  value: stats.qualified,
                  detail: `${conversionRate}% conversion`,
                  icon: TrendingUp,
                  tone: 'from-emerald-500/10 via-white to-white dark:from-emerald-500/15 dark:via-slate-900 dark:to-slate-900',
                },
                {
                  label: 'Contacted',
                  value: stats.contacted,
                  detail: 'Healthy follow-up pace',
                  icon: CheckCircle2,
                  tone: 'from-sky-500/10 via-white to-white dark:from-sky-500/15 dark:via-slate-900 dark:to-slate-900',
                },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className={`rounded-[1.35rem] border border-slate-200/80 bg-linear-to-br ${item.tone} p-5 shadow-[0_12px_34px_rgba(15,23,42,0.05)] dark:border-slate-700/70`}>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
                          {item.label}
                        </p>
                        <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">
                          {item.value}
                        </p>
                      </div>
                      <div className="rounded-2xl border border-slate-200/80 bg-white/80 p-2.5 text-slate-700 shadow-sm dark:border-slate-700/70 dark:bg-slate-900/70 dark:text-slate-200">
                        <Icon size={18} />
                      </div>
                    </div>
                    <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                      <ArrowUpRight size={13} />
                      {item.detail}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
              <div className="rounded-[1.5rem] border border-slate-200/80 bg-white/85 p-6 shadow-[0_16px_48px_rgba(15,23,42,0.06)] dark:border-slate-700/70 dark:bg-slate-900/80">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Pipeline health</p>
                    <p className="mt-2 text-xl font-semibold text-slate-900 dark:text-white">Slightly above target this week</p>
                  </div>
                  <div className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300">+8.2%</div>
                </div>

                <div className="mt-8 grid gap-3 sm:grid-cols-4">
                  {[72, 84, 64, 91].map((value, index) => (
                    <div key={value} className="rounded-2xl border border-slate-200/80 bg-slate-50/80 p-3 dark:border-slate-700/70 dark:bg-slate-950/70">
                      <div className="flex items-end justify-between">
                        <span className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">W{index + 1}</span>
                        <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">{value}%</span>
                      </div>
                      <div className="mt-3 h-20 rounded-xl bg-slate-200/70 p-1 dark:bg-slate-800/80">
                        <div className="h-full rounded-[10px] bg-linear-to-t from-indigo-500 to-sky-400" style={{ height: `${value}%` }} />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <div className="rounded-2xl border border-slate-200/80 bg-slate-50/80 px-4 py-3 dark:border-slate-700/70 dark:bg-slate-950/70">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Next best action</p>
                    <p className="mt-1 text-sm font-semibold text-slate-700 dark:text-slate-200">Follow up with 7 warm leads</p>
                  </div>
                  <div className="rounded-2xl border border-slate-200/80 bg-slate-50/80 px-4 py-3 dark:border-slate-700/70 dark:bg-slate-950/70">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Average response</p>
                    <p className="mt-1 text-sm font-semibold text-slate-700 dark:text-slate-200">2.4 hours</p>
                  </div>
                </div>
              </div>

              <div className="rounded-[1.5rem] border border-slate-200/80 bg-white/85 p-6 shadow-[0_16px_48px_rgba(15,23,42,0.06)] dark:border-slate-700/70 dark:bg-slate-900/80">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Recent activity</p>
                    <p className="mt-2 text-xl font-semibold text-slate-900 dark:text-white">Fresh lead momentum</p>
                  </div>
                  <div className="rounded-full bg-slate-100 p-2 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                    <Clock3 size={16} />
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  {recentLeads.length > 0 ? recentLeads.map((lead: any) => (
                    <div key={lead._id} className="flex items-center justify-between rounded-2xl border border-slate-200/80 bg-slate-50/80 px-4 py-3 dark:border-slate-700/70 dark:bg-slate-950/70">
                      <div>
                        <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">{lead.name}</p>
                        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{lead.email}</p>
                      </div>
                      <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusClasses(lead.status)}`}>
                        {lead.status}
                      </span>
                    </div>
                  )) : (
                    <div className="rounded-2xl border border-dashed border-slate-300/80 px-4 py-6 text-center text-sm text-slate-500 dark:border-slate-700/70 dark:text-slate-400">
                      No recent lead activity yet.
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-slate-200/80 bg-white/85 p-6 shadow-[0_16px_48px_rgba(15,23,42,0.06)] dark:border-slate-700/70 dark:bg-slate-900/80">
              <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Conversion insight</p>
                  <p className="mt-2 text-xl font-semibold text-slate-900 dark:text-white">Your funnel is healthy and moving up.</p>
                </div>
                <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                  <BarChart3 size={16} />
                  {conversionRate}% qualified
                </div>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl border border-slate-200/80 bg-slate-50/80 p-4 dark:border-slate-700/70 dark:bg-slate-950/70">
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Opportunity score</p>
                  <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">87/100</p>
                </div>
                <div className="rounded-2xl border border-slate-200/80 bg-slate-50/80 p-4 dark:border-slate-700/70 dark:bg-slate-950/70">
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Response window</p>
                  <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">&lt; 3 hrs</p>
                </div>
                <div className="rounded-2xl border border-slate-200/80 bg-slate-50/80 p-4 dark:border-slate-700/70 dark:bg-slate-950/70">
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Next milestone</p>
                  <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">Book demo</p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default DashboardPage;