import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";

interface TopbarProps {
  onMenuClick?: () => void;
}

const Topbar = ({ onMenuClick }: TopbarProps) => {
  const [profileOpen, setProfileOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleProfileNavigate = () => {
    setProfileOpen(false);
    navigate("/admin/profile");
  };

  const handleGoToWebsite = () => {
    window.open("/", "_blank");
  };

  return (
    <>
      <style>{`
        .topbar {
          background: #ffffff;
          border-bottom: 1px solid #eaecf3;
          padding: 0 20px;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: sticky;
          top: 0;
          z-index: 30;
        }

        /* ── Left side ── */
        .tb-left {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        /* ── Hamburger (mobile only) ── */
        .tb-hamburger {
          display: none;
          align-items: center;
          justify-content: center;
          width: 38px;
          height: 38px;
          border: 1.5px solid #eaecf3;
          border-radius: 10px;
          background: #f5f6fa;
          color: #4b5563;
          cursor: pointer;
          transition: background 0.18s, border-color 0.18s;
          flex-shrink: 0;
        }

        .tb-hamburger:hover {
          background: #eceef7;
          border-color: #d1d5e0;
        }

        @media (max-width: 767px) {
          .tb-hamburger {
            display: flex;
          }
        }

        /* ── Page title (optional, shows on mobile) ── */
        .tb-title {
          font-size: 15px;
          font-weight: 700;
          color: #1f2937;
          display: none;
        }

        @media (max-width: 767px) {
          .tb-title {
            display: block;
          }
        }

        /* ── Right side ── */
        .tb-right {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        /* ── Go to Website button ── */
        .go-website-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 7px 14px;
          background: linear-gradient(135deg, #3b5bdb, #7950f2);
          border: none;
          border-radius: 10px;
          color: #fff;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          white-space: nowrap;
          transition: opacity 0.2s ease, transform 0.15s ease, box-shadow 0.2s ease;
          box-shadow: 0 2px 8px rgba(59,91,219,0.25);
        }

        .go-website-btn:hover {
          opacity: 0.9;
          transform: translateY(-1px);
          box-shadow: 0 6px 18px rgba(59,91,219,0.35);
        }

        .go-website-btn:active {
          transform: translateY(0);
          opacity: 1;
        }

        .go-website-label {
          display: inline;
        }

        @media (max-width: 480px) {
          .go-website-label { display: none; }
          .go-website-btn { padding: 7px 10px; }
        }

        /* ── Avatar ── */
        .tb-avatar-wrap {
          display: flex;
          align-items: center;
          gap: 9px;
          padding: 6px 12px;
          background: #f5f6fa;
          border: 1.5px solid #eaecf3;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .tb-avatar-wrap:hover {
          background: #eceef7;
          border-color: #d1d5e0;
        }

        .admin-name {
          font-size: 13px;
          font-weight: 600;
          color: #4b5563;
        }

        @media (max-width: 520px) {
          .admin-name { display: none; }
        }

        /* ── Dropdown ── */
        .profile-dropdown {
          position: absolute;
          top: calc(100% + 12px);
          right: 0;
          width: 270px;
          background: white;
          border: 1.5px solid #eaecf3;
          border-radius: 18px;
          box-shadow: 0 25px 70px rgba(30,40,80,0.12), 0 5px 20px rgba(30,40,80,0.06);
          padding: 18px;
          animation: dropDown 0.18s ease;
        }

        @keyframes dropDown {
          from { opacity: 0; transform: translateY(-10px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        .profile-info {
          display: flex;
          align-items: center;
          gap: 12px;
          cursor: pointer;
          padding: 10px;
          border-radius: 12px;
          transition: background 0.2s ease;
        }

        .profile-info:hover { background: #f3f4f6; }

        .logout-btn {
          margin-top: 16px;
          width: 100%;
          padding: 9px 0;
          background: #ef4444;
          border: none;
          color: white;
          border-radius: 10px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s ease;
        }

        .logout-btn:hover { background: #dc2626; }
      `}</style>

      <header className="topbar">

        {/* ── Left: Hamburger + Title ── */}
        <div className="tb-left">
          <button
            className="tb-hamburger"
            onClick={onMenuClick}
            aria-label="Open menu"
          >
            <Menu size={18} />
          </button>
          <span className="tb-title">Dashboard</span>
        </div>

        {/* ── Right: Website btn + Profile ── */}
        <div className="tb-right">

          {/* Go to Website */}
          <button className="go-website-btn" onClick={handleGoToWebsite}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="2" y1="12" x2="22" y2="12" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
            <span className="go-website-label">Go to Website</span>
          </button>

          {/* Profile Dropdown */}
          <div style={{ position: "relative" }} ref={dropdownRef}>
            <div className="tb-avatar-wrap" onClick={() => setProfileOpen(!profileOpen)}>
              <div style={{
                width: 32, height: 32, borderRadius: 10,
                background: "linear-gradient(135deg, #3b5bdb, #7950f2)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 13, fontWeight: 800, color: "white",
              }}>
                A
              </div>
              <span className="admin-name">Admin</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                stroke="#9ca3af" strokeWidth="2.5" strokeLinecap="round"
                style={{
                  transform: profileOpen ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.2s ease",
                }}>
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>

            {profileOpen && (
              <div className="profile-dropdown">
                <div className="profile-info" onClick={handleProfileNavigate}>
                  <div style={{
                    width: 45, height: 45, borderRadius: 14,
                    background: "linear-gradient(135deg, #3b5bdb, #7950f2)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 16, fontWeight: 700, color: "white",
                  }}>
                    A
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14 }}>Admin</div>
                    <div style={{ fontSize: 12, color: "#6b7280", marginTop: 2 }}>
                      admin@email.com
                    </div>
                  </div>
                </div>
                <button className="logout-btn" onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>

        </div>
      </header>
    </>
  );
};

export default Topbar;