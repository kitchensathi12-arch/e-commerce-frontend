import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Buttons';
import { useFormik } from 'formik';
import { LoginValidation } from '@/validation/AuthValidation';
import { useMutation } from '@tanstack/react-query';
import { loginUser } from '@/service/auth.service';
import toast from 'react-hot-toast';
import { useAuthStore } from '@/store/auth';



const LoginPage = () => {

  
  
  // ------------ all hooks start here ---------------
  const [showPass, setShowPass] = useState(false);


  // ---------- here i use zustand store --------
const addUser = useAuthStore(state => state.addUser)

  
  // -------------- tanstack query start here ----------------

  const {mutate:handleLoginUser,isPending:isLoginUserPending} = useMutation({
    mutationFn:(data) => loginUser(data),
    onSuccess:(data)=>{
      console.log(data.user);
      toast.success(data.message || "User Login Successfully")
      addUser(data?.user || null)
      
    },
    onError:(error)=>{
      toast.error(error.response?.data?.message || "login Failed")
    }
  })


  // ------------ handle login form with formik here ---------------
  const { values, handleBlur,errors,touched, handleChange, handleSubmit } = useFormik({
    initialValues: { username: "", password: "" },
    validationSchema:LoginValidation,
    onSubmit: async (value) => {
      await handleLoginUser(value);
    }
  })

  return (
    <form onSubmit={handleSubmit} className="bg-off-white flex flex-col justify-center px-6 py-8 sm:px-10 sm:py-10 lg:px-14 lg:py-12">
      <span className="tag mb-4 hidden lg:inline-block w-fit">👋 Welcome Back</span>
      <h2 className="font-playfair text-[26px] sm:text-[32px] font-bold text-text mb-1">
        Login Account
      </h2>
      <p className="text-text-muted text-[13px] sm:text-[13.5px] leading-relaxed mb-7">
        Login to continue shopping premium kitchen essentials.
      </p>

      <div className="mb-4">
        <Input
          label="Email or Username"
          type="text"
          placeholder="Enter your email or username"
          name="username"
          value={values.username}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.username && touched.username && errors.username}
          leftIcon={<Mail size={16} />}
        />
      </div>

      <div className="mb-5">
        <Input
          label="Password"
          type={showPass ? 'text' : 'password'}
          placeholder="Enter your password"
          name="password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.password && touched.password && errors.password}
          leftIcon={<Lock size={16} />}
          rightIcon={
            <button
              type="button"
              onClick={() => setShowPass((v) => !v)}
              className="text-gray-400 hover:text-amber transition-colors cursor-pointer"
            >
              {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          }
        />
      </div>

      <div className="flex items-center justify-between mb-6">
        <label className="flex items-center gap-2 text-[13px] text-text-muted cursor-pointer select-none">
          <input
            type="checkbox"
            className="w-3.75 h-3.75 accent-amber cursor-pointer"
          />
          Remember me
        </label>
        <a
          href="#"
          className="text-[13px] font-semibold text-amber hover:text-brown transition-colors"
        >
          Forgot Password?
        </a>
      </div>

      <Button type="submit" size="lg" disabled={isLoginUserPending} className="w-full shimmer-btn">
        Login Now &nbsp;→
      </Button>

      <div className="flex items-center gap-3 my-4 text-[11px] text-steel-dark font-medium uppercase tracking-wider">
        <span className="flex-1 h-px bg-border" /> or continue with{' '}
        <span className="flex-1 h-px bg-border" />
      </div>

      <button type='button' className="w-full h-11.5 rounded-2xl border border-border bg-white flex items-center justify-center gap-2 text-[13.5px] font-medium text-text cursor-pointer transition-all duration-300 hover:border-amber hover:shadow-[0_4px_14px_rgba(212,134,11,0.12)] hover:-translate-y-px">
        {/* <FcGoogle size={20} /> */}
        <img src="/google.png" alt="google" className="w-5 h-5" />
        Continue with Google
      </button>

      <p className="text-[12px] text-steel-dark text-center mt-5 mb-2">
        Don't have an account?{' '}
        <Link to="/register"
          className="text-amber font-semibold hover:text-brown transition-colors cursor-pointer"
        >
          Create one
        </Link>
      </p>
    </form>
  );
};

export default LoginPage;
