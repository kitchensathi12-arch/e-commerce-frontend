import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Buttons';
import { LoginValidation } from '@/validation/authVallidation/LoginValidation';
import { FcGoogle } from 'react-icons/fc';

const FEATURES = [
  { icon: '🚚', label: 'Free Delivery' },
  { icon: '🔒', label: 'Secure Payment' },
  { icon: '⭐', label: 'Trusted Brands' },
  { icon: '↩️', label: 'Easy Returns' },
];

const MobileBanner = () => (
  <div
    className="lg:hidden w-full px-6 pt-10 pb-8 text-center"
    style={{ background: 'linear-gradient(160deg, #7a4a22 0%, #3e2610 100%)' }}
  >
    <span
      className="inline-block text-[11px] font-semibold px-3 py-1 rounded-full mb-4"
      style={{
        background: 'rgba(255,255,255,0.12)',
        border: '1px solid rgba(255,255,255,0.2)',
        color: 'rgba(255,255,255,0.85)',
        letterSpacing: '0.04em',
      }}
    >
      ✨ India's Trusted Kitchen Store
    </span>
    <h1
      className="font-playfair text-[28px] sm:text-[32px] font-bold text-white mb-2"
      style={{ lineHeight: 1.2 }}
    >
      Welcome <span style={{ color: '#f0a830' }}>Back.</span>
    </h1>
    <p className="text-[13px]" style={{ color: 'rgba(255,255,255,0.55)' }}>
      Login to continue shopping premium kitchen essentials.
    </p>
  </div>
);

const LoginPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '', remember: false });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = async () => {
    const e = LoginValidation(form);
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
  };

  const setField = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: '' }));
  };

  return (
    <div
      className="min-h-screen flex flex-col lg:flex-row lg:items-center lg:justify-center lg:p-6 relative overflow-hidden"
      style={{
        background:
          'radial-gradient(ellipse 70% 70% at 30% 40%, #7a4a22 0%, #5c3a1e 40%, #3e2610 100%)',
      }}
    >
      <div
        className="fixed inset-0 pointer-events-none opacity-30 z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 w-full lg:hidden">
        <MobileBanner />
      </div>

      <div
        className="relative z-10 w-full lg:max-w-[1160px] lg:grid lg:rounded-[28px] overflow-hidden animate-scale-in"
        style={{
          gridTemplateColumns: '1fr 1.1fr',
          boxShadow: '0 40px 100px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.07)',
        }}
      >
        {/* LEFT PANEL */}
        <div
          className="relative flex-col justify-between p-12 overflow-hidden hidden lg:flex"
          style={{ background: 'linear-gradient(145deg, #7a4a22 0%, #5c3a1e 50%, #3e2610 100%)' }}
        >
          <div
            className="absolute -top-20 -right-20 w-72 h-72 rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(212,134,11,0.15) 0%, transparent 70%)',
            }}
          />
          <div
            className="absolute -bottom-16 -left-16 w-60 h-60 rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(240,168,48,0.10) 0%, transparent 70%)',
            }}
          />
          <div className="relative z-10">
            <span className="tag mb-7 inline-block">✨ India's Trusted Kitchen Store</span>
            <h1
              className="font-playfair text-[40px] font-bold text-white mb-5"
              style={{ lineHeight: 1.18 }}
            >
              Cook Smart.
              <br />
              Shop Easy.
              <br />
              <span className="text-amber-light">Welcome Back.</span>
            </h1>
            <p
              className="text-sm leading-7 max-w-xs mb-9"
              style={{ color: 'rgba(255,255,255,0.60)' }}
            >
              Premium kitchen appliances crafted for modern Indian homes. Secure shopping, trusted
              quality, fast delivery and dedicated after-sales support.
            </p>
            <div className="grid grid-cols-2 gap-3">
              {FEATURES.map(({ icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 text-[13px] rounded-2xl px-4 py-3 transition-colors hover:bg-white/[0.12]"
                  style={{
                    background: 'rgba(255,255,255,0.07)',
                    border: '1px solid rgba(255,255,255,0.10)',
                    color: 'rgba(255,255,255,0.80)',
                  }}
                >
                  <span>{icon}</span> {label}
                </div>
              ))}
            </div>
          </div>
          <div className="relative z-10 flex gap-2 mt-8">
            <div className="h-2 rounded-full bg-amber-light" style={{ width: 24 }} />
            <button
              onClick={() => navigate('/register')}
              className="h-2 w-2 rounded-full transition-all hover:bg-white/50"
              style={{ background: 'rgba(255,255,255,0.25)' }}
            />
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="bg-off-white flex flex-col justify-center px-6 py-8 sm:px-10 sm:py-10 lg:px-14 lg:py-12">
          <span className="tag mb-4 hidden lg:inline-block">👋 Welcome Back</span>
          <h2 className="font-playfair text-[26px] sm:text-[32px] font-bold text-text mb-1">
            Login Account
          </h2>
          <p className="text-text-muted text-[13px] sm:text-[13.5px] leading-relaxed mb-7">
            Login to continue shopping premium kitchen essentials.
          </p>

          <div className="mb-[16px]">
            <Input
              label="Email Address"
              type="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={setField('email')}
              error={errors.email}
              leftIcon={<Mail size={16} />}
            />
          </div>

          <div className="mb-5">
            <Input
              label="Password"
              type={showPass ? 'text' : 'password'}
              placeholder="Enter your password"
              value={form.password}
              onChange={setField('password')}
              error={errors.password}
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
                checked={form.remember}
                onChange={(e) => setForm((f) => ({ ...f, remember: e.target.checked }))}
                className="w-[15px] h-[15px] accent-amber cursor-pointer"
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

          <Button size="lg" loading={loading} onClick={handleSubmit} className="w-full shimmer-btn">
            Login Now &nbsp;→
          </Button>

          <div className="flex items-center gap-3 my-4 text-[11px] text-steel-dark font-medium uppercase tracking-wider">
            <span className="flex-1 h-px bg-border" /> or continue with{' '}
            <span className="flex-1 h-px bg-border" />
          </div>

          <button className="w-full h-[46px] rounded-2xl border border-border bg-white flex items-center justify-center gap-2 text-[13.5px] font-medium text-text cursor-pointer transition-all duration-300 hover:border-amber hover:shadow-[0_4px_14px_rgba(212,134,11,0.12)] hover:-translate-y-px">
            <FcGoogle size={20} />
            Continue with Google
          </button>

          <p className="text-[12px] text-steel-dark text-center mt-5 mb-2">
            Don't have an account?{' '}
            <button
              onClick={() => navigate('/register')}
              className="text-amber font-semibold hover:text-brown transition-colors cursor-pointer"
            >
              Create one
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
