import { Mail, MapPin, Phone } from 'lucide-react';
import Button from './ui/Buttons';
import Input from './ui/Input';

const QUICK_LINKS = [
  { label: 'Home',             path: '/' },
  { label: 'Products',         path: '/shop' },
  { label: 'My Account',       path: '/account' },
  { label: 'Login / Register', path: '/login' },
  { label: 'Cart',             path: '/cart' },
  { label: 'Wishlist',         path: '/wishlist' },
  { label: 'About Us',         path: '/about' },
  { label: 'Contact Us',       path: '/contact' },
];

const POLICIES = [
  { label: 'Privacy Policy', path: '/privacy-policy' },
  { label: 'Terms Of Use',   path: '/terms' },
];

const SOCIALS = [
  {
    label: 'Facebook',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    label: 'X',
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7H10v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
];

const CONTACT = [
  { icon: <Phone className="w-4 h-4" />,  text: '+91 7892664953' },
  { icon: <Mail className="w-4 h-4" />,   text: 'Chouhanbanna410@gmail.com' },
  {
    icon: <MapPin className="w-4 h-4" />,
    text: 'No.11-8-664/5, Zahir Towers, Near Rao & Rao Circle, Maidan 4th Cross Road, Maidan Road, Mangalore-575001, Karnataka',
  },
];

export function Footer() {
  return (
    <footer className="bg-brown-dark font-dm-sans">

      {/* ── Newsletter Banner ── */}
      {/* <div className="bg-gradient-to-br from-brown to-amber py-12 px-6 text-center">
        <div className="max-w-[560px] mx-auto">
          <h2 className="font-playfair text-[28px] font-bold text-white mb-2">
            Stay in the Loop!
          </h2>
          <p className="text-[15px] text-white/80 mb-6">
            Get exclusive deals, new arrivals &amp; kitchen tips delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 max-w-[420px] mx-auto">
            <Input
              type="email"
              placeholder="Enter your email…"
              className="flex-1 border-0 rounded-full px-5 py-3 text-sm font-dm-sans"
            />
            <Button>Subscribe</Button>
          </div>
        </div>
      </div> */}

      {/* ── Main Footer Grid ── */}
      <div className="max-w-screen-xl mx-auto px-6 pt-14 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.7fr_1fr_1fr_1.5fr] gap-10 mb-12">

          {/* Col 1 — Brand */}
          <div>
            <p className="font-playfair text-[22px] font-bold text-white mb-1">
              Kitchen<span className="text-amber-light">Saathi</span>
            </p>
            <p className="text-[10px] tracking-[0.16em] uppercase text-amber-light font-semibold mb-4">
              Shreenathji Enterprise
            </p>
            <p className="text-[14px] leading-7 text-white/70 mb-5">
              Your trusted companion for premium kitchen appliances. Bringing quality and
              convenience to every Indian kitchen.
            </p>
            <div className="flex gap-2.5">
              {SOCIALS.map((s) => (
                <button
                  key={s.label}
                  aria-label={s.label}
                  className="w-9 h-9 rounded-lg bg-white/15 border border-white/10 flex items-center justify-center text-white/70 cursor-pointer animation hover:bg-amber-light hover:text-brown-dark hover:border-amber-light"
                >
                  {s.icon}
                </button>
              ))}
            </div>
          </div>

          {/* Col 2 — Quick Links */}
          <div>
            <p className="text-[12px] font-bold tracking-[0.16em] uppercase text-amber-light mb-4">
              Quick Links
            </p>
            {QUICK_LINKS.map((l) => (
              <button
                key={l.label}
                onClick={() => (window.location.href = l.path)}
                className="block w-full text-left text-[14px] text-white/65 py-[5px] bg-transparent border-none font-dm-sans cursor-pointer animation hover:text-amber-light"
              >
                → {l.label}
              </button>
            ))}
          </div>

          {/* Col 3 — Policies */}
          <div>
            <p className="text-[12px] font-bold tracking-[0.16em] uppercase text-amber-light mb-4">
              Policies
            </p>
            {POLICIES.map((l) => (
              <button
                key={l.label}
                onClick={() => (window.location.href = l.path)}
                className="block w-full text-left text-[14px] text-white/65 py-[5px] bg-transparent border-none font-dm-sans cursor-pointer animation hover:text-amber-light"
              >
                → {l.label}
              </button>
            ))}
          </div>

          {/* Col 4 — Contact */}
          <div>
            <p className="text-[12px] font-bold tracking-[0.16em] uppercase text-amber-light mb-4">
              Contact Us
            </p>
            {CONTACT.map(({ icon, text }, i) => (
              <div key={i} className="flex gap-3 items-start mb-4">
                <span className="text-amber-light mt-[2px] shrink-0">{icon}</span>
                <span className="text-[14px] text-white/65 leading-[1.75]">{text}</span>
              </div>
            ))}
          </div>

        </div>

        {/* ── Bottom Bar ── */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <p className="text-[13px] text-white/40">
            © {new Date().getFullYear()} Shreenathji Enterprise (KitchenSaathi). All rights
            reserved. Made with ❤️ in India.
          </p>
          <div className="flex flex-wrap gap-5">
            {['Privacy Policy', 'Terms of Service', 'Refund Policy'].map((l) => (
              <span
                key={l}
                className="text-[12px] text-white/40 cursor-pointer animation hover:text-amber-light"
              >
                {l}
              </span>
            ))}
          </div>
        </div>
      </div>

    </footer>
  );
}