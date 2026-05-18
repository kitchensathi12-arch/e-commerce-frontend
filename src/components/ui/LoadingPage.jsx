import { useState, useEffect, useRef } from "react";

const BRAND = {
  brown: "#7B3F00",
  darkBrown: "#5C2E00",
  deepBrown: "#3D1F00",
  amber: "#F59E0B",
  gold: "#D97706",
  cream: "#FEF3C7",
  white: "#FFFBF5",
};

const cookingEmojis = ["🍳", "🥘", "🫕", "🍲", "☕", "🍟", "🧇", "🫙"];

const orbItems = [
  { emoji: "🔥", angle: 150, delay: 0 },
  { emoji: "🍪", angle: 60, delay: 0.3 },
  { emoji: "🧊", angle: 0, delay: 0.6 },
  { emoji: "🍟", angle: 300, delay: 0.9 },
  { emoji: "☕", angle: 240, delay: 1.2 },
];

export default function KitchenSaathiLoader() {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState(0);
  const [activeEmoji, setActiveEmoji] = useState(0);
  const [sparks, setSparks] = useState([]);
  const [vw, setVw] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);
  const intervalRef = useRef(null);
  const sparkId = useRef(0);

  // Responsive breakpoints
  const isMobile = vw < 480;
  const isTablet = vw >= 480 && vw < 768;
  const isDesktop = vw >= 768;

  useEffect(() => {
    const handleResize = () => setVw(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(intervalRef.current);
          setTimeout(() => setPhase(1), 300);
          return 100;
        }
        return p + Math.random() * 2.5 + 0.5;
      });
    }, 60);
    return () => clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    const t = setInterval(() => {
      setActiveEmoji((e) => (e + 1) % cookingEmojis.length);
    }, 800);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => {
      const id = sparkId.current++;
      const angle = Math.random() * 360;
      const dist = 28 + Math.random() * 18;
      setSparks((s) => [
        ...s.filter((sp) => Date.now() - sp.ts < 900),
        { id, angle, dist, ts: Date.now() },
      ]);
    }, 320);
    return () => clearInterval(t);
  }, []);

  const msg =
    progress < 30
      ? "Heating up the kitchen..."
      : progress < 60
      ? "Gathering fresh ingredients..."
      : progress < 85
      ? "Almost ready to serve..."
      : progress < 100
      ? "Plating your experience..."
      : "Your kitchen awaits! 🍽️";

  // Responsive sizes
  const orbSize = isMobile ? 220 : isTablet ? 260 : 290;
  const orbRadius = isMobile ? 85 : isTablet ? 100 : 115;
  const potFontSize = isMobile ? 44 : isTablet ? 52 : 58;
  const logoIconSize = isMobile ? 46 : isTablet ? 52 : 58;
  const logoTextSize = isMobile ? 22 : isTablet ? 25 : 28;
  const orbItemSize = isMobile ? 36 : isTablet ? 40 : 44;
  const orbItemFont = isMobile ? 17 : isTablet ? 20 : 22;
  const pctFontSize = isMobile ? 28 : isTablet ? 32 : 36;
  const doneEmojiSize = isMobile ? 40 : isTablet ? 46 : 52;
  const doneTextSize = isMobile ? 20 : isTablet ? 24 : 28;

  return (
    <div style={{
      minHeight: "100vh",
      width: "100%",
      background: `radial-gradient(ellipse at 60% 40%, #8B4500 0%, #5C2E00 40%, #2E1500 100%)`,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'DM Sans', sans-serif",
      position: "relative",
      overflow: "hidden",
      color: BRAND.cream,
      boxSizing: "border-box",
    }}>
      {/* Grain texture overlay */}
      <div style={{
        position: "absolute",
        inset: 0,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E")`,
        opacity: 0.18,
        pointerEvents: "none",
        animation: "grainAnim 0.5s steps(1) infinite",
        zIndex: 1,
      }} />

      {/* Radial glow */}
      <div style={{
        position: "absolute",
        top: "30%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: isMobile ? 320 : isTablet ? 420 : 520,
        height: isMobile ? 320 : isTablet ? 420 : 520,
        borderRadius: "50%",
        background: `radial-gradient(circle, rgba(245,158,11,0.12) 0%, transparent 70%)`,
        pointerEvents: "none",
        zIndex: 1,
      }} />

      {/* Top ticker */}
      <div style={{
        position: "absolute",
        top: 0,
        width: "100%",
        background: "rgba(0,0,0,0.35)",
        borderBottom: `1px solid rgba(245,158,11,0.2)`,
        padding: isMobile ? "7px 12px" : "8px 24px",
        fontSize: isMobile ? 10 : 12,
        color: BRAND.cream,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        letterSpacing: "0.04em",
        zIndex: 10,
        gap: 0,
        flexWrap: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        boxSizing: "border-box",
      }}>
        {isMobile ? (
          <span>🚚 Free delivery above ₹999 &nbsp;|&nbsp; ⭐ 4.7★ Google</span>
        ) : (
          <>
            <span>🚚 Free delivery on orders above ₹999</span>
            <span style={{ margin: "0 18px", opacity: 0.4 }}>|</span>
            <span>📞 Customer care: 1800-XXX-XXXX</span>
            <span style={{ margin: "0 18px", opacity: 0.4 }}>|</span>
            <span>⭐ 4.7★ Rated on Google</span>
          </>
        )}
      </div>

      {/* Main content */}
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: isMobile ? 18 : isTablet ? 22 : 28,
        zIndex: 5,
        padding: isMobile ? "60px 16px 24px" : isTablet ? "64px 24px 28px" : "0 24px",
        width: "100%",
        maxWidth: isMobile ? "100%" : isTablet ? 420 : 480,
        boxSizing: "border-box",
      }}>
        {/* Logo */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: isMobile ? 10 : 14,
          marginBottom: isMobile ? 0 : 4,
        }}>
          <div style={{
            fontSize: isMobile ? 30 : 40,
            background: "rgba(255,255,255,0.08)",
            borderRadius: isMobile ? 12 : 14,
            width: logoIconSize,
            height: logoIconSize,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: `1px solid rgba(245,158,11,0.3)`,
            boxShadow: `0 0 24px rgba(245,158,11,0.2)`,
            flexShrink: 0,
          }}>🍳</div>
          <div>
            <div style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: logoTextSize,
              fontWeight: 900,
              color: BRAND.white,
              lineHeight: 1.1,
              letterSpacing: "-0.01em",
            }}>
              Kitchen<span style={{ color: BRAND.amber }}>Saathi</span>
            </div>
            <div style={{
              fontSize: isMobile ? 7.5 : 9,
              letterSpacing: "0.18em",
              color: BRAND.amber,
              fontWeight: 500,
              marginTop: 2,
            }}>YOUR TRUSTED KITCHEN COMPANION</div>
          </div>
        </div>

        {/* Orbital animation */}
        <div style={{
          position: "relative",
          width: orbSize,
          height: orbSize,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}>
          {/* Outer ring */}
          <div style={{
            position: "absolute",
            width: orbSize * 0.827,
            height: orbSize * 0.827,
            borderRadius: "50%",
            border: `1.5px dashed rgba(245,158,11,0.2)`,
            animation: "spin1 18s linear infinite",
          }} />
          <div style={{
            position: "absolute",
            width: orbSize * 0.655,
            height: orbSize * 0.655,
            borderRadius: "50%",
            border: `1px solid rgba(245,158,11,0.1)`,
            animation: "spin2 12s linear infinite",
          }} />

          {/* Central pot */}
          <div style={{
            position: "relative",
            width: isMobile ? 70 : 90,
            height: isMobile ? 70 : 90,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 4,
            animation: "potBob 1.8s ease-in-out infinite",
          }}>
            <div style={{
              fontSize: potFontSize,
              filter: "drop-shadow(0 0 18px rgba(245,158,11,0.6))",
              userSelect: "none",
            }}>🍲</div>
            {/* Steam */}
            {[0, 1, 2].map((i) => (
              <div key={i} style={{
                position: "absolute",
                top: -10,
                left: `${28 + i * 18}%`,
                width: 6,
                height: 18,
                background: "rgba(255,255,255,0.18)",
                borderRadius: 99,
                animation: "steamRise 1.4s ease-out infinite",
                animationDelay: `${i * 0.35}s`,
              }} />
            ))}
            {/* Sparks */}
            {sparks.map((sp) => {
              const rad = (sp.angle * Math.PI) / 180;
              return (
                <div key={sp.id} style={{
                  position: "absolute",
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: BRAND.amber,
                  top: `calc(50% + ${Math.sin(rad) * sp.dist}px)`,
                  left: `calc(50% + ${Math.cos(rad) * sp.dist}px)`,
                  opacity: 0,
                  animation: "sparkFly 0.9s ease-out forwards",
                  boxShadow: `0 0 6px ${BRAND.amber}`,
                }} />
              );
            })}
          </div>

          {/* Orbiting items */}
          {orbItems.map((item, i) => {
            const rad = (item.angle * Math.PI) / 180;
            const half = orbItemSize / 2;
            return (
              <div key={i} style={{
                position: "absolute",
                top: `calc(50% + ${Math.sin(rad) * orbRadius}px - ${half}px)`,
                left: `calc(50% + ${Math.cos(rad) * orbRadius}px - ${half}px)`,
                width: orbItemSize,
                height: orbItemSize,
                borderRadius: isMobile ? 9 : 12,
                background: "rgba(255,255,255,0.07)",
                backdropFilter: "blur(6px)",
                border: `1px solid rgba(245,158,11,0.25)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: orbItemFont,
                animation: `floatOrb 3s ease-in-out infinite`,
                animationDelay: `${item.delay}s`,
                boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
              }}>
                {item.emoji}
              </div>
            );
          })}
        </div>

        {/* Message */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: isMobile ? 7 : 10,
          background: "rgba(255,255,255,0.06)",
          border: `1px solid rgba(245,158,11,0.2)`,
          borderRadius: 99,
          padding: isMobile ? "8px 16px" : "10px 22px",
          animation: "msgFade 2s ease-in-out infinite",
          maxWidth: "100%",
        }}>
          <span style={{ fontSize: isMobile ? 16 : 20, transition: "all 0.4s ease" }}>
            {cookingEmojis[activeEmoji]}
          </span>
          <span style={{
            fontSize: isMobile ? 12 : 14,
            fontWeight: 400,
            color: BRAND.cream,
            letterSpacing: "0.02em",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}>{msg}</span>
        </div>

        {/* Progress bar */}
        <div style={{
          width: "100%",
          height: isMobile ? 7 : 8,
          background: "rgba(255,255,255,0.08)",
          borderRadius: 99,
          position: "relative",
          overflow: "visible",
          border: `1px solid rgba(245,158,11,0.12)`,
        }}>
          <div style={{
            height: "100%",
            borderRadius: 99,
            background: `linear-gradient(90deg, ${BRAND.darkBrown}, ${BRAND.gold}, ${BRAND.amber})`,
            transition: "width 0.12s ease",
            position: "relative",
            overflow: "hidden",
            boxShadow: `0 0 12px rgba(245,158,11,0.5)`,
            width: `${Math.min(progress, 100)}%`,
          }}>
            <div style={{
              position: "absolute",
              top: 0,
              width: "60%",
              height: "100%",
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)",
              animation: "barShimmer 1.6s ease-in-out infinite",
            }} />
          </div>
          <div style={{
            position: "absolute",
            top: isMobile ? -3.5 : -4,
            width: isMobile ? 12 : 14,
            height: isMobile ? 12 : 14,
            borderRadius: "50%",
            background: BRAND.amber,
            boxShadow: `0 0 10px ${BRAND.amber}, 0 0 24px rgba(245,158,11,0.4)`,
            transition: "left 0.12s ease",
            border: `2px solid white`,
            left: `calc(${Math.min(progress, 100)}% - ${isMobile ? 6 : 7}px)`,
          }} />
        </div>

        <div style={{
          display: "flex",
          alignItems: "baseline",
          gap: isMobile ? 7 : 10,
          marginTop: isMobile ? -6 : -10,
        }}>
          <span style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: pctFontSize,
            fontWeight: 900,
            color: BRAND.amber,
            lineHeight: 1,
            textShadow: `0 0 20px rgba(245,158,11,0.4)`,
          }}>{Math.floor(Math.min(progress, 100))}%</span>
          <span style={{
            fontSize: isMobile ? 10 : 12,
            color: "rgba(254,243,199,0.5)",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}>Loading your kitchen</span>
        </div>

        {/* Trust badges */}
        <div style={{
          display: "flex",
          gap: isMobile ? 7 : 12,
          flexWrap: "wrap",
          justifyContent: "center",
          marginTop: isMobile ? 0 : 4,
          width: "100%",
        }}>
          {["🚚 Free Delivery", "🔒 Secure Payment", "↩️ Easy Returns"].map((b) => (
            <div key={b} style={{
              fontSize: isMobile ? 9.5 : 11,
              color: "rgba(254,243,199,0.6)",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(245,158,11,0.15)",
              borderRadius: 99,
              padding: isMobile ? "4px 10px" : "5px 14px",
              letterSpacing: "0.04em",
              whiteSpace: "nowrap",
            }}>{b}</div>
          ))}
        </div>
      </div>

      {/* Done overlay */}
      {phase === 1 && (
        <div style={{
          position: "fixed",
          inset: 0,
          background: "rgba(61,31,0,0.7)",
          backdropFilter: "blur(8px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 100,
          animation: "doneReveal 0.5s ease forwards",
          padding: "16px",
          boxSizing: "border-box",
        }}>
          <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: isMobile ? 8 : 12,
            background: "rgba(255,255,255,0.07)",
            border: `1.5px solid rgba(245,158,11,0.4)`,
            borderRadius: isMobile ? 18 : 24,
            padding: isMobile ? "28px 32px" : isTablet ? "34px 48px" : "40px 60px",
            boxShadow: `0 0 60px rgba(245,158,11,0.2)`,
            width: "100%",
            maxWidth: isMobile ? 300 : 380,
            boxSizing: "border-box",
          }}>
            <div style={{ fontSize: doneEmojiSize }}>🍽️</div>
            <div style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: doneTextSize,
              fontWeight: 900,
              color: BRAND.white,
              textAlign: "center",
            }}>Your Kitchen is Ready!</div>
            <div style={{
              fontSize: isMobile ? 11 : 14,
              color: BRAND.amber,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              textAlign: "center",
            }}>Welcome to KitchenSaathi</div>
          </div>
        </div>
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; }

        @keyframes spin1 {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin2 {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        @keyframes floatOrb {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-8px) scale(1.08); }
        }
        @keyframes steamRise {
          0% { opacity: 0; transform: translateY(0) scaleX(1); }
          40% { opacity: 0.6; }
          100% { opacity: 0; transform: translateY(-36px) scaleX(1.6); }
        }
        @keyframes potBob {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-5px) scale(1.04); }
        }
        @keyframes sparkFly {
          0% { opacity: 1; transform: scale(1); }
          100% { opacity: 0; transform: scale(0.2) translateY(-8px); }
        }
        @keyframes barShimmer {
          0% { left: -60%; }
          100% { left: 120%; }
        }
        @keyframes msgFade {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 1; }
        }
        @keyframes doneReveal {
          0% { opacity: 0; transform: scale(0.85); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes grainAnim {
          0%, 100% { transform: translate(0,0); }
          10% { transform: translate(-1%,-2%); }
          30% { transform: translate(2%,1%); }
          50% { transform: translate(-2%,2%); }
          70% { transform: translate(1%,-1%); }
          90% { transform: translate(-1%,2%); }
        }

        @media (max-width: 360px) {
          /* Extra small devices */
        }
        @media (min-width: 1024px) {
          /* Large desktops get extra breathing room */
        }
      `}</style>
    </div>
  );
}