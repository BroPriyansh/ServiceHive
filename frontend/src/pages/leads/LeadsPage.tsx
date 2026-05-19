import {
  useEffect,
  useState,
} from 'react';

import axios from '../../api/axios';

import Layout from '../../components/layout/Layout';

import { useTheme } from '../../context/ThemeContext';

import type { Lead } from '../../types';

const LeadsPage = () => {

  const { darkMode, toggleTheme } = useTheme();

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

    try {

      const response =
        await axios.get(
          `/leads?search=${search}&status=${statusFilter}&source=${sourceFilter}&sort=${sort}`
        );

      setLeads(
        response.data.data
      );

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }
  };

  useEffect(() => {
    fetchLeads();
  }, [
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

  const handleExport = () => {
    window.open(
      `${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/leads/export/csv`,
      '_blank'
    );
  };

  return (

    <Layout>
      {/* TOP */}

      <div className="mb-8 flex items-center justify-between">

        <div>

          <h1 className="text-5xl font-bold">
            Leads
          </h1>

          <p
            className={`mt-2 ${
              darkMode
                ? 'text-gray-400'
                : 'text-gray-600'
            }`}
          >
            Manage all your leads
          </p>

        </div>

        <div className="flex gap-3">

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

          <button
            onClick={handleExport}
            className="rounded-lg bg-green-500 px-5 py-2 text-white"
          >
            Export CSV
          </button>

          <button
            onClick={() =>
              setShowModal(true)
            }
            className="rounded-lg bg-white px-5 py-2 text-black"
          >
            Add Lead
          </button>

        </div>

      </div>

        {/* FILTERS */}

        <div className="mb-8 grid grid-cols-4 gap-4">

          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            className={`rounded-lg border p-4 outline-none ${
              darkMode
                ? 'border-gray-700 bg-[#1e293b]'
                : 'bg-white'
            }`}
          />

          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(
                e.target.value
              )
            }
            className={`rounded-lg border p-4 ${
              darkMode
                ? 'border-gray-700 bg-[#1e293b]'
                : 'bg-white'
            }`}
          >

            <option value="">
              All Status
            </option>

            <option value="New">
              New
            </option>

            <option value="Contacted">
              Contacted
            </option>

            <option value="Qualified">
              Qualified
            </option>

            <option value="Lost">
              Lost
            </option>

          </select>

          <select
            value={sourceFilter}
            onChange={(e) =>
              setSourceFilter(
                e.target.value
              )
            }
            className={`rounded-lg border p-4 ${
              darkMode
                ? 'border-gray-700 bg-[#1e293b]'
                : 'bg-white'
            }`}
          >

            <option value="">
              All Sources
            </option>

            <option value="Website">
              Website
            </option>

            <option value="Instagram">
              Instagram
            </option>

            <option value="Referral">
              Referral
            </option>

          </select>

          <select
            value={sort}
            onChange={(e) =>
              setSort(
                e.target.value
              )
            }
            className={`rounded-lg border p-4 ${
              darkMode
                ? 'border-gray-700 bg-[#1e293b]'
                : 'bg-white'
            }`}
          >

            <option value="latest">
              Latest
            </option>

            <option value="oldest">
              Oldest
            </option>

          </select>

        </div>

        {/* TABLE */}

        <div
          className={`overflow-hidden rounded-2xl ${
            darkMode
              ? 'bg-[#1e293b]'
              : 'bg-white'
          }`}
        >

          <table className="w-full">

            <thead>

              <tr
                className={`border-b ${
                  darkMode
                    ? 'border-gray-700'
                    : 'border-gray-300'
                }`}
              >

                <th className="p-5 text-left">
                  Name
                </th>

                <th className="p-5 text-left">
                  Email
                </th>

                <th className="p-5 text-left">
                  Status
                </th>

                <th className="p-5 text-left">
                  Source
                </th>

                <th className="p-5 text-left">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {loading ? (

                <tr>

                  <td
                    colSpan={5}
                    className="p-5 text-center"
                  >
                    Loading...
                  </td>

                </tr>

              ) : (

                leads.map((lead) => (

                  <tr
                    key={lead._id}
                    className={`border-b ${
                      darkMode
                        ? 'border-gray-700'
                        : 'border-gray-300'
                    }`}
                  >

                    <td className="p-5">
                      {lead.name}
                    </td>

                    <td className="p-5">
                      {lead.email}
                    </td>

                    <td className="p-5">
                      {lead.status}
                    </td>

                    <td className="p-5">
                      {lead.source}
                    </td>

                    <td className="space-x-2 p-5">

                      <button
                        onClick={() =>
                          handleEditClick(
                            lead
                          )
                        }
                        className="rounded bg-blue-500 px-4 py-2 text-white"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          handleDelete(
                            lead._id
                          )
                        }
                        className="rounded bg-red-500 px-4 py-2 text-white"
                      >
                        Delete
                      </button>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      {/* CREATE MODAL */}

      {showModal && (

        <div className="fixed inset-0 flex items-center justify-center bg-black/50">

          <div
            className={`w-full max-w-md rounded-2xl p-8 ${
              darkMode
                ? 'bg-[#1e293b]'
                : 'bg-white'
            }`}
          >

            <h2 className="mb-6 text-3xl font-bold">
              Add Lead
            </h2>

            <form
              onSubmit={handleSubmit}
              className="space-y-4"
            >

              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full rounded-lg border p-4 text-black"
                required
              />

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-lg border p-4 text-black"
                required
              />

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full rounded-lg border p-4 text-black"
              >

                <option>
                  New
                </option>

                <option>
                  Contacted
                </option>

                <option>
                  Qualified
                </option>

                <option>
                  Lost
                </option>

              </select>

              <select
                name="source"
                value={formData.source}
                onChange={handleChange}
                className="w-full rounded-lg border p-4 text-black"
              >

                <option>
                  Website
                </option>

                <option>
                  Instagram
                </option>

                <option>
                  Referral
                </option>

              </select>

              <div className="flex gap-3">

                <button
                  type="submit"
                  className="flex-1 rounded-lg bg-black py-3 text-white"
                >
                  Create
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setShowModal(false)
                  }
                  className="flex-1 rounded-lg bg-gray-300 py-3 text-black"
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

        <div className="fixed inset-0 flex items-center justify-center bg-black/50">

          <div
            className={`w-full max-w-md rounded-2xl p-8 ${
              darkMode
                ? 'bg-[#1e293b]'
                : 'bg-white'
            }`}
          >

            <h2 className="mb-6 text-3xl font-bold">
              Edit Lead
            </h2>

            <form
              onSubmit={handleUpdateLead}
              className="space-y-4"
            >

              <input
                type="text"
                name="name"
                placeholder="Name"
                value={editFormData.name}
                onChange={handleEditChange}
                className="w-full rounded-lg border p-4 text-black"
                required
              />

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={editFormData.email}
                onChange={handleEditChange}
                className="w-full rounded-lg border p-4 text-black"
                required
              />

              <select
                name="status"
                value={editFormData.status}
                onChange={handleEditChange}
                className="w-full rounded-lg border p-4 text-black"
              >

                <option>
                  New
                </option>

                <option>
                  Contacted
                </option>

                <option>
                  Qualified
                </option>

                <option>
                  Lost
                </option>

              </select>

              <select
                name="source"
                value={editFormData.source}
                onChange={handleEditChange}
                className="w-full rounded-lg border p-4 text-black"
              >

                <option>
                  Website
                </option>

                <option>
                  Instagram
                </option>

                <option>
                  Referral
                </option>

              </select>

              <div className="flex gap-3">

                <button
                  type="submit"
                  className="flex-1 rounded-lg bg-blue-500 py-3 text-white"
                >
                  Update
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setShowEditModal(false)
                  }
                  className="flex-1 rounded-lg bg-gray-300 py-3 text-black"
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