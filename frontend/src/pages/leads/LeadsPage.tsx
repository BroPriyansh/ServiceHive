import {
  useEffect,
  useState,
} from 'react';

import axios from '../../api/axios';

import Layout from '../../components/layout/Layout';

import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../hooks/useAuth';

import type { Lead } from '../../types';

const LeadsPage = () => {

  const { darkMode, toggleTheme } = useTheme();
  const { token } = useAuth();

  const [leads, setLeads] = useState<
    Lead[]
  >([]);

  const [loading, setLoading] =
    useState(true);

  const [showModal, setShowModal] =
    useState(false);

  const [showEditModal, setShowEditModal] =
    useState(false);

  const [editingLeadId, setEditingLeadId] =
    useState<string | null>(null);

  const [search, setSearch] =
    useState('');

  const [statusFilter, setStatusFilter] =
    useState('');

  const [sourceFilter, setSourceFilter] =
    useState('');

  const [sort, setSort] =
    useState('latest');

  const [formData, setFormData] =
    useState({
      name: '',
      email: '',
      status: 'New',
      source: 'Website',
    });

  const [editFormData, setEditFormData] =
    useState({
      name: '',
      email: '',
      status: 'New',
      source: 'Website',
    });

  // FETCH LEADS

  const fetchLeads = async () => {
    if (!token) {
      setLeads([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    try {
      const response =
        await axios.get(
          `/leads?search=${search}&status=${statusFilter}&source=${sourceFilter}&sort=${sort}`
        );

      setLeads(response.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchLeads();
  }, [
    token,
    search,
    statusFilter,
    sourceFilter,
    sort,
  ]);

  // HANDLE CREATE INPUT

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });

  };

  // HANDLE EDIT INPUT

  const handleEditChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => {

    setEditFormData({
      ...editFormData,
      [e.target.name]:
        e.target.value,
    });

  };

  // CREATE LEAD

  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    try {

      await axios.post(
        '/leads',
        formData
      );

      fetchLeads();

      setShowModal(false);

      setFormData({
        name: '',
        email: '',
        status: 'New',
        source: 'Website',
      });

    } catch (error) {

      console.log(error);

    }
  };

  // OPEN EDIT MODAL

  const handleEditClick = (
    lead: Lead
  ) => {

    setEditingLeadId(
      lead._id
    );

    setEditFormData({
      name: lead.name,
      email: lead.email,
      status: lead.status,
      source: lead.source,
    });

    setShowEditModal(true);

  };

  // UPDATE LEAD

  const handleUpdateLead = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    try {

      await axios.put(
        `/leads/${editingLeadId}`,
        editFormData
      );

      fetchLeads();

      setShowEditModal(false);

    } catch (error) {

      console.log(error);

    }
  };

  // DELETE LEAD

  const handleDelete = async (
    id: string
  ) => {

    try {

      await axios.delete(
        `/leads/${id}`
      );

      fetchLeads();

    } catch (error) {

      console.log(error);

    }
  };

  // EXPORT CSV

  const handleExport = async () => {
    try {
      const response = await axios.get('/leads/export/csv', {
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'leads.csv');
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.log(error);
    }
  };

  return (

    <Layout>
      {/* TOP */}

      <div className="mb-8 overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-white/85 p-8 shadow-[0_18px_60px_rgba(15,23,42,0.06)] backdrop-blur-xl dark:border-slate-700/70 dark:bg-slate-900/80">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-indigo-700 dark:border-indigo-500/20 dark:bg-indigo-500/10 dark:text-indigo-300">
              Lead workspace
            </div>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
              Leads
            </h1>
            <p className="mt-2 text-base font-medium text-slate-600 dark:text-slate-300">
              Manage all your leads with clear filters and fast actions.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={toggleTheme}
              className="btn-secondary"
            >
              {darkMode ? 'Switch to Light' : 'Switch to Dark'}
            </button>
            <button
              onClick={handleExport}
              className="btn-primary"
            >
              Export CSV
            </button>
            <button
              onClick={() => setShowModal(true)}
              className="btn-secondary"
            >
              Add Lead
            </button>
          </div>
        </div>
      </div>

        <div className="mb-8 rounded-[1.5rem] border border-slate-200/80 bg-white/85 p-5 shadow-[0_16px_45px_rgba(15,23,42,0.06)] dark:border-slate-700/70 dark:bg-slate-900/80">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <input
              type="text"
              placeholder="Search leads"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-field"
            />

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="input-field"
            >
              <option value="">All Status</option>
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Qualified">Qualified</option>
              <option value="Lost">Lost</option>
            </select>

            <select
              value={sourceFilter}
              onChange={(e) => setSourceFilter(e.target.value)}
              className="input-field"
            >
              <option value="">All Sources</option>
              <option value="Website">Website</option>
              <option value="Instagram">Instagram</option>
              <option value="Referral">Referral</option>
            </select>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="input-field"
            >
              <option value="latest">Latest</option>
              <option value="oldest">Oldest</option>
            </select>
          </div>
        </div>

        <div className="overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-white/90 shadow-[0_20px_55px_rgba(15,23,42,0.08)] dark:border-slate-700/70 dark:bg-slate-900/80">
          <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800">
            <thead className="bg-slate-50/80 dark:bg-slate-950/70">
              <tr>
                <th className="p-5 text-left text-sm font-semibold uppercase tracking-[0.2em] text-slate-600 dark:text-slate-300">
                  Name
                </th>
                <th className="p-5 text-left text-sm font-semibold uppercase tracking-[0.2em] text-slate-600 dark:text-slate-300">
                  Email
                </th>
                <th className="p-5 text-left text-sm font-semibold uppercase tracking-[0.2em] text-slate-600 dark:text-slate-300">
                  Status
                </th>
                <th className="p-5 text-left text-sm font-semibold uppercase tracking-[0.2em] text-slate-600 dark:text-slate-300">
                  Source
                </th>
                <th className="p-5 text-left text-sm font-semibold uppercase tracking-[0.2em] text-slate-600 dark:text-slate-300">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {loading ? (
                <tr>
                  <td colSpan={5} className="p-10 text-center text-slate-600 dark:text-slate-300">
                    Loading...
                  </td>
                </tr>
              ) : (
                leads.map((lead) => (
                  <tr key={lead._id} className="transition hover:bg-slate-50/70 dark:hover:bg-slate-800/70">
                    <td className="p-5 font-semibold text-slate-900 dark:text-slate-100">
                      {lead.name}
                    </td>
                    <td className="p-5 text-slate-700 dark:text-slate-300">
                      {lead.email}
                    </td>
                    <td className="p-5">
                      <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                        lead.status === 'Qualified'
                          ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300'
                          : lead.status === 'Contacted'
                            ? 'bg-sky-100 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300'
                            : lead.status === 'Lost'
                              ? 'bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300'
                              : 'bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300'
                      }`}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="p-5">
                      <span className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
                        {lead.source}
                      </span>
                    </td>
                    <td className="p-5">
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => handleEditClick(lead)}
                          className="btn-secondary"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(lead._id)}
                          className="btn-primary bg-rose-500 hover:bg-rose-400 dark:bg-rose-500 dark:hover:bg-rose-400"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

      {/* CREATE MODAL */}

      {showModal && (

        <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/60 p-4">
          <div className="glass-card w-full max-w-md">
            <h2 className="mb-6 text-3xl font-semibold">
              Add Lead
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                className="input-field"
                required
              />

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="input-field"
                required
              />

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="input-field"
              >
                <option>New</option>
                <option>Contacted</option>
                <option>Qualified</option>
                <option>Lost</option>
              </select>

              <select
                name="source"
                value={formData.source}
                onChange={handleChange}
                className="input-field"
              >
                <option>Website</option>
                <option>Instagram</option>
                <option>Referral</option>
              </select>

              <div className="flex flex-col gap-3 sm:flex-row">
                <button type="submit" className="btn-primary w-full sm:w-auto">
                  Create
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="btn-secondary w-full sm:w-auto"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT MODAL */}

      {showEditModal && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/60 p-4">
          <div className="glass-card w-full max-w-md">
            <h2 className="mb-6 text-3xl font-semibold">
              Edit Lead
            </h2>

            <form onSubmit={handleUpdateLead} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={editFormData.name}
                onChange={handleEditChange}
                className="input-field"
                required
              />

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={editFormData.email}
                onChange={handleEditChange}
                className="input-field"
                required
              />

              <select
                name="status"
                value={editFormData.status}
                onChange={handleEditChange}
                className="input-field"
              >
                <option>New</option>
                <option>Contacted</option>
                <option>Qualified</option>
                <option>Lost</option>
              </select>

              <select
                name="source"
                value={editFormData.source}
                onChange={handleEditChange}
                className="input-field"
              >
                <option>Website</option>
                <option>Instagram</option>
                <option>Referral</option>
              </select>

              <div className="flex flex-col gap-3 sm:flex-row">
                <button type="submit" className="btn-primary w-full sm:w-auto">
                  Update
                </button>
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="btn-secondary w-full sm:w-auto"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </Layout>
  );
};

export default LeadsPage;