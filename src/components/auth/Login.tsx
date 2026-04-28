import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { GoogleLogin } from '@react-oauth/google';
import { authLoginValidationSchema, type IAuthLogin } from '@kitchensathi12-arch/ecommerce-types';
import Input from '@/components/ui/input/Input';
import { useMutation } from '@tanstack/react-query';
import { loginUser } from '@/services/AuthServices';
import toast from 'react-hot-toast';
import type { AxiosError } from 'axios';
import { AuthStore } from '@/store/store';

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  // ----------------- here i use zustand store ---------------
  const { addUser } = AuthStore((state) => state);

  // ---------------------- API --------------------------
  const { mutate, isPending } = useMutation({
    mutationFn: loginUser,

    onSuccess: (data) => {
      toast.success('Login Successfully');
      addUser(data.user);
      // Navigate home
      navigate('/');
    },

    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data?.message || 'Login Failed ❌');
    },
  });

  // ---------------------- FORM --------------------------
  const formik = useFormik<IAuthLogin>({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: authLoginValidationSchema,
    onSubmit: (values) => {
      mutate(values);
    },
  });

  return (
    <div className="relative min-h-screen bg-[url('/Bg.jpg')] bg-cover bg-bottom bg-no-repeat flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />

      <div className="relative w-full max-w-5xl overflow-hidden rounded-2xl shadow-2xl grid md:grid-cols-2">

        {/* LEFT SIDE */}
        <div
          className="hidden md:flex flex-col justify-between px-10 py-10 text-white relative overflow-hidden"
          style={{ background: '#3b1f0e' }}
        >
          {/* Decorative circles */}
          <div
            className="absolute top-[-60px] right-[-60px] w-52 h-52 rounded-full pointer-events-none"
            style={{ background: 'rgba(120,40,20,0.45)' }}
          />
          <div
            className="absolute bottom-[-40px] left-[-40px] w-40 h-40 rounded-full pointer-events-none"
            style={{ background: 'rgba(120,40,20,0.3)' }}
          />

          {/* Brand */}
          <div className="relative z-10">
            <h2 className="text-3xl font-bold">
              Kitchen<span style={{ color: '#e03e2d' }}>Sathi</span>
            </h2>
            <p className="mt-3 text-sm leading-relaxed" style={{ color: '#c9b8a0' }}>
              Log in to make your orders,<br />products and profile and enhance your kitchen.
            </p>
          </div>

          {/* Illustration — uses your existing /login.png */}
          <div className="relative z-10 flex flex-1 items-center justify-center py-6">
            <img
              src="/login.png"
              alt="Login illustration"
              className="max-h-[400px] object-contain drop-shadow-2xl"
            />
          </div>

          {/* Stats */}
          <div className="relative z-10">
            <div className="flex gap-8 mb-4">
              <div className="text-center">
                <span className="block text-2xl font-bold" style={{ color: '#e03e2d' }}>4+</span>
                <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: '#c9b8a0' }}>Brands</span>
              </div>
              <div className="text-center">
                <span className="block text-2xl font-bold" style={{ color: '#e03e2d' }}>100%</span>
                <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: '#c9b8a0' }}>Authentic</span>
              </div>
              <div className="text-center">
                <span className="block text-2xl font-bold" style={{ color: '#e03e2d' }}>Free</span>
                <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: '#c9b8a0' }}>Returns</span>
              </div>
            </div>
            <p className="text-xs" style={{ color: '#6b5040' }}>© 2026 KitchenSathi. All rights reserved.</p>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="p-8 sm:p-10" style={{ background: '#faf7f2' }}>
          <h1 className="text-2xl font-bold" style={{ color: '#2a1508', fontFamily: 'Georgia, serif' }}>Sign in</h1>
          <p className="mt-1 text-sm" style={{ color: '#8a7060' }}>Enter your credentials to continue</p>

          <form onSubmit={formik.handleSubmit} className="mt-8 space-y-5">
            {/* Username */}
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: '#4a2e1a' }}>
                Email or username
              </label>
              <input
                name="username"
                type="text"
                placeholder="Enter email or username"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                autoComplete="username"
                className="w-full rounded-lg px-4 py-2.5 text-sm outline-none transition"
                style={{
                  background: '#fff',
                  border: '1.5px solid #d9cfc4',
                  color: '#2a1508',
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = '#3b1f0e')}
                onBlurCapture={(e) => (e.currentTarget.style.borderColor = '#d9cfc4')}
              />
              {formik.touched.username && formik.errors.username && (
                <p className="mt-1 text-xs" style={{ color: '#e03e2d' }}>{formik.errors.username}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: '#4a2e1a' }}>
                Password
              </label>
              <input
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                autoComplete="current-password"
                className="w-full rounded-lg px-4 py-2.5 text-sm outline-none transition"
                style={{
                  background: '#fff',
                  border: '1.5px solid #d9cfc4',
                  color: '#2a1508',
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = '#3b1f0e')}
                onBlurCapture={(e) => (e.currentTarget.style.borderColor = '#d9cfc4')}
              />
              {formik.touched.password && formik.errors.password && (
                <p className="mt-1 text-xs" style={{ color: '#e03e2d' }}>{formik.errors.password}</p>
              )}
              <button
                type="button"
                onClick={() => setShowPassword((p) => !p)}
                className="mt-1 text-xs font-medium hover:underline"
                style={{ color: '#3b1f0e' }}
              >
                {showPassword ? 'Hide password' : 'Show password'}
              </button>
            </div>

            <div className="flex justify-end">
              <Link
                to="/forgot-password"
                className="text-sm font-medium hover:underline"
                style={{ color: '#e03e2d' }}
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full rounded-lg py-3 text-sm font-semibold text-white transition disabled:opacity-60"
              style={{ background: '#e03e2d' }}
              onMouseEnter={(e) => (e.currentTarget.style.background = '#c43526')}
              onMouseLeave={(e) => (e.currentTarget.style.background = '#e03e2d')}
            >
              {isPending ? 'Signing in...' : 'Sign in'}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1" style={{ background: '#d9cfc4' }} />
            <span className="text-xs" style={{ color: '#8a7060' }}>OR</span>
            <div className="h-px flex-1" style={{ background: '#d9cfc4' }} />
          </div>

          {/* Google Login */}
          <div className="flex justify-center">
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                console.log('Google Credential:', credentialResponse.credential);
                // Send credential to backend
              }}
              onError={() => {
                toast.error('Google Login Failed ❌');
              }}
              theme="outline"
              size="large"
              width={300}
            />
          </div>

          <p className="mt-6 text-center text-sm" style={{ color: '#8a7060' }}>
            Don't have an account?{' '}
            <Link
              to="/register"
              className="font-medium hover:underline"
              style={{ color: '#e03e2d' }}
            >
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;