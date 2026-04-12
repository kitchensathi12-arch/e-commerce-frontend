import { useFormik } from 'formik';
import { Link } from 'react-router-dom';
import Input from '../../components/ui/input/Input';
import { authForgetPasswordValidationSchema } from '@kitchensathi12-arch/ecommerce-types';

const ForgotPassword = () => {
  const { values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting, status } = useFormik<{ email: string }>({
    initialValues: {
      email: '',
    },
    validationSchema: authForgetPasswordValidationSchema,
    onSubmit: async (values, { setStatus }) => {
      try {
        console.log('Reset email:', values.email);
        // API call here
        setStatus({ success: 'Password reset link has been sent to your email.' });
      } catch {
        setStatus({ error: 'Something went wrong. Please try again.' });
      }
    },
  });

  return (
    <div className="relative min-h-screen bg-[url('/Bg.jpg')] bg-cover bg-bottom flex items-center justify-center px-4">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />

      {/* Card */}
      <div className="relative w-full max-w-5xl bg-white rounded-2xl shadow-2xl grid md:grid-cols-2 overflow-hidden">
        {/* LEFT */}
        <div className="hidden md:flex flex-col justify-between p-10 bg-linear-to-br from-sky-700 to-sky-900 text-white">
          <div>
            <h2 className="text-3xl font-bold">Forgot password?</h2>
            <p className="mt-2 text-sky-100 max-w-sm">No worries. We’ll help you reset it quickly and securely.</p>
          </div>

          <div className="flex flex-1 items-center justify-center">
            <img src="/login.png" alt="Login illustration" className="max-h-50 mr-10 object-contain drop-shadow-2xl" />
          </div>

          <p className="text-xs text-sky-200">© 2026 YourCompany. All rights reserved.</p>
        </div>

        {/* RIGHT */}
        <div className="bg-gray-100 p-8 sm:p-10">
          <h1 className="text-2xl font-semibold text-gray-900">Reset your password</h1>
          <p className="mt-1 text-sm text-gray-600">Enter your email and we’ll send you a reset link</p>

          {/* Alerts */}
          {status?.success && <div className="mt-6 rounded-md border border-sky-200 bg-sky-50 px-4 py-3 text-sm text-sky-700">{status.success}</div>}

          {status?.error && <div className="mt-6 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{status.error}</div>}

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <Input
              label="Email address"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.email && errors.email}
            />

            <button type="submit" disabled={isSubmitting} className="w-full rounded-lg bg-sky-700 py-3 text-sm font-semibold text-white hover:bg-sky-800 transition disabled:opacity-60">
              {isSubmitting ? 'Sending link...' : 'Send reset link'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Remember your password?{' '}
            <Link to="/login" className="font-medium text-sky-700 hover:underline">
              Back to Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
