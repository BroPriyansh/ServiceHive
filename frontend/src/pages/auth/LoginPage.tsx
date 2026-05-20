import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import api from '../../api/axios';

import { useAuth } from '../../hooks/useAuth';

const LoginPage = () => {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [formData, setFormData] = useState({
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
        '/auth/login',
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
        : 'Invalid credentials';
      setError(errorMessage);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-4 py-10 text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.18),_transparent_24%),radial-gradient(circle_at_bottom_right,_rgba(14,165,233,0.14),_transparent_20%)]" />

      <form
        onSubmit={handleSubmit}
        className="relative z-10 w-full max-w-md rounded-4xl border border-white/10 bg-slate-950/95 p-10 shadow-2xl shadow-slate-950/40"
      >
        <div className="mb-8">
          <p className="text-sm uppercase tracking-[0.35em] text-cyan-400">
            Welcome back
          </p>
          <h1 className="mt-4 text-4xl font-semibold">
            Login to ServiceHive
          </h1>
          <p className="mt-3 text-slate-400">
            Access your dashboard, manage leads, and stay on top of deals.
          </p>
        </div>

        {error && (
          <p className="mb-4 rounded-3xl bg-rose-500/10 px-4 py-3 text-center text-rose-400">
            {error}
          </p>
        )}

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
        />

        <button
          type="submit"
          className="btn-primary w-full"
        >
          Login
        </button>

        <p className="mt-5 text-center text-slate-400">
          Don&apos;t have an account?{' '}
          <Link 
            to="/register" 
            className="text-cyan-300 hover:text-cyan-200"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;