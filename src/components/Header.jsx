import { Heart, Menu, MoreVertical, Search, ShoppingCart, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import Button from './ui/Buttons';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/auth';

export function Header() {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const user = useAuthStore(state => state.user)

  const navLinks = [
    { label: 'Home', key: 'home', path: '/' },
    { label: 'Products', key: 'products', path: '/products' },
    { label: 'Categories', key: 'offers', path: '/categories' },
    { label: 'Brands', key: 'about', path: '/brands' },
  ];

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu on route change / nav click
  const handleNavClick = (path) => {
    navigate(path);
    setMobileOpen(false);
  };

  return (
    <>
      {/* Top bar */}
      <div className="bg-brown text-amber-pale text-xs font-medium text-center py-1.5 px-4 leading-relaxed">
        <span className="hidden sm:inline">
          🚚 Free delivery on orders above ₹999 &nbsp;|&nbsp; 📞 Customer care: 1800-XXX-XXXX &nbsp;|&nbsp; ⭐ 4.7★ Rated on Google
        </span>
        <span className="sm:hidden">🚚 Free delivery above ₹999</span>
      </div>

      <header className="sticky top-0 z-50 bg-white border-b border-border">
        <div className="flex items-center justify-between w-full px-4 sm:px-6 h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <img src="/Logo.jpg" alt="KitchenSaathi Logo" className="h-12 w-12 sm:h-16 sm:w-16" />
            <div className="hidden sm:block">
              <div className="font-playfair font-semibold text-xl text-brown leading-none">
                Kitchen<span className="text-amber-light">Saathi</span>
              </div>
              <div className="text-[9px] text-text-muted tracking-[1.2px] font-medium uppercase">
                Your Trusted Kitchen Companion
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-8">
            {navLinks.map((l) => (
              <span
                key={l.key}
                onClick={() => navigate(l.path)}
                className="nav-link cursor-pointer hover:before:w-full inline-block relative text-brown font-medium"
                style={{ fontSize: 15 }}
              >
                {l.label}
              </span>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-1 sm:gap-2">

            {/* Search — hidden on mobile (search is in mobile menu) */}
            <Button
              variant="outline"
              size="sm"
              className="border-none hidden sm:flex"
              onClick={() => setSearchOpen(!searchOpen)}
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </Button>

            {/* Wishlist — hidden on small screens */}
            <Button
              onClick={() => navigate(user ? '/wishlist' : '/login')}
              variant="outline"
              size="sm"
              className="border-none hidden sm:flex"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
            </Button>

            {/* Cart */}
            <Button
              onClick={() => navigate(user ? '/cart' : '/login')}
              leftIcon={<ShoppingCart className="w-5 h-5" />}
            >
              <span className="hidden md:block">Cart</span>
            </Button>

            {/* Three-dot dropdown */}
            <div className="relative hidden sm:block" ref={menuRef}>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="More options"
              >
                <MoreVertical className="w-5 h-5" />
              </Button>

              {menuOpen && (
                <div className="absolute right-0 top-12 w-48 bg-white border border-border rounded-xl shadow-md z-50 overflow-hidden">
                  {!user ? (
                    <button
                      onClick={() => { navigate('/login'); setMenuOpen(false); }}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm text-brown hover:bg-amber-pale border-b border-border"
                    >
                      🔑 Log in
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={() => { navigate('/profile'); setMenuOpen(false); }}
                        className="w-full flex items-center gap-3 px-4 py-3 text-sm text-brown hover:bg-amber-pale border-b border-border"
                      >
                        👤 My profile
                      </button>
                      <button
                        onClick={() => { navigate('/addresses'); setMenuOpen(false); }}
                        className="w-full flex items-center gap-3 px-4 py-3 text-sm text-brown hover:bg-amber-pale border-b border-border"
                      >
                        📍 My addresses
                      </button>
                      {user.isAdmin && (
                        <button
                          onClick={() => { navigate('/admin'); setMenuOpen(false); }}
                          className="w-full flex items-center gap-3 px-4 py-3 text-sm text-brown hover:bg-amber-pale border-b border-border"
                        >
                          ⚙️ Admin panel
                        </button>
                      )}
                      <button
                        onClick={() => { /* your logout fn */ setMenuOpen(false); }}
                        className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-700 hover:bg-red-50"
                      >
                        🚪 Log out
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Mobile hamburger */}
            <button
              className="md:hidden cursor-pointer text-brown p-2"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Desktop Search bar */}
        {searchOpen && (
          <div className="border-t border-amber-pale py-3 px-6 hidden sm:flex items-center justify-center">
            <div className="w-full md:w-[600px] flex items-center gap-2.5">
              <input
                autoFocus
                placeholder="Search for mixer grinders, pressure cookers…"
                className="flex-1 border-2 border-amber-light rounded-full px-5 py-2 text-base font-dm-sans bg-amber-pale outline-none"
              />
              <button className="h-10 w-28 bg-amber-light border-0 cursor-pointer text-white rounded-full flex items-center justify-center gap-1.5 text-[13px] font-semibold">
                Search
              </button>
            </div>
          </div>
        )}

        {/* Mobile Menu — full dropdown */}
        {mobileOpen && (
          <div className="md:hidden border-t border-amber-pale bg-white">

            {/* Mobile search */}
            <div className="px-4 py-3 border-b border-amber-pale">
              <div className="flex items-center gap-2">
                <input
                  placeholder="Search products…"
                  className="flex-1 border-2 border-amber-light rounded-full px-4 py-2 text-sm bg-amber-pale outline-none"
                />
                <button className="h-9 w-20 bg-amber-light border-0 cursor-pointer text-white rounded-full text-[13px] font-semibold">
                  Search
                </button>
              </div>
            </div>

            {/* Nav links */}
            {navLinks.map((l) => (
              <div
                key={l.key}
                onClick={() => handleNavClick(l.path)}
                className="px-4 py-3 border-b border-amber-pale cursor-pointer font-medium text-brown flex items-center justify-between"
              >
                {l.label}
                <span className="text-text-muted text-xs">›</span>
              </div>
            ))}

            {/* Wishlist */}
            <div
              onClick={() => { navigate(user ? '/wishlist' : '/login'); setMobileOpen(false); }}
              className="px-4 py-3 border-b border-amber-pale cursor-pointer font-medium text-brown flex items-center gap-3"
            >
              <Heart className="w-4 h-4" /> Wishlist
            </div>

            {/* Account section */}
            <div className="px-4 pt-3 pb-1">
              <p className="text-[10px] text-text-muted uppercase tracking-widest font-semibold mb-1">Account</p>
            </div>

            {!user ? (
              <div
                onClick={() => { navigate('/login'); setMobileOpen(false); }}
                className="px-4 py-3 border-b border-amber-pale cursor-pointer font-medium text-brown flex items-center gap-3"
              >
                🔑 Log in
              </div>
            ) : (
              <>
                <div
                  onClick={() => { navigate('/profile'); setMobileOpen(false); }}
                  className="px-4 py-3 border-b border-amber-pale cursor-pointer font-medium text-brown flex items-center gap-3"
                >
                  👤 My profile
                </div>
                <div
                  onClick={() => { navigate('/addresses'); setMobileOpen(false); }}
                  className="px-4 py-3 border-b border-amber-pale cursor-pointer font-medium text-brown flex items-center gap-3"
                >
                  📍 My addresses
                </div>
                {user.isAdmin && (
                  <div
                    onClick={() => { navigate('/admin'); setMobileOpen(false); }}
                    className="px-4 py-3 border-b border-amber-pale cursor-pointer font-medium text-brown flex items-center gap-3"
                  >
                    ⚙️ Admin panel
                  </div>
                )}
                <div
                  onClick={() => { /* your logout fn */ setMobileOpen(false); }}
                  className="px-4 py-3 cursor-pointer font-medium text-red-700 flex items-center gap-3"
                >
                  🚪 Log out
                </div>
              </>
            )}
          </div>
        )}
      </header>
    </>
  );
}