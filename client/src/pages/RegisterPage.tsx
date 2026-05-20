import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { UserPlus, BarChart3, Eye, EyeOff } from 'lucide-react';
import { authApi } from '../api/auth.api';
import { useAuth } from '../hooks/useAuth';
import { ROUTES } from '../utils/constants';
import { toast } from 'react-toastify';

const registerSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: z.enum(['admin', 'sales']).optional(),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { role: 'sales' },
  });

  const onSubmit = async (data: RegisterFormValues): Promise<void> => {
    setIsSubmitting(true);
    try {
      const response = await authApi.register(data);
      if (response.success && response.data) {
        login(response.data.token, response.data.user);
        toast.success(`Account created! Welcome, ${response.data.user.name}!`);
        navigate(ROUTES.DASHBOARD, { replace: true });
      } else {
        toast.error(response.message ?? 'Registration failed.');
      }
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : 'An error occurred. Please try again.';
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-primary-950 to-gray-950 flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-primary-600/10 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 shadow-xl shadow-primary-500/30 mb-4">
              <BarChart3 size={24} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white">Create account</h1>
            <p className="text-gray-400 text-sm mt-1">Join Smart Leads Dashboard</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
            <div>
              <label
                htmlFor="register-name"
                className="block text-sm font-medium text-gray-300 mb-1.5"
              >
                Full Name
              </label>
              <input
                id="register-name"
                type="text"
                placeholder="John Doe"
                autoComplete="name"
                className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all text-sm ${
                  errors.name ? 'border-red-500' : 'border-white/10'
                }`}
                {...register('name')}
              />
              {errors.name && (
                <p className="text-red-400 text-xs mt-1.5">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="register-email"
                className="block text-sm font-medium text-gray-300 mb-1.5"
              >
                Email Address
              </label>
              <input
                id="register-email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all text-sm ${
                  errors.email ? 'border-red-500' : 'border-white/10'
                }`}
                {...register('email')}
              />
              {errors.email && (
                <p className="text-red-400 text-xs mt-1.5">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="register-password"
                className="block text-sm font-medium text-gray-300 mb-1.5"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="register-password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Min. 6 characters"
                  autoComplete="new-password"
                  className={`w-full bg-white/5 border rounded-xl px-4 py-3 pr-11 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all text-sm ${
                    errors.password ? 'border-red-500' : 'border-white/10'
                  }`}
                  {...register('password')}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200 transition-colors"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-400 text-xs mt-1.5">{errors.password.message}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="register-role"
                className="block text-sm font-medium text-gray-300 mb-1.5"
              >
                Role
              </label>
              <select
                id="register-role"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all text-sm"
                {...register('role')}
              >
                <option value="sales" className="bg-gray-900">Sales</option>
                <option value="admin" className="bg-gray-900">Admin</option>
              </select>
            </div>

            <button
              id="register-submit-btn"
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-all duration-200 shadow-lg shadow-primary-500/30 hover:shadow-primary-500/50 text-sm mt-2"
            >
              {isSubmitting ? (
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              ) : (
                <UserPlus size={18} />
              )}
              {isSubmitting ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <p className="text-center text-sm text-gray-400 mt-6">
            Already have an account?{' '}
            <Link
              to={ROUTES.LOGIN}
              className="text-primary-400 hover:text-primary-300 font-medium transition-colors"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
