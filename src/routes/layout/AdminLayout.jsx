// src/layouts/admin/AdminLayout.jsx
import { useEffect, useState } from 'react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminHeader from '../../components/admin/AdminHeader';
import { useAuthStore } from '@/store/auth';
import { useNavigate } from 'react-router-dom';

export default function AdminLayout({ children }) {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }

    if (user && user?.role !== 'admin') {
      navigate('/');
    }
  }, [user]);

  return (
    <div
      className="flex h-screen overflow-hidden bg-[#fdf8f0]"
      style={{ fontFamily: "'Lora', Georgia, serif" }}
    >
      {/* ── Mobile backdrop ── */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* ── Sidebar ──
           Desktop (lg+): always in flow, collapsible
           Mobile (<lg):  fixed off-canvas, slides in on hamburger tap        */}
      <div
        className={`
          fixed lg:relative inset-y-0 left-0 z-50 lg:z-auto
          transition-transform duration-[220ms] ease-[cubic-bezier(.4,0,.2,1)]
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
        `}
      >
        <AdminSidebar
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          onNavClick={() => setMobileOpen(false)}
        />
      </div>

      {/* ── Main column ── */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <AdminHeader onMenuClick={() => setMobileOpen((v) => !v)} />
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-7">{children}</div>
      </div>
    </div>
  );
}
