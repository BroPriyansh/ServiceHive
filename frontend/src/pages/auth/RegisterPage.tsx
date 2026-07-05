import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import api from '../../api/axios';

import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../hooks/useAuth';

const RegisterPage = () => {
  const navigate = useNavigate();

  const { login } = useAuth();
  const { darkMode } = useTheme();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
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
    setError('');

    try {
      const res = await api.post(
        '/auth/register',
        formData
      );

      login(
        res.data.token,
        res.data.user
      );

      navigate('/dashboard');
    } catch (error: unknown) {
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'Registration failed. Please try again.';
      setError(errorMessage);
    }
  };

  return (
    <div className={`relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-10 ${darkMode ? 'bg-slate-950 text-white' : 'bg-[linear-gradient(135deg,#f8fbff_0%,#eef6ff_42%,#f8faff_100%)] text-slate-900'}`}>
      <div className={`pointer-events-none absolute inset-0 ${darkMode ? 'bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.18),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(14,165,233,0.14),transparent_20%)]' : 'bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.14),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.12),transparent_20%)]'}`} />

      <form
        onSubmit={handleSubmit}
        className={`relative z-10 w-full max-w-md rounded-4xl border p-10 shadow-2xl ${darkMode ? 'border-white/10 bg-slate-950/95 shadow-slate-950/40' : 'border-slate-200/80 bg-white/90 shadow-slate-900/10'}`}
      >
        <div className="mb-8">
          <p className={`text-sm uppercase tracking-[0.35em] ${darkMode ? 'text-cyan-400' : 'text-cyan-600'}`}>
            Get started
          </p>
          <h1 className="mt-4 text-4xl font-semibold">
            Create a ServiceHive account
          </h1>
          <p className={`mt-3 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            Register now to manage leads, automate follow-ups, and stay productive.
          </p>
        </div>

        {error && (
          <p className={`mb-4 rounded-3xl px-4 py-3 text-center ${darkMode ? 'bg-rose-500/10 text-rose-400' : 'bg-rose-50 text-rose-600'}`}>
            {error}
          </p>
        )}

        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="input-field mb-4"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="input-field mb-4"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="input-field mb-6"
          required
          minLength={6}
        />

        <button
          type="submit"
          className="btn-primary w-full"
        >
          Register
        </button>

        <p className={`mt-5 text-center ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
          Already have an account?{' '}
          <Link 
            to="/login" 
            className={`font-medium ${darkMode ? 'text-cyan-300 hover:text-cyan-200' : 'text-cyan-600 hover:text-cyan-500'}`}
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;
