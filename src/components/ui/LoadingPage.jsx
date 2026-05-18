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
  const [phase, setPhase] = useState(0); // 0=loading, 1=done
  const [activeEmoji, setActiveEmoji] = useState(0);
  const [sparks, setSparks] = useState([]);
  const intervalRef = useRef(null);
  const sparkId = useRef(0);

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

  // Spark burst on pot
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

  return (
    <div style={styles.root}>
      {/* Grain texture overlay */}
      <div style={styles.grain} />

      {/* Radial glow */}
      <div style={styles.glow} />

      {/* Top ticker */}
      <div style={styles.ticker}>
        <span>🚚 Free delivery on orders above ₹999</span>
        <span style={{ margin: "0 18px", opacity: 0.4 }}>|</span>
        <span>📞 Customer care: 1800-XXX-XXXX</span>
        <span style={{ margin: "0 18px", opacity: 0.4 }}>|</span>
        <span>⭐ 4.7★ Rated on Google</span>
      </div>

      {/* Main content */}
      <div style={styles.center}>
        {/* Logo */}
        <div style={styles.logoRow}>
          <div style={styles.logoIcon}>🍳</div>
          <div>
            <div style={styles.logoText}>
              Kitchen<span style={{ color: BRAND.amber }}>Saathi</span>
            </div>
            <div style={styles.logoSub}>YOUR TRUSTED KITCHEN COMPANION</div>
          </div>
        </div>

        {/* Orbital animation */}
        <div style={styles.orbScene}>
          {/* Outer ring */}
          <div style={styles.ring1} />
          <div style={styles.ring2} />

          {/* Central pot */}
          <div style={styles.potWrap}>
            <div style={styles.potEmoji}>🍲</div>
            {/* Steam */}
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                style={{
                  ...styles.steam,
                  left: `${28 + i * 18}%`,
                  animationDelay: `${i * 0.35}s`,
                }}
              />
            ))}
            {/* Sparks */}
            {sparks.map((sp) => {
              const rad = (sp.angle * Math.PI) / 180;
              return (
                <div
                  key={sp.id}
                  style={{
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
                  }}
                />
              );
            })}
          </div>

          {/* Orbiting items */}
          {orbItems.map((item, i) => {
            const rad = (item.angle * Math.PI) / 180;
            const r = 115;
            return (
              <div
                key={i}
                style={{
                  position: "absolute",
                  top: `calc(50% + ${Math.sin(rad) * r}px - 22px)`,
                  left: `calc(50% + ${Math.cos(rad) * r}px - 22px)`,
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  background: "rgba(255,255,255,0.07)",
                  backdropFilter: "blur(6px)",
                  border: `1px solid rgba(245,158,11,0.25)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 22,
                  animation: `floatOrb 3s ease-in-out infinite`,
                  animationDelay: `${item.delay}s`,
                  boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
                }}
              >
                {item.emoji}
              </div>
            );
          })}
        </div>

        {/* Message */}
        <div style={styles.msgWrap}>
          <span style={styles.msgEmoji}>{cookingEmojis[activeEmoji]}</span>
          <span style={styles.msgText}>{msg}</span>
        </div>

        {/* Progress bar */}
        <div style={styles.barTrack}>
          <div
            style={{
              ...styles.barFill,
              width: `${Math.min(progress, 100)}%`,
            }}
          >
            <div style={styles.barShine} />
          </div>
          <div
            style={{
              ...styles.barDot,
              left: `calc(${Math.min(progress, 100)}% - 7px)`,
            }}
          />
        </div>

        <div style={styles.pctRow}>
          <span style={styles.pctText}>{Math.floor(Math.min(progress, 100))}%</span>
          <span style={styles.pctLabel}>Loading your kitchen</span>
        </div>

        {/* Trust badges */}
        <div style={styles.badges}>
          {["🚚 Free Delivery", "🔒 Secure Payment", "↩️ Easy Returns"].map((b) => (
            <div key={b} style={styles.badge}>
              {b}
            </div>
          ))}
        </div>
      </div>

      {/* Done overlay */}
      {phase === 1 && (
        <div style={styles.doneOverlay}>
          <div style={styles.doneBox}>
            <div style={{ fontSize: 52 }}>🍽️</div>
            <div style={styles.doneText}>Your Kitchen is Ready!</div>
            <div style={styles.doneSubText}>Welcome to KitchenSaathi</div>
          </div>
        </div>
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500&display=swap');

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
      `}</style>
    </div>
  );
}

const styles = {
  root: {
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
  },
  grain: {
    position: "absolute",
    inset: 0,
    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E")`,
    opacity: 0.18,
    pointerEvents: "none",
    animation: "grainAnim 0.5s steps(1) infinite",
    zIndex: 1,
  },
  glow: {
    position: "absolute",
    top: "30%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 520,
    height: 520,
    borderRadius: "50%",
    background: `radial-gradient(circle, rgba(245,158,11,0.12) 0%, transparent 70%)`,
    pointerEvents: "none",
    zIndex: 1,
  },
  ticker: {
    position: "absolute",
    top: 0,
    width: "100%",
    background: "rgba(0,0,0,0.35)",
    borderBottom: `1px solid rgba(245,158,11,0.2)`,
    padding: "8px 24px",
    fontSize: 12,
    color: BRAND.cream,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    letterSpacing: "0.04em",
    zIndex: 10,
    gap: 0,
  },
  center: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 28,
    zIndex: 5,
    padding: "0 24px",
    width: "100%",
    maxWidth: 480,
  },
  logoRow: {
    display: "flex",
    alignItems: "center",
    gap: 14,
    marginBottom: 4,
  },
  logoIcon: {
    fontSize: 40,
    background: "rgba(255,255,255,0.08)",
    borderRadius: 14,
    width: 58,
    height: 58,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: `1px solid rgba(245,158,11,0.3)`,
    boxShadow: `0 0 24px rgba(245,158,11,0.2)`,
  },
  logoText: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 28,
    fontWeight: 900,
    color: BRAND.white,
    lineHeight: 1.1,
    letterSpacing: "-0.01em",
  },
  logoSub: {
    fontSize: 9,
    letterSpacing: "0.18em",
    color: BRAND.amber,
    fontWeight: 500,
    marginTop: 2,
  },
  orbScene: {
    position: "relative",
    width: 290,
    height: 290,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  ring1: {
    position: "absolute",
    width: 240,
    height: 240,
    borderRadius: "50%",
    border: `1.5px dashed rgba(245,158,11,0.2)`,
    animation: "spin1 18s linear infinite",
  },
  ring2: {
    position: "absolute",
    width: 190,
    height: 190,
    borderRadius: "50%",
    border: `1px solid rgba(245,158,11,0.1)`,
    animation: "spin2 12s linear infinite",
  },
  potWrap: {
    position: "relative",
    width: 90,
    height: 90,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 4,
    animation: "potBob 1.8s ease-in-out infinite",
  },
  potEmoji: {
    fontSize: 58,
    filter: "drop-shadow(0 0 18px rgba(245,158,11,0.6))",
    userSelect: "none",
  },
  steam: {
    position: "absolute",
    top: -10,
    width: 6,
    height: 18,
    background: "rgba(255,255,255,0.18)",
    borderRadius: 99,
    animation: "steamRise 1.4s ease-out infinite",
  },
  msgWrap: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    background: "rgba(255,255,255,0.06)",
    border: `1px solid rgba(245,158,11,0.2)`,
    borderRadius: 99,
    padding: "10px 22px",
    animation: "msgFade 2s ease-in-out infinite",
  },
  msgEmoji: {
    fontSize: 20,
    transition: "all 0.4s ease",
  },
  msgText: {
    fontSize: 14,
    fontWeight: 400,
    color: BRAND.cream,
    letterSpacing: "0.02em",
  },
  barTrack: {
    width: "100%",
    height: 8,
    background: "rgba(255,255,255,0.08)",
    borderRadius: 99,
    position: "relative",
    overflow: "visible",
    border: `1px solid rgba(245,158,11,0.12)`,
  },
  barFill: {
    height: "100%",
    borderRadius: 99,
    background: `linear-gradient(90deg, ${BRAND.darkBrown}, ${BRAND.gold}, ${BRAND.amber})`,
    transition: "width 0.12s ease",
    position: "relative",
    overflow: "hidden",
    boxShadow: `0 0 12px rgba(245,158,11,0.5)`,
  },
  barShine: {
    position: "absolute",
    top: 0,
    width: "60%",
    height: "100%",
    background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)",
    animation: "barShimmer 1.6s ease-in-out infinite",
  },
  barDot: {
    position: "absolute",
    top: -4,
    width: 14,
    height: 14,
    borderRadius: "50%",
    background: BRAND.amber,
    boxShadow: `0 0 10px ${BRAND.amber}, 0 0 24px rgba(245,158,11,0.4)`,
    transition: "left 0.12s ease",
    border: `2px solid white`,
  },
  pctRow: {
    display: "flex",
    alignItems: "baseline",
    gap: 10,
    marginTop: -10,
  },
  pctText: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 36,
    fontWeight: 900,
    color: BRAND.amber,
    lineHeight: 1,
    textShadow: `0 0 20px rgba(245,158,11,0.4)`,
  },
  pctLabel: {
    fontSize: 12,
    color: "rgba(254,243,199,0.5)",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
  },
  badges: {
    display: "flex",
    gap: 12,
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 4,
  },
  badge: {
    fontSize: 11,
    color: "rgba(254,243,199,0.6)",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(245,158,11,0.15)",
    borderRadius: 99,
    padding: "5px 14px",
    letterSpacing: "0.04em",
  },
  doneOverlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(61,31,0,0.7)",
    backdropFilter: "blur(8px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 100,
    animation: "doneReveal 0.5s ease forwards",
  },
  doneBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 12,
    background: "rgba(255,255,255,0.07)",
    border: `1.5px solid rgba(245,158,11,0.4)`,
    borderRadius: 24,
    padding: "40px 60px",
    boxShadow: `0 0 60px rgba(245,158,11,0.2)`,
  },
  doneText: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 28,
    fontWeight: 900,
    color: BRAND.white,
  },
  doneSubText: {
    fontSize: 14,
    color: BRAND.amber,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
  },
};