import { useState, useEffect, type FC } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, Search, ChevronDown, ClipboardList } from 'lucide-react';
import Logo from '../../assets/Images/Logos/Logo.jpg';
import { AuthStore } from '@/store/store';
import { useMutation } from '@tanstack/react-query';
import { logoutUser } from '@/services/AuthServices';

const Navbar: FC<{ cartCount?: number; userName?: string }> = ({ cartCount = 0, userName = 'User' }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  const navigate = useNavigate();
  const location = useLocation(); // ✅ FIX

  const { user, removeUser } = AuthStore((state) => state);
  const { mutate } = useMutation({ mutationFn: logoutUser });

  // ✅ FIX: auto close mobile on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // ✅ FIX: scroll lock
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : 'auto';
  }, [mobileOpen]);

  // ✅ FIX: safe toggle
  const toggleMobile = () => {
    setMobileOpen((prev) => !prev);
  };

  const handleLogout = () => {
    mutate();
    removeUser();
    setMobileOpen(false);
  };

  const navLinks = [
    { label: 'Home', to: '/' },
    { label: 'Shop', to: '/shop' },
    { label: 'Categories', to: '/categories' },
    { label: 'About Us', to: '/about' },
    { label: 'Contact Us', to: '/contact' },
  ];

  const firstLetter = user?.username ? user.username.charAt(0).toUpperCase() : 'U';

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');
        * { box-sizing: border-box; }
        button:focus, button:focus-visible, input:focus, a:focus { outline: none; }

        .top-bar {
          background: #111;
          color: #fff;
          text-align: center;
          padding: 10px 0;
          font-size: 13.5px;
          font-weight: 500;
          position: relative;
          z-index: 101;
        }
        .top-bar a { color: #f4a261; text-decoration: underline; }

        .nb-root {
          width: 100%;
          background: white;
          border-bottom: 1px solid #eee;
          position: sticky;
          top: 0;
          z-index: 50;
          font-family: 'Inter', sans-serif;
        }

        .nb-inner {
          width: 100%;
          padding: 0 16px;
          height: 68px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        @media (min-width: 768px) { .nb-inner { padding: 0 32px; height: 78px; } }
        @media (min-width: 1024px) { .nb-inner { padding: 0 60px; } }

        .nb-logo img { height: 44px; }
        @media (min-width: 768px) { .nb-logo img { height: 52px; } }

        .nb-nav a {
          margin: 0 20px;
          font-weight: 500;
          color: #333;
          text-decoration: none;
          font-size: 14px;
        }
        .nb-nav a:hover { color: #e63939; }

        .nb-search {
          width: 280px;
          background: #f8f8f8;
          border-radius: 50px;
          padding: 0 16px;
          height: 42px;
          display: flex;
          align-items: center;
          gap: 10px;
          transition: all 0.3s ease;
        }
        @media (min-width: 1024px) { .nb-search { width: 380px; height: 46px; } }
        .nb-search.focused { background: white; border: 2px solid #e63939; }
        .nb-search input { outline: none; border: none; background: transparent; width: 100%; font-size: 14px; }

        .nb-actions { display: flex; align-items: center; gap: 14px; }
        @media (min-width: 768px) { .nb-actions { gap: 18px; } }

        .nb-cart { position: relative; }
        .nb-cart-badge {
          position: absolute;
          top: -4px; right: -4px;
          background: #e63939;
          color: white;
          font-size: 10px;
          font-weight: 700;
          width: 18px; height: 18px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .mobile-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.3);
          z-index: 200;
        }

        .mobile-drawer {
          position: fixed;
          inset: 0;
          width: 100vw;
          max-width: 100vw;
          height: 100%;
          background: white;
          z-index: 201;
          overflow-y: auto;
          padding-top: 68px;
          font-family: 'Inter', sans-serif;
        }

        .mobile-link {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          border-radius: 12px;
          color: #333;
          font-weight: 500;
          font-size: 15px;
          text-decoration: none;
          transition: background 0.15s;
          width: 100%;
          background: none;
          border: none;
          cursor: pointer;
          font-family: 'Inter', sans-serif;
        }
        .mobile-link:hover { background: #fff5f5; color: #e63939; }
        .mobile-link-danger { color: #e63939; }
        .mobile-link-danger:hover { background: #fff5f5; }

        .profile-dropdown {
          position: absolute;
          right: 0;
          margin-top: 12px;
          width: 208px;
          background: white;
          border-radius: 16px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.12);
          padding: 8px 0;
          border: 1px solid #f0f0f0;
          z-index: 300;
        }
      `}</style>

      <div className="top-bar">
        Summer Sale For All Kitchen Appliances - Up to 50% OFF! <a href="#">Shop Now</a>
      </div>

      <header className="nb-root">
        <div className="nb-inner">
          <Link to="/" className="nb-logo">
            <img src={Logo} alt="Logo" />
          </Link>

          <nav className="nb-nav hidden md:flex">
            {navLinks.map((l) => (
              <Link key={l.to} to={l.to}>
                {l.label}
              </Link>
            ))}
          </nav>

          <div className={`nb-search hidden md:flex ${searchFocused ? 'focused' : ''}`}>
            <Search size={18} color="#999" />
            <input type="text" placeholder="What are you looking for?" onFocus={() => setSearchFocused(true)} onBlur={() => setSearchFocused(false)} />
          </div>

          <div className="nb-actions">
            <Link to="/cart" className="nb-cart">
              <ShoppingCart size={22} />
              {cartCount > 0 && <span className="nb-cart-badge">{cartCount}</span>}
            </Link>

            <div className="hidden md:flex items-center">
              {!user ? (
                <button onClick={() => navigate('/login')} className="flex items-center gap-2 px-5 py-2.5 bg-[#e63939] text-white rounded-full text-sm font-medium hover:bg-red-700 transition">
                  <User size={16} /> Login
                </button>
              ) : (
                <div style={{ position: 'relative' }}>
                  <button onClick={() => setProfileOpen(!profileOpen)} className="flex items-center gap-2">
                    <div className="w-9 h-9 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white font-semibold">{firstLetter}</div>
                    <span className="font-medium text-sm">{user?.role === 'admin' ? 'Admin' : userName}</span>
                    <ChevronDown size={14} />
                  </button>

                  {profileOpen && (
                    <>
                      <div style={{ position: 'fixed', inset: 0, zIndex: 100 }} onClick={() => setProfileOpen(false)} />
                      <div className="profile-dropdown">
                        <Link to="/account" className="flex items-center gap-3 px-5 py-3 text-sm hover:bg-gray-50">
                          <User size={15} /> Profile
                        </Link>

                        <Link to="/orders" className="flex items-center gap-3 px-5 py-3 text-sm hover:bg-gray-50">
                          <ClipboardList size={15} /> Orders
                        </Link>

                        {user?.role === 'admin' && (
                          <Link to="/dashboard" className="flex items-center gap-3 px-5 py-3 text-sm hover:bg-gray-50 text-blue-600 font-medium">
                            Admin Panel
                          </Link>
                        )}

                        <div className="h-px bg-gray-100 mx-3 my-1" />

                        <button onClick={handleLogout} className="w-full flex items-center gap-3 px-5 py-3 text-sm text-red-600 hover:bg-red-50">
                          <X size={15} /> Logout
                        </button>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>

            <button onClick={toggleMobile} className="md:hidden p-1">
              {mobileOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </header>

      {mobileOpen && <div className="mobile-overlay md:hidden" onClick={() => setMobileOpen(false)} />}

      {mobileOpen && (
        <div className="mobile-drawer md:hidden">
          <div className="px-5 py-5 space-y-5">
            <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3 border border-gray-200">
              <Search size={16} color="#999" />
              <input type="text" placeholder="What are you looking for?" className="bg-transparent text-sm outline-none w-full" />
            </div>

            <div className="space-y-1">
              {navLinks.map((l) => (
                <Link key={l.to} to={l.to} className="mobile-link">
                  {l.label}
                </Link>
              ))}
            </div>

            {!user ? (
              <button onClick={() => navigate('/login')} className="w-full bg-red-600 text-white py-3 rounded-xl">
                Login
              </button>
            ) : (
              <div>
                <Link to="/account" className="mobile-link">
                  <User size={17} /> Profile
                </Link>

                <Link to="/orders" className="mobile-link">
                  <ClipboardList size={17} /> Orders
                </Link>

                {user?.role === 'admin' && (
                  <Link to="/dashboard" className="mobile-link text-blue-600 font-medium">
                    Admin Panel
                  </Link>
                )}

                <button onClick={handleLogout} className="mobile-link mobile-link-danger">
                  <X size={17} /> Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
