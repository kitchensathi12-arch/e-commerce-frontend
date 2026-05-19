// src/components/admin/AdminHeader.jsx
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Search, Bell, Eye, X, Menu } from 'lucide-react';

const PAGE_TITLES = {
  '/admin': 'Dashboard',
  '/admin/products': 'Products',
  '/admin/categories': 'Categories',
  '/admin/brands': 'Brands',
  '/admin/orders': 'Orders',
  '/admin/banners': 'Banners',
  '/admin/bin': 'Bin',
  '/admin/users': 'Users',
  '/admin/settings': 'Settings',
};

export default function AdminHeader({ onMenuClick }) {
  const location = useLocation();
  const navigate = useNavigate();
  const title = PAGE_TITLES[location.pathname] || 'Admin';
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header
      className="h-14 bg-white border-b border-[#f0e6d0] flex items-center px-3 sm:px-6 flex-shrink-0 sticky top-0 z-30"
      style={{ fontFamily: "'Lora', Georgia, serif" }}
    >
      {/* Hamburger — hidden on lg+ */}
      {!searchOpen && (
        <button
          onClick={onMenuClick}
          className="lg:hidden flex items-center justify-center w-7 h-7 mr-2 rounded-lg text-[#8a7050] hover:bg-[#f7f0e6] transition-colors flex-shrink-0"
          aria-label="Open menu"
        >
          <Menu size={17} />
        </button>
      )}

      {/* Title — hidden when search is open on mobile */}
      {!searchOpen && (
        <div className="flex-1 min-w-0 mr-2">
          <h1 className="text-[14px] sm:text-[17px] font-bold text-[#2c1810] m-0 tracking-[-0.3px] leading-none truncate">
            {title}
          </h1>
          <p className="text-[10px] sm:text-[11.5px] text-[#999] mt-0.5 m-0 leading-none">
            <span
              className="text-[#c8860a] cursor-pointer hover:underline"
              onClick={() => navigate('/admin')}
            >
              Dashboard
            </span>
            {title !== 'Dashboard' && (
              <>
                <span className="mx-1 text-[#ccc]">›</span>
                <span>{title}</span>
              </>
            )}
          </p>
        </div>
      )}

      {/* Right actions */}
      <div className={`flex items-center gap-1.5 flex-shrink-0 ${searchOpen ? 'flex-1' : ''}`}>
        {/* Search expanded — takes full width on mobile */}
        {searchOpen ? (
          <div className="flex items-center gap-2 bg-[#f7f0e6] border border-[#e0cfa8] rounded-lg px-3 py-1.5 flex-1">
            <Search size={13} className="text-[#8a7050] flex-shrink-0" />
            <input
              autoFocus
              placeholder="Quick search..."
              className="border-none outline-none bg-transparent text-[12.5px] text-[#2c1810] placeholder:text-[#b09870] flex-1 min-w-0 font-[inherit]"
            />
            <button
              onClick={() => setSearchOpen(false)}
              className="text-[#8a7050] hover:text-[#2c1810] flex-shrink-0"
            >
              <X size={14} />
            </button>
          </div>
        ) : (
          /* Search icon button */
          <button
            onClick={() => setSearchOpen(true)}
            className="hidden sm:flex w-8 h-8 items-center justify-center bg-[#f7f0e6] border border-[#e0cfa8] rounded-lg text-[#8a7050] hover:bg-[#f0e6d0] transition-colors flex-shrink-0"
            title="Search"
          >
            <Search size={14} />
          </button>
        )}

        {/* Bell — always visible */}
        {!searchOpen && (
          <button
            className="relative w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center bg-[#f7f0e6] border border-[#e0cfa8] rounded-lg text-[#8a7050] hover:bg-[#f0e6d0] transition-colors cursor-pointer flex-shrink-0"
            title="Notifications"
          >
            <Bell size={14} />
            <span className="absolute -top-1 -right-1 bg-[#c8860a] text-white text-[8px] font-bold rounded-full w-[14px] h-[14px] flex items-center justify-center leading-none">
              3
            </span>
          </button>
        )}

        {/* View Site — icon only on mobile (<480px), text on sm+ */}
        {!searchOpen && (
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-1 sm:gap-1.5 bg-transparent border border-[#e0cfa8] rounded-lg text-[#8a7050] text-[11px] sm:text-[12px] font-semibold px-1.5 sm:px-3 py-[5px] sm:py-[7px] hover:bg-[#f7f0e6] transition-colors cursor-pointer font-[inherit] whitespace-nowrap flex-shrink-0"
            title="View Site"
          >
            <Eye size={13} />
            <span className="hidden min-[480px]:inline">View Site</span>
          </button>
        )}

        {/* Avatar */}
        {!searchOpen && (
          <div
            className="w-7 h-7 sm:w-[34px] sm:h-[34px] rounded-full bg-[#c8860a] text-white flex items-center justify-center text-[11px] sm:text-[13px] font-bold cursor-pointer flex-shrink-0 hover:bg-[#b8760a] transition-colors select-none"
            title="Admin"
          >
            A
          </div>
        )}
      </div>
    </header>
  );
}
