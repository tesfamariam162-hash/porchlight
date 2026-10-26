import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Navigate, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useAuth } from '../../hooks/useAuth';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { getApiErrorMessage } from '../../lib/apiClient';
import { useState } from 'react';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(1, 'Password is required'),
});

type FormValues = z.infer<typeof schema>;

export function AdminLoginPage() {
  useDocumentTitle('Admin Login');
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  if (isAuthenticated) return <Navigate to="/admin/dashboard" replace />;

  const onSubmit = async (values: FormValues) => {
    setError(null);
    try {
      await login(values.email, values.password);
      navigate('/admin/dashboard');
    } catch (e) {
      setError(getApiErrorMessage(e));
    }
  };

  return (
    <div className="admin-theme flex min-h-screen items-center justify-center bg-navy-950 px-4 font-sans">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl border border-slate-200">
        <p className="text-xs font-bold uppercase tracking-widest text-accent">Internal Access</p>
        <h1 className="mt-1 font-display text-3xl font-extrabold tracking-tight text-navy-950">Admin Sign In</h1>
        <div className="mt-2 h-1 w-12 rounded-full bg-accent" />
        <p className="mt-2 text-sm text-slate-500">Porchlight Apartment property management portal.</p>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4">
          <label className="block text-sm">
            <span className="mb-1 block font-medium text-slate-700">Email</span>
            <input
              type="email"
              {...register('email')}
              className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
              autoComplete="username"
            />
            {errors.email ? <span className="mt-1 block text-xs text-red-600">{errors.email.message}</span> : null}
          </label>
          <label className="block text-sm">
            <span className="mb-1 block font-medium text-slate-700">Password</span>
            <input
              type="password"
              {...register('password')}
              className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
              autoComplete="current-password"
            />
            {errors.password ? <span className="mt-1 block text-xs text-red-600">{errors.password.message}</span> : null}
          </label>
          {error ? <p className="text-sm text-red-600" role="alert">{error}</p> : null}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-xl bg-accent py-2.5 text-sm font-bold text-white shadow-md shadow-accent/25 transition hover:bg-accent-hover active:scale-[0.99] disabled:opacity-60"
          >
            {isSubmitting ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  );
}
