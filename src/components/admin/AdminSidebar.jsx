// src/components/admin/AdminSidebar.jsx
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard, Package, LayoutGrid, Tag,
  ShoppingCart, Image, Trash2, Users, Settings, ChevronLeft,
} from "lucide-react";

const nav = [
  {
    section: "Main",
    items: [
      { to: "/admin",            end: true,  label: "Dashboard",  icon: LayoutDashboard },
      { to: "/admin/products",   end: false, label: "Products",   icon: Package },
      { to: "/admin/categories", end: false, label: "Categories", icon: LayoutGrid },
      { to: "/admin/brands",     end: false, label: "Brands",     icon: Tag },
      { to: "/admin/orders",     end: false, label: "Orders",     icon: ShoppingCart },
      { to: "/admin/banners",    end: false, label: "Banners",    icon: Image },
      { to: "/admin/bin",        end: false, label: "Bin",        icon: Trash2 },
    ],
  },
];

export default function AdminSidebar({ collapsed, setCollapsed, onNavClick }) {
  const navigate = useNavigate();

  return (
    <aside
      className={`
        flex flex-col h-full bg-[#2c1810]
        transition-all duration-[220ms] ease-[cubic-bezier(.4,0,.2,1)]
        ${collapsed ? "w-16" : "w-[230px]"}
      `}
    >
      {/* Logo */}
      <div className="flex items-center justify-between px-3.5 pt-[18px] pb-3.5 border-b border-white/[0.08] min-h-[62px]">
        {!collapsed && (
          <div
            className="cursor-pointer flex items-baseline gap-px whitespace-nowrap"
            onClick={() => { navigate("/admin"); onNavClick?.(); }}
          >
            <span className="text-[17px] font-bold text-white" style={{ fontFamily: "'Lora', Georgia, serif" }}>
              Kitchen
            </span>
            <span className="text-[17px] font-bold text-[#c8860a]" style={{ fontFamily: "'Lora', Georgia, serif" }}>
              Saathi
            </span>
          </div>
        )}
        <button
          onClick={() => setCollapsed((c) => !c)}
          title={collapsed ? "Expand" : "Collapse"}
          className="ml-auto bg-white/[0.07] border-none rounded-md text-[#c8a96e] flex items-center justify-center w-7 h-7 flex-shrink-0 transition-colors hover:bg-white/[0.12] cursor-pointer"
        >
          <ChevronLeft
            size={16}
            style={{ transform: collapsed ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}
          />
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-2 py-2.5">
        {nav.map((group) => (
          <div key={group.section} className="mb-2">
            {!collapsed && (
              <span className="block text-[10px] font-bold tracking-[1px] uppercase text-white/30 px-1.5 pt-2 pb-1">
                {group.section}
              </span>
            )}
            {group.items.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  title={collapsed ? item.label : ""}
                  onClick={() => onNavClick?.()}
                  className={({ isActive }) =>
                    [
                      "flex items-center gap-2.5 rounded-lg text-[13.5px] font-medium mb-0.5 no-underline transition-all duration-150",
                      collapsed ? "justify-center py-2.5 px-0" : "justify-start py-2.5 px-3.5",
                      isActive
                        ? "bg-[#c8860a]/[0.18] text-[#f0b84a]"
                        : "text-white/60 hover:bg-white/[0.07] hover:text-white/90",
                    ].join(" ")
                  }
                >
                  <Icon size={18} className="flex-shrink-0" />
                  {!collapsed && (
                    <span className="whitespace-nowrap overflow-hidden" style={{ fontFamily: "'Lora', Georgia, serif" }}>
                      {item.label}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </div>
        ))}
      </nav>
    </aside>
  );
}