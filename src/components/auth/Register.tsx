import { useState } from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { authRegisterValidationSchema, type IAuthRegister } from '@kitchensathi12-arch/ecommerce-types';
import { useMutation } from '@tanstack/react-query';
import { registerUser } from '@/services/AuthServices';
import toast from 'react-hot-toast';
import { type AxiosError } from 'axios';

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  //-----------------------API INTEGRATION----------------------------------
  const { mutate, isPending } = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      toast.success('Register Successfully 🎉');
      formik.resetForm();
      navigate('/login');
      console.log('Register Succesfully', data);
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data?.message || 'Registration Failed ❌');
      console.log('Register error', error.response?.data || error.message);
    },
  });

  const formik = useFormik<IAuthRegister>({
    initialValues: {
      full_name: '',
      email: '',
      phone: '',
      username: '',
      password: '',
      role: 'user',
    },
    validationSchema: authRegisterValidationSchema,
    onSubmit: (values) => {
      mutate(values);
    },
  });

  return (
    <div className="relative min-h-screen bg-[url('/Bg.jpg')] bg-cover bg-bottom flex items-center justify-center px-4 py-10">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />

      <div className="relative w-full max-w-5xl rounded-2xl shadow-2xl grid grid-cols-1 md:grid-cols-2 overflow-hidden">
        {/* LEFT */}
        <div className="hidden md:flex flex-col justify-between px-10 py-10 text-white relative overflow-hidden" style={{ background: '#3b1f0e' }}>
          {/* Decorative circles */}
          <div className="absolute top-[-60px] right-[-60px] w-52 h-52 rounded-full pointer-events-none" style={{ background: 'rgba(120,40,20,0.45)' }} />
          <div className="absolute bottom-[-40px] left-[-40px] w-40 h-40 rounded-full pointer-events-none" style={{ background: 'rgba(120,40,20,0.3)' }} />

          {/* Brand */}
          <div className="relative z-10">
            <h2 className="text-3xl font-bold">
              Kitchen<span style={{ color: '#e03e2d' }}>Sathi</span>
            </h2>
            <p className="mt-3 text-sm leading-relaxed" style={{ color: '#c9b8a0' }}>
              Join us and start managing
              <br />
              everything in one place.
            </p>
          </div>

          {/* Illustration */}
          <div className="relative z-10 flex flex-1 items-center justify-center py-6">
            <img src="/login.png" alt="Register illustration" className="max-h-[400px] object-contain drop-shadow-2xl" />
          </div>

          {/* Stats */}
          <div className="relative z-10">
            <div className="flex gap-8 mb-4">
              <div className="text-center">
                <span className="block text-2xl font-bold" style={{ color: '#e03e2d' }}>
                  4+
                </span>
                <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: '#c9b8a0' }}>
                  Brands
                </span>
              </div>
              <div className="text-center">
                <span className="block text-2xl font-bold" style={{ color: '#e03e2d' }}>
                  100%
                </span>
                <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: '#c9b8a0' }}>
                  Authentic
                </span>
              </div>
              <div className="text-center">
                <span className="block text-2xl font-bold" style={{ color: '#e03e2d' }}>
                  Free
                </span>
                <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: '#c9b8a0' }}>
                  Returns
                </span>
              </div>
            </div>
            <p className="text-xs" style={{ color: '#6b5040' }}>
              © 2026 KitchenSathi. All rights reserved.
            </p>
          </div>
        </div>

        {/* RIGHT */}
        <div className="p-6 sm:p-8 lg:p-10" style={{ background: '#faf7f2' }}>
          <h1 className="text-2xl font-bold" style={{ color: '#2a1508', fontFamily: 'Georgia, serif' }}>
            Get started
          </h1>
          <p className="mt-1 text-sm" style={{ color: '#8a7060' }}>
            Create your account in just a few steps
          </p>

          <form onSubmit={formik.handleSubmit} className="mt-6 space-y-4">
            {/* Grid inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: '#4a2e1a' }}>
                  Full name
                </label>
                <input
                  name="full_name"
                  type="text"
                  placeholder="Your name"
                  value={formik.values.full_name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full rounded-lg px-4 py-2.5 text-sm outline-none transition"
                  style={{ background: '#fff', border: '1.5px solid #d9cfc4', color: '#2a1508' }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = '#3b1f0e')}
                  onBlurCapture={(e) => (e.currentTarget.style.borderColor = '#d9cfc4')}
                />
                {formik.touched.full_name && formik.errors.full_name && (
                  <p className="mt-1 text-xs" style={{ color: '#e03e2d' }}>
                    {formik.errors.full_name}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: '#4a2e1a' }}>
                  Email address
                </label>
                <input
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full rounded-lg px-4 py-2.5 text-sm outline-none transition"
                  style={{ background: '#fff', border: '1.5px solid #d9cfc4', color: '#2a1508' }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = '#3b1f0e')}
                  onBlurCapture={(e) => (e.currentTarget.style.borderColor = '#d9cfc4')}
                />
                {formik.touched.email && formik.errors.email && (
                  <p className="mt-1 text-xs" style={{ color: '#e03e2d' }}>
                    {formik.errors.email}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: '#4a2e1a' }}>
                  Phone number
                </label>
                <input
                  name="phone"
                  type="text"
                  placeholder="9999999999"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full rounded-lg px-4 py-2.5 text-sm outline-none transition"
                  style={{ background: '#fff', border: '1.5px solid #d9cfc4', color: '#2a1508' }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = '#3b1f0e')}
                  onBlurCapture={(e) => (e.currentTarget.style.borderColor = '#d9cfc4')}
                />
                {formik.touched.phone && formik.errors.phone && (
                  <p className="mt-1 text-xs" style={{ color: '#e03e2d' }}>
                    {formik.errors.phone}
                  </p>
                )}
              </div>

              {/* Username */}
              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: '#4a2e1a' }}>
                  Username
                </label>
                <input
                  name="username"
                  type="text"
                  placeholder="your_name"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full rounded-lg px-4 py-2.5 text-sm outline-none transition"
                  style={{ background: '#fff', border: '1.5px solid #d9cfc4', color: '#2a1508' }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = '#3b1f0e')}
                  onBlurCapture={(e) => (e.currentTarget.style.borderColor = '#d9cfc4')}
                />
                {formik.touched.username && formik.errors.username && (
                  <p className="mt-1 text-xs" style={{ color: '#e03e2d' }}>
                    {formik.errors.username}
                  </p>
                )}
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: '#4a2e1a' }}>
                Password
              </label>
              <input
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="At least 8 chars, 1 uppercase & 1 number"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full rounded-lg px-4 py-2.5 text-sm outline-none transition"
                style={{ background: '#fff', border: '1.5px solid #d9cfc4', color: '#2a1508' }}
                onFocus={(e) => (e.currentTarget.style.borderColor = '#3b1f0e')}
                onBlurCapture={(e) => (e.currentTarget.style.borderColor = '#d9cfc4')}
              />
              {formik.touched.password && formik.errors.password && (
                <p className="mt-1 text-xs" style={{ color: '#e03e2d' }}>
                  {formik.errors.password}
                </p>
              )}
              <button type="button" onClick={() => setShowPassword((p) => !p)} className="mt-1 text-xs font-medium hover:underline" style={{ color: '#3b1f0e' }}>
                {showPassword ? 'Hide password' : 'Show password'}
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isPending}
              className="w-full rounded-lg py-3 text-sm font-semibold text-white transition disabled:opacity-60"
              style={{ background: '#e03e2d' }}
              onMouseEnter={(e) => (e.currentTarget.style.background = '#c43526')}
              onMouseLeave={(e) => (e.currentTarget.style.background = '#e03e2d')}
            >
              {isPending ? 'Creating account...' : 'Create account'}
            </button>
          </form>

          {/* Divider */}
          <div className="my-5 flex items-center gap-3">
            <div className="h-px flex-1" style={{ background: '#d9cfc4' }} />
            <span className="text-xs" style={{ color: '#8a7060' }}>
              OR
            </span>
            <div className="h-px flex-1" style={{ background: '#d9cfc4' }} />
          </div>

          {/* Google Register */}
          <div className="flex justify-center">
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                console.log('Google Register Credential:', credentialResponse.credential);
              }}
              onError={() => {
                console.log('Google Register Failed');
              }}
              theme="outline"
              size="large"
              width={300}
            />
          </div>

          <p className="mt-5 text-center text-sm" style={{ color: '#8a7060' }}>
            Already have an account?{' '}
            <button onClick={() => navigate('/login')} className="font-medium hover:underline" style={{ color: '#e03e2d' }}>
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
