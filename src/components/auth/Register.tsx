import { useState } from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import Input from '../../components/ui/input/Input';
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

      <div className="relative w-full max-w-5xl bg-white rounded-2xl shadow-2xl grid grid-cols-1 md:grid-cols-2 overflow-hidden">
        {/* LEFT */}
        <div className="hidden md:flex flex-col justify-between p-10 bg-gradient-to-br from-sky-700 to-sky-900 text-white">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold">Create account</h2>
            <p className="mt-3 text-sky-100 max-w-sm">Join us and start managing everything in one place.</p>
          </div>

          <div className="flex flex-1 items-center justify-center">
            <img src="/login.png" alt="Register illustration" className="w-full max-w-xs lg:max-w-sm object-contain drop-shadow-2xl" />
          </div>

          <p className="text-xs text-sky-200">© 2026 YourCompany. All rights reserved.</p>
        </div>

        {/* RIGHT */}
        <div className="bg-gray-100 p-6 sm:p-8 lg:p-10">
          <h1 className="text-2xl font-semibold text-gray-900">Get started</h1>
          <p className="mt-1 text-sm text-gray-600">Create your account in just a few steps</p>

          <form onSubmit={formik.handleSubmit} className="mt-8 space-y-5">
            {/* Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Input
                label="Full name"
                name="full_name"
                placeholder="Your name"
                value={formik.values.full_name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.full_name && formik.errors.full_name}
              />

              <Input
                label="Email address"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && formik.errors.email}
              />

              <Input
                label="Phone number"
                name="phone"
                placeholder="9999999999"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.phone && formik.errors.phone}
              />

              <Input
                label="Username"
                name="username"
                placeholder="your_name"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.username && formik.errors.username}
              />
            </div>

            {/* Password */}
            <Input
              label="Password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="At least 8 chars, 1 uppercase & 1 number"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && formik.errors.password}
              rightElement={
                <button type="button" onClick={() => setShowPassword((p) => !p)} className="text-sm font-medium text-gray-500 hover:text-gray-700">
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              }
            />

            <button type="submit" disabled={isPending} className="w-full rounded-lg bg-sky-700 py-3 text-sm font-semibold text-white hover:bg-sky-800 transition disabled:opacity-60">
              {isPending ? 'Creating account...' : 'Create account'}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-gray-300" />
            <span className="text-xs text-gray-500">OR</span>
            <div className="h-px flex-1 bg-gray-300" />
          </div>

          {/* Google Register */}
          <div className="flex justify-center w-full">
            <div className="w-full sm:w-auto">
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
          </div>

          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <button onClick={() => navigate('/login')} className="font-medium text-sky-700 hover:underline">
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
