import { useState, useEffect, type FC } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, Search, ChevronDown, ClipboardList } from 'lucide-react';
import Logo from '../../assets/Images/Logos/Logo.jpg';
import { AuthStore } from '@/store/store';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logoutUser } from '@/services/AuthServices';

const Navbar: FC<{ cartCount?: number; userName?: string }> = ({ cartCount = 0, userName = 'User' }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const { user, removeUser } = AuthStore((state) => state);
  const { mutate } = useMutation({ mutationFn: logoutUser });
  const queryClient = useQueryClient();

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : 'auto';
  }, [mobileOpen]);

  const toggleMobile = () => setMobileOpen((prev) => !prev);

  const handleLogout = () => {
    mutate();
    removeUser();
    queryClient.removeQueries({ queryKey: ['userDetail'] });
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
      {/* Top Bar */}
      <div className="bg-black text-white text-center py-2.5 text-[13.5px] font-medium relative z-[101]">
        Summer Sale For All Kitchen Appliances - Up to 50% OFF!{' '}
        <a href="#" className="text-[#f4a261] underline">Shop Now</a>
      </div>

      {/* Main Navbar */}
      <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-50 font-sans">
        <div className="w-full px-4 md:px-8 lg:px-[60px] h-[68px] md:h-[78px] flex items-center justify-between">

          {/* Logo */}
          <Link to="/">
            <img src={Logo} alt="Logo" className="h-11 md:h-[52px]" />
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="mx-5 font-medium text-[#333] text-sm no-underline hover:text-[#e63939] transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Search Bar */}
          <div
            className={`hidden md:flex items-center gap-2.5 w-[280px] lg:w-[380px] h-[42px] lg:h-[46px] bg-gray-100 rounded-full px-4 transition-all duration-300 ${
              searchFocused ? 'bg-white border-2 border-[#e63939]' : ''
            }`}
          >
            <Search size={18} color="#999" />
            <input
              type="text"
              placeholder="What are you looking for?"
              className="outline-none border-none bg-transparent w-full text-sm"
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3.5 md:gap-[18px]">

            {/* Cart */}
            <Link to="/cart" className="relative">
              <ShoppingCart size={22} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#e63939] text-white text-[10px] font-bold w-[18px] h-[18px] rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Desktop Auth */}
            <div className="hidden md:flex items-center">
              {!user ? (
                <button
                  onClick={() => navigate('/login')}
                  className="flex items-center gap-2 px-5 py-2.5 bg-[#e63939] text-white rounded-full text-sm font-medium hover:bg-red-700 transition-colors"
                >
                  <User size={16} /> Login
                </button>
              ) : (
                <div className="relative">
                  <button
                    onClick={() => setProfileOpen(!profileOpen)}
                    className="flex items-center gap-2"
                  >
                    <div className="w-9 h-9 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white font-semibold">
                      {firstLetter}
                    </div>
                    <span className="font-medium text-sm">
                      {user?.role === 'admin' ? 'Admin' : userName}
                    </span>
                    <ChevronDown size={14} />
                  </button>

                  {profileOpen && (
                    <>
                      <div
                        className="fixed inset-0 z-[100]"
                        onClick={() => setProfileOpen(false)}
                      />
                      <div className="absolute right-0 mt-3 w-52 bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.12)] py-2 border border-gray-100 z-[300]">
                        <Link
                          to="/account"
                          className="flex items-center gap-3 px-5 py-3 text-sm hover:bg-gray-50 text-gray-700 no-underline"
                        >
                          <User size={15} /> Profile
                        </Link>
                        <Link
                          to="/orders"
                          className="flex items-center gap-3 px-5 py-3 text-sm hover:bg-gray-50 text-gray-700 no-underline"
                        >
                          <ClipboardList size={15} /> Orders
                        </Link>
                        {user?.role === 'admin' && (
                          <Link
                            to="/dashboard"
                            className="flex items-center gap-3 px-5 py-3 text-sm hover:bg-gray-50 text-blue-600 font-medium no-underline"
                          >
                            Admin Panel
                          </Link>
                        )}
                        <div className="h-px bg-gray-100 mx-3 my-1" />
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-5 py-3 text-sm text-red-600 hover:bg-red-50"
                        >
                          <X size={15} /> Logout
                        </button>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button onClick={toggleMobile} className="md:hidden p-1">
              {mobileOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-[200] md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 w-screen max-w-full h-full bg-white z-[201] overflow-y-auto pt-[68px] md:hidden font-sans">
          <div className="px-5 py-5 space-y-5">

            {/* Mobile Search */}
            <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3 border border-gray-200">
              <Search size={16} color="#999" />
              <input
                type="text"
                placeholder="What are you looking for?"
                className="bg-transparent text-sm outline-none w-full"
              />
            </div>

            {/* Mobile Nav Links */}
            <div className="space-y-1">
              {navLinks.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#333] font-medium text-[15px] no-underline hover:bg-red-50 hover:text-[#e63939] transition-colors w-full"
                >
                  {l.label}
                </Link>
              ))}
            </div>

            {/* Mobile Auth */}
            {!user ? (
              <button
                onClick={() => navigate('/login')}
                className="w-full bg-red-600 text-white py-3 rounded-xl"
              >
                Login
              </button>
            ) : (
              <div>
                <Link
                  to="/account"
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#333] font-medium text-[15px] no-underline hover:bg-red-50 hover:text-[#e63939] transition-colors"
                >
                  <User size={17} /> Profile
                </Link>
                <Link
                  to="/orders"
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#333] font-medium text-[15px] no-underline hover:bg-red-50 hover:text-[#e63939] transition-colors"
                >
                  <ClipboardList size={17} /> Orders
                </Link>
                {user?.role === 'admin' && (
                  <Link
                    to="/dashboard"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-blue-600 font-medium text-[15px] no-underline hover:bg-red-50 transition-colors"
                  >
                    Admin Panel
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#e63939] font-medium text-[15px] hover:bg-red-50 transition-colors w-full border-none bg-transparent cursor-pointer"
                >
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