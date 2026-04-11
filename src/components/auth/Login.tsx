import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { GoogleLogin } from "@react-oauth/google";
import { authLoginValidationSchema, type IAuthDocument, type IAuthLogin } from "@kitchensathi12-arch/ecommerce-types";
import Input from "@/components/ui/input/Input";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "@/services/AuthServices";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";
import { AuthStore } from "@/store/store";


const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  // ----------------- here i use zustand store ---------------
  const { addUser } = AuthStore((state) => state)


  // ---------------------- API --------------------------
  const { mutate, isPending } = useMutation({
    mutationFn: loginUser,

    onSuccess: (data) => {
      toast.success("Login Successfully 🚀");
      addUser(data.user);
      // Navigate home
      navigate("/");
    },

    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(
        error.response?.data?.message || "Login Failed ❌"
      );
    },
  });

  // ---------------------- FORM --------------------------
  const formik = useFormik<IAuthLogin>({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: authLoginValidationSchema,
    onSubmit: (values) => {
      mutate(values);
    },
  });



  return (
    <div className="relative min-h-screen bg-[url('/Bg.jpg')] bg-cover bg-bottom bg-no-repeat flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />

      <div className="relative w-full max-w-5xl overflow-hidden rounded-2xl shadow-2xl bg-white grid md:grid-cols-2">

        {/* LEFT SIDE */}
        <div className="hidden md:flex flex-col justify-between px-12 py-10 bg-gradient-to-br from-sky-700 to-sky-900 text-white">
          <div>
            <h2 className="text-4xl font-bold">Welcome back</h2>
            <p className="mt-3 text-sky-100 max-w-sm">
              Sign in to manage your orders, products and profile.
            </p>
          </div>

          <div className="flex flex-1 items-center justify-center">
            <img
              src="/login.png"
              alt="Login illustration"
              className="max-h-[400px] object-contain drop-shadow-2xl"
            />
          </div>

          <p className="text-xs text-sky-200">
            © 2026 YourCompany. All rights reserved.
          </p>
        </div>

        {/* RIGHT SIDE */}
        <div className="bg-gray-100 p-8 sm:p-10">
          <h1 className="text-2xl font-semibold text-gray-900">
            Sign in
          </h1>
          <p className="mt-1 text-sm text-gray-600">
            Enter your credentials to continue
          </p>

          <form
            onSubmit={formik.handleSubmit}
            className="mt-8 space-y-5"
          >
            <Input
              label="Email or username"
              name="username"
              placeholder="Enter email or username"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.username &&
                formik.errors.username
              }
              autoComplete="username"
            />

            <div>
              <Input
                label="Password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.password &&
                  formik.errors.password
                }
                autoComplete="current-password"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword((p) => !p)
                }
                className="mt-1 text-xs font-medium text-sky-700 hover:underline"
              >
                {showPassword
                  ? "Hide password"
                  : "Show password"}
              </button>
            </div>

            <div className="flex justify-end">
              <Link
                to="/forgot-password"
                className="text-sm font-medium text-sky-700 hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full rounded-lg bg-sky-700 py-3 text-sm font-semibold text-white hover:bg-sky-800 transition disabled:opacity-60"
            >
              {isPending
                ? "Signing in..."
                : "Sign in"}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-gray-300" />
            <span className="text-xs text-gray-500">
              OR
            </span>
            <div className="h-px flex-1 bg-gray-300" />
          </div>

          {/* Google Login */}
          <div className="flex justify-center">
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                console.log(
                  "Google Credential:",
                  credentialResponse.credential
                );
                // Send credential to backend
              }}
              onError={() => {
                toast.error("Google Login Failed ❌");
              }}
              theme="outline"
              size="large"
              width={300}
            />
          </div>

          <p className="mt-6 text-center text-sm text-gray-600">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="font-medium text-sky-700 hover:underline"
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
