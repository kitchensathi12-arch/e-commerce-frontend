import { Link, NavLink } from "react-router-dom";
import type { JSX } from "react/jsx-runtime";
import {
  LayoutDashboard,
  Package,
  FolderTree,
  Tags,
  ShoppingCart,
  Image as ImageIcon,
  LogOut,
  X,
  ChevronRight,
  Trash2,
} from "lucide-react";

import Logo from "../assets/Images/Logos/Logo.jpg";

interface NavItem {
  label: string;
  to: string;
  end?: boolean;
  icon: JSX.Element;
  badge?: number;
}

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  onLogout: () => void;
}

const navItems: NavItem[] = [
  { label: "Dashboard", to: "/dashboard", end: true, icon: <LayoutDashboard size={18} /> },
  { label: "Products", to: "/products", icon: <Package size={18} /> },
  { label: "Categories", to: "/categories", icon: <FolderTree size={18} /> },
  { label: "Brands", to: "/brands", icon: <Tags size={18} /> },
  { label: "Orders", to: "/orders", badge: 12, icon: <ShoppingCart size={18} /> },
  { label: "Banners", to: "/banners", icon: <ImageIcon size={18} /> },
  { label: "Bin", to: "/bin", icon: <Trash2 size={18} /> },
];

const Sidebar = ({ open, onClose, onLogout }: SidebarProps): JSX.Element => {
  return (
    <>
      <style>{`
        /* ── Overlay ── */
        .sb-overlay {
          position: fixed;
          inset: 0;
          background: rgba(15, 23, 42, 0.45);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          z-index: 40;
          animation: sbFadeIn 0.22s ease;
        }

        @keyframes sbFadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        /* ── Sidebar shell ── */
        .sb-aside {
          position: fixed;
          top: 0;
          left: 0;
          height: 100dvh;
          width: 260px;
          background: #ffffff;
          border-right: 1px solid #eaecf3;
          box-shadow: 4px 0 24px rgba(30, 40, 80, 0.07);
          z-index: 50;
          display: flex;
          flex-direction: column;
          transform: translateX(-100%);
          transition: transform 0.28s cubic-bezier(0.4, 0, 0.2, 1);
          will-change: transform;
        }

        /* Desktop: always visible, no shadow */
        @media (min-width: 768px) {
          .sb-aside {
            position: sticky;
            transform: translateX(0) !important;
            box-shadow: none;
            flex-shrink: 0;
          }
          .sb-overlay { display: none !important; }
          .sb-close-btn { display: none !important; }
        }

        .sb-aside.sb-open {
          transform: translateX(0);
        }

        /* ── Header ── */
        .sb-header {
          height: 68px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 20px;
          border-bottom: 1px solid #f0f1f6;
          flex-shrink: 0;
        }

        .sb-logo-wrap {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
        }

        .sb-logo-img {
          height: 40px;
          width: auto;
          object-fit: contain;
          border-radius: 8px;
        }

        /* ── Close button (mobile only) ── */
        .sb-close-btn {
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: none;
          background: #f3f4f8;
          border-radius: 8px;
          cursor: pointer;
          color: #6b7280;
          transition: background 0.18s, color 0.18s;
          flex-shrink: 0;
        }

        .sb-close-btn:hover {
          background: #e5e7ef;
          color: #1f2937;
        }

        /* ── Nav section label ── */
        .sb-section-label {
          padding: 18px 20px 6px;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #b0b7c3;
          flex-shrink: 0;
        }

        /* ── Nav ── */
        .sb-nav {
          flex: 1;
          padding: 4px 12px 12px;
          overflow-y: auto;
          overflow-x: hidden;
          scrollbar-width: thin;
          scrollbar-color: #e5e7eb transparent;
        }

        .sb-nav::-webkit-scrollbar { width: 4px; }
        .sb-nav::-webkit-scrollbar-track { background: transparent; }
        .sb-nav::-webkit-scrollbar-thumb { background: #e5e7eb; border-radius: 4px; }

        /* ── Nav link ── */
        .sb-link {
          display: flex;
          align-items: center;
          gap: 11px;
          padding: 10px 14px;
          border-radius: 10px;
          font-size: 13.5px;
          font-weight: 500;
          color: #4b5563;
          text-decoration: none;
          transition: background 0.18s, color 0.18s, box-shadow 0.18s;
          margin-bottom: 2px;
          position: relative;
          cursor: pointer;
        }

        .sb-link:hover {
          background: #f3f4f8;
          color: #1f2937;
        }

        .sb-link.active {
          background: linear-gradient(135deg, #eef2ff, #ede9fe);
          color: #4f46e5;
          font-weight: 600;
          box-shadow: 0 1px 6px rgba(79,70,229,0.10);
        }

        .sb-link.active .sb-link-icon {
          color: #4f46e5;
        }

        .sb-link-icon {
          color: #9ca3af;
          transition: color 0.18s;
          flex-shrink: 0;
          display: flex;
          align-items: center;
        }

        .sb-link:hover .sb-link-icon {
          color: #4b5563;
        }

        .sb-link-label {
          flex: 1;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        /* Active left accent bar */
        .sb-link.active::before {
          content: "";
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 3px;
          height: 60%;
          background: linear-gradient(180deg, #4f46e5, #7c3aed);
          border-radius: 0 3px 3px 0;
        }

        /* Badge */
        .sb-badge {
          font-size: 11px;
          font-weight: 700;
          background: #fef2f2;
          color: #ef4444;
          border: 1px solid #fecaca;
          padding: 1px 7px;
          border-radius: 20px;
          flex-shrink: 0;
        }

        .sb-link.active .sb-badge {
          background: #fee2e2;
        }

        /* Chevron (active state hint) */
        .sb-chevron {
          color: #c7d2fe;
          flex-shrink: 0;
          opacity: 0;
          transition: opacity 0.18s;
        }

        .sb-link.active .sb-chevron {
          opacity: 1;
        }

        /* ── Footer / Logout ── */
        .sb-footer {
          padding: 12px;
          border-top: 1px solid #f0f1f6;
          flex-shrink: 0;
        }

        .sb-user-card {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 12px;
          border-radius: 10px;
          background: #f8f9fb;
          margin-bottom: 8px;
        }

        .sb-avatar {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background: linear-gradient(135deg, #3b5bdb, #7950f2);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          font-weight: 800;
          color: white;
          flex-shrink: 0;
        }

        .sb-user-info { flex: 1; min-width: 0; }
        .sb-user-name {
          font-size: 13px;
          font-weight: 700;
          color: #1f2937;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .sb-user-role {
          font-size: 11px;
          color: #9ca3af;
          margin-top: 1px;
        }

        .sb-logout-btn {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 14px;
          border: none;
          border-radius: 10px;
          background: transparent;
          font-size: 13.5px;
          font-weight: 600;
          color: #ef4444;
          cursor: pointer;
          transition: background 0.18s, color 0.18s;
        }

        .sb-logout-btn:hover {
          background: #fef2f2;
          color: #dc2626;
        }
      `}</style>

      {/* Mobile overlay */}
      {open && (
        <div className="sb-overlay" onClick={onClose} />
      )}

      <aside className={`sb-aside ${open ? "sb-open" : ""}`}>

        {/* ── Header ── */}
        <div className="sb-header">
          <Link to="/admin" className="sb-logo-wrap" onClick={onClose}>
            <img src={Logo} alt="Logo" className="sb-logo-img" />
          </Link>
          <button className="sb-close-btn" onClick={onClose} aria-label="Close sidebar">
            <X size={16} />
          </button>
        </div>

        {/* ── Section Label ── */}
        <p className="sb-section-label">Main Menu</p>

        {/* ── Navigation ── */}
        <nav className="sb-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={onClose}
              className={({ isActive }) => `sb-link${isActive ? " active" : ""}`}
            >
              <span className="sb-link-icon">{item.icon}</span>
              <span className="sb-link-label">{item.label}</span>
              {item.badge !== undefined && (
                <span className="sb-badge">{item.badge}</span>
              )}
              <ChevronRight size={14} className="sb-chevron" />
            </NavLink>
          ))}
        </nav>

        {/* ── Footer ── */}
        <div className="sb-footer">
          {/* User card */}
          <div className="sb-user-card">
            <div className="sb-avatar">A</div>
            <div className="sb-user-info">
              <p className="sb-user-name">Admin</p>
              <p className="sb-user-role">Administrator</p>
            </div>
          </div>

          {/* Logout */}
          <button
            className="sb-logout-btn"
            onClick={() => { onLogout(); onClose(); }}
          >
            <LogOut size={17} />
            <span>Logout</span>
          </button>
        </div>

      </aside>
    </>
  );
};

export default Sidebar;