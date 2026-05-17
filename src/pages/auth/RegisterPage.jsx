import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Phone, Lock, Eye, EyeOff } from 'lucide-react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Buttons';


const RegisterPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '', password: '', agree: false });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    setLoading(false);
  };

  const setField = (key) => (e) => {
    setForm(f => ({ ...f, [key]: e.target.value }));
    if (errors[key]) setErrors(prev => ({ ...prev, [key]: '' }));
  };

  return (
    <div className="bg-off-white flex flex-col justify-center px-6 py-8 sm:px-10 sm:py-10 lg:px-14 lg:py-10">
      <span className="tag mb-4 hidden lg:inline-block w-fit">🍳 Join KitchenSathi</span>
      <h2 className="font-playfair text-[26px] sm:text-[30px] font-bold text-text mb-1">Create Account</h2>
      <p className="text-text-muted text-[13px] sm:text-[13.5px] leading-relaxed mb-5">Start shopping the best kitchen essentials in India.</p>

      <div className="flex flex-col sm:flex-row gap-3 mb-[16px]">
        <Input label="First Name" placeholder="Ravi" value={form.firstName} onChange={setField('firstName')} error={errors.firstName} leftIcon={<User size={15} />} />
        <Input label="Last Name" placeholder="Sharma" value={form.lastName} onChange={setField('lastName')} error={errors.lastName} leftIcon={<User size={15} />} />
      </div>

      <div className="mb-4">
        <Input label="Email Address" type="email" placeholder="ravi@example.com" value={form.email} onChange={setField('email')} error={errors.email} leftIcon={<Mail size={16} />} />
      </div>

      <div className="mb-4">
        <Input label="Phone Number" type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={setField('phone')} error={errors.phone} leftIcon={<Phone size={16} />} />
      </div>

      <div className="mb-4">
        <Input
          label="Password"
          type={showPass ? 'text' : 'password'}
          placeholder="Create a strong password"
          value={form.password}
          onChange={setField('password')}
          error={errors.password}
          leftIcon={<Lock size={16} />}
          rightIcon={
            <button type="button" onClick={() => setShowPass(v => !v)} className="text-gray-400 hover:text-amber transition-colors cursor-pointer">
              {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          }
        />
      </div>

      <div className="mb-5">
        <label className="flex items-start gap-2 cursor-pointer select-none">
          <input type="checkbox" checked={form.agree} onChange={(e) => { setForm(f => ({ ...f, agree: e.target.checked })); if (errors.agree) setErrors(prev => ({ ...prev, agree: '' })); }} className="mt-0.5 w-[15px] h-[15px] accent-amber cursor-pointer flex-shrink-0" />
          <span className="text-[12.5px] text-text-muted leading-relaxed">
            I agree to the{' '}
            <a href="#" className="text-amber font-semibold hover:text-brown transition-colors">Terms of Service</a>{' '}
            and{' '}
            <a href="#" className="text-amber font-semibold hover:text-brown transition-colors">Privacy Policy</a>
          </span>
        </label>
        {errors.agree && <p className="mt-1 text-sm text-red-500 font-medium">{errors.agree}</p>}
      </div>

      <Button size="lg" loading={loading} onClick={handleSubmit} className="w-full shimmer-btn">
        Create Account &nbsp;→
      </Button>

      <div className="flex items-center gap-3 my-4 text-[11px] text-steel-dark font-medium uppercase tracking-wider">
        <span className="flex-1 h-px bg-border" /> or sign up with <span className="flex-1 h-px bg-border" />
      </div>

      <button className="w-full h-11.5 rounded-2xl border border-border bg-white flex items-center justify-center gap-2 text-[13.5px] font-medium text-text cursor-pointer transition-all duration-300 hover:border-amber hover:shadow-[0_4px_14px_rgba(212,134,11,0.12)] hover:-translate-y-px">
        <img src="/google.png" alt="google" className="w-5 h-5" />
        Continue with Google
      </button>

      <p className="text-[12px] text-steel-dark text-center mt-5 mb-2">
        Already have an account?{' '}
        <button onClick={() => navigate('/login')} className="text-amber font-semibold hover:text-brown transition-colors cursor-pointer">Sign in</button>
      </p>
    </div>
  );
};

export default RegisterPage;