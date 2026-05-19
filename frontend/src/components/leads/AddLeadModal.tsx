import { useState } from 'react';
import axios from 'axios';

interface Props {
  onClose: () => void;
  onLeadCreated: () => void;
}

const AddLeadModal = ({
  onClose,
  onLeadCreated,
}: Props) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    status: 'New',
    source: 'Website',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      const token = localStorage.getItem('token');

      await axios.post(
        'http://localhost:5000/api/leads',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      onLeadCreated();

      onClose();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-lg bg-white p-6">
        <h2 className="mb-4 text-2xl font-bold">
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
            className="w-full rounded border p-3"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full rounded border p-3"
          />

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full rounded border p-3"
          >
            <option value="New">New</option>
            <option value="Contacted">
              Contacted
            </option>
            <option value="Qualified">
              Qualified
            </option>
            <option value="Lost">Lost</option>
          </select>

          <select
            name="source"
            value={formData.source}
            onChange={handleChange}
            className="w-full rounded border p-3"
          >
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

          <div className="flex gap-3">
            <button
              type="submit"
              className="w-full rounded bg-black px-4 py-2 text-white"
            >
              {loading
                ? 'Creating...'
                : 'Create Lead'}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="w-full rounded border px-4 py-2"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddLeadModal;