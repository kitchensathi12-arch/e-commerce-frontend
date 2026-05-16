import { Heart, Menu, Search, ShoppingCart, X } from 'lucide-react';
import { useState } from 'react';
import Button from './ui/Buttons';

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const navLinks = [
    { label: 'Home', key: 'home' },
    { label: 'Products', key: 'products' },
    { label: 'Categories', key: 'offers' },
    { label: 'Brands', key: 'about' },
  ];

  return (
    <>
      {/* Top bar */}
      <div className="bg-brown text-amber-pale text-sm font-medium  text-center letter-spacing-[0.4px] ">
        🚚 Free delivery on orders above ₹999 &nbsp;|&nbsp; 📞 Customer care: 1800-XXX-XXXX
        &nbsp;|&nbsp; ⭐ 4.7★ Rated on Google
      </div>

      <header className={`sticky top-0 z-50 bg-white border-b border-border animation`}>
        <div className=" flex-around w-full max-w-screen px-6 h-16">
          {/* Logo */}
          <div style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10 }}>
            <img src="/Logo.jpg" alt="KitchenSaathi Logo" className="h-16 w-16 " />
            <div>
              <div className="font-playfair font-semibold text-xl  text-brown  leading-none">
                Kitchen<span className="text-amber-light">Saathi</span>
              </div>
              <div className="text-[9px] text-text-muted tracking-[1.2px] font-medium uppercase">
                Your Trusted Kitchen Companion
              </div>
            </div>
          </div>

          {/* Nav */}
          <nav className="hidden md:flex gap-8">
            {navLinks.map((l) => (
              <span
                key={l.key}
                className={`nav-link cursor-pointer hover:before:w-full inline-block relative text-brown font-medium`}
                style={{ fontSize: 15 }}
              >
                {l.label}
              </span>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="border-none"
              onClick={() => setSearchOpen(!searchOpen)}
            >
              <Search className="w-5 h-5" />
            </Button>
            <Button variant="outline" size="sm" className="border-none ">
              <Heart className="w-5 h-5" />
            </Button>
            <Button leftIcon={<ShoppingCart className="w-5 h-5" />}>
              <span>Cart</span>
            </Button>
            <button
              className="md:hidden cursor-pointer text-brown p-2 "
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <Menu className="w-5 h-5" /> : <X className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Search bar */}
        {searchOpen && (
          <div className="border-t border-amber-pale py-3 px-6 md:h-20 flex-center">
            <div className="w-full md:w-150 mx-auto flex-center gap-2.5">
              <input
                autoFocus
                placeholder="Search for mixer grinders, pressure cookers…"
                className="flex-1 border-2 border-amber-light rounded-full px-5 py-2 text-base font-dm-sans bg-amber-pale outline-none"
              />

              <button className=" bg-linear-to-br h-10 w-28  from-amber to-amber-light border-0 cursor-pointer text-white rounded-full flex-center gap-1.5 text-[13px] font-semibold">
                Search
              </button>
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {mobileOpen && (
          <div>
            {navLinks.map((l) => (
              <div
                key={l.key}
                className="py-3 border-b border-amber-pale cursor-pointer font-medium text-brown"
              >
                {l.label}
              </div>
            ))}
          </div>
        )}
      </header>
    </>
  );
}
