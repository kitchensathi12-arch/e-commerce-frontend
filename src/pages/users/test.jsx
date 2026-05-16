import { useState, useEffect, useRef } from 'react';
import { Header } from '@components/Header';
import { Footer } from '@/components/footer';

// ── Brand Tokens ──────────────────────────────────────────────────────────────
const BRAND = {
  brown: '#5C3A1E',
  brownDark: '#3E2610',
  amber: '#D4860B',
  amberLight: '#F0A830',
  amberPale: '#FFF4E0',
  steel: '#C0C8D0',
  steelDark: '#8A9299',
  white: '#FFFFFF',
  offWhite: '#FAFAF7',
  text: '#1A1109',
  textMuted: '#6B5B45',
};

// ── Font imports via @import in style tag
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;900&family=DM+Sans:wght@300;400;500;600&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      font-family: 'DM Sans', sans-serif;
      background: ${BRAND.offWhite};
      color: ${BRAND.text};
      overflow-x: hidden;
    }

    .playfair { font-family: 'Playfair Display', serif; }

    /* Scrollbar */
    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: ${BRAND.amberPale}; }
    ::-webkit-scrollbar-thumb { background: ${BRAND.amber}; border-radius: 3px; }

    /* Animations */
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(28px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes shimmer {
      0%   { background-position: -600px 0; }
      100% { background-position: 600px 0; }
    }
    @keyframes floatY {
      0%, 100% { transform: translateY(0); }
      50%       { transform: translateY(-8px); }
    }
    @keyframes spin { to { transform: rotate(360deg); } }
    @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.5} }

    .fade-up  { animation: fadeUp .6s ease both; }
    .delay-1  { animation-delay: .1s; }
    .delay-2  { animation-delay: .2s; }
    .delay-3  { animation-delay: .3s; }
    .delay-4  { animation-delay: .4s; }
    .float    { animation: floatY 3s ease-in-out infinite; }

    /* Hover card lift */
    .card-lift {
      transition: transform .3s ease, box-shadow .3s ease;
    }
    .card-lift:hover {
      transform: translateY(-6px);
      box-shadow: 0 20px 48px rgba(92,58,30,.16);
    }

    /* Btn */
    .btn-primary {
      background: linear-gradient(135deg, ${BRAND.amber}, ${BRAND.amberLight});
      color: ${BRAND.white};
      border: none;
      border-radius: 50px;
      font-family: 'DM Sans', sans-serif;
      font-weight: 600;
      cursor: pointer;
      transition: all .25s ease;
      letter-spacing: .3px;
    }
    .btn-primary:hover {
      background: linear-gradient(135deg, ${BRAND.brownDark}, ${BRAND.brown});
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(212,134,11,.35);
    }
    .btn-outline {
      background: transparent;
      color: ${BRAND.amber};
      border: 2px solid ${BRAND.amber};
      border-radius: 50px;
      font-family: 'DM Sans', sans-serif;
      font-weight: 600;
      cursor: pointer;
      transition: all .25s ease;
    }
    .btn-outline:hover {
      background: ${BRAND.amber};
      color: white;
      transform: translateY(-2px);
    }

    /* Tag */
    .tag {
      display: inline-block;
      background: ${BRAND.amberPale};
      color: ${BRAND.amber};
      border: 1px solid #F0C870;
      border-radius: 50px;
      font-size: 11px;
      font-weight: 600;
      letter-spacing: .8px;
      text-transform: uppercase;
      padding: 3px 12px;
    }

    /* Star */
    .star-filled { color: ${BRAND.amberLight}; }
    .star-empty  { color: #DDD; }

    /* Section heading underline */
    .section-title::after {
      content: '';
      display: block;
      width: 56px;
      height: 3px;
      background: linear-gradient(90deg, ${BRAND.amber}, ${BRAND.amberLight});
      border-radius: 2px;
      margin-top: 10px;
    }
    .section-title.center::after { margin-left: auto; margin-right: auto; }

    /* Product image placeholder */
    .img-placeholder {
      background: linear-gradient(135deg, #F5ECD7 0%, #E8D5B0 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 56px;
    }

    /* Ribbon */
    .ribbon {
      position: absolute;
      top: 14px; left: -4px;
      background: ${BRAND.amber};
      color: white;
      font-size: 10px;
      font-weight: 700;
      letter-spacing: .5px;
      padding: 3px 10px 3px 14px;
      border-radius: 0 4px 4px 0;
      clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%, 6% 50%);
    }

    .mobile-menu-btn { display: none; }
  `}</style>
);

// ── Icons (inline SVG) ────────────────────────────────────────────────────────
const Icon = {
  cart: (s = 20) => (
    <svg width={s} height={s} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.4 7h12.8M7 13l-1-4m12 4l1-4M9 21a1 1 0 100-2 1 1 0 000 2zm6 0a1 1 0 100-2 1 1 0 000 2z"
      />
    </svg>
  ),
  heart: (s = 20, f = false) => (
    <svg
      width={s}
      height={s}
      fill={f ? 'currentColor' : 'none'}
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
      />
    </svg>
  ),
  search: (s = 20) => (
    <svg width={s} height={s} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <circle cx="11" cy="11" r="8" />
      <path strokeLinecap="round" d="m21 21-4.35-4.35" />
    </svg>
  ),
  menu: (s = 24) => (
    <svg width={s} height={s} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  ),
  close: (s = 24) => (
    <svg width={s} height={s} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),
  star: (s = 16) => (
    <svg width={s} height={s} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  ),
  check: (s = 16) => (
    <svg
      width={s}
      height={s}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2.5}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  ),
  arrow: (s = 20, dir = 'right') => {
    const r =
      dir === 'left'
        ? 'rotate(180deg)'
        : dir === 'up'
          ? 'rotate(-90deg)'
          : dir === 'down'
            ? 'rotate(90deg)'
            : '';
    return (
      <svg
        width={s}
        height={s}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        style={{ transform: r }}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6" />
      </svg>
    );
  },
  truck: (s = 20) => (
    <svg
      width={s}
      height={s}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.8}
    >
      <rect x="1" y="3" width="15" height="13" rx="1" />
      <path d="M16 8h4l3 5v3h-7V8z" />
      <circle cx="5.5" cy="18.5" r="2.5" />
      <circle cx="18.5" cy="18.5" r="2.5" />
    </svg>
  ),
  shield: (s = 20) => (
    <svg
      width={s}
      height={s}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.8}
    >
      <path strokeLinecap="round" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  phone: (s = 20) => (
    <svg
      width={s}
      height={s}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.8}
    >
      <path
        strokeLinecap="round"
        d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 12a19.79 19.79 0 01-3.07-8.67A2 2 0 012 1.84h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7a2 2 0 011.72 2.02z"
      />
    </svg>
  ),
  mail: (s = 20) => (
    <svg
      width={s}
      height={s}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.8}
    >
      <path
        strokeLinecap="round"
        d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
      />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  ),
  location: (s = 20) => (
    <svg
      width={s}
      height={s}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.8}
    >
      <path strokeLinecap="round" d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  minus: (s = 16) => (
    <svg
      width={s}
      height={s}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2.5}
    >
      <path strokeLinecap="round" d="M5 12h14" />
    </svg>
  ),
  plus: (s = 16) => (
    <svg
      width={s}
      height={s}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2.5}
    >
      <path strokeLinecap="round" d="M12 5v14M5 12h14" />
    </svg>
  ),
  share: (s = 18) => (
    <svg width={s} height={s} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <path strokeLinecap="round" d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98" />
    </svg>
  ),
};

// ── Data ──────────────────────────────────────────────────────────────────────
const CATEGORIES = [
  { id: 1, name: 'Mixer Grinders', emoji: '🫙', count: 48 },
  { id: 2, name: 'Pressure Cookers', emoji: '🥘', count: 32 },
  { id: 3, name: 'Induction Cooktops', emoji: '🔥', count: 27 },
  { id: 4, name: 'Air Fryers', emoji: '🍟', count: 19 },
  { id: 5, name: 'Cookware Sets', emoji: '🍲', count: 56 },
  { id: 6, name: 'Coffee Makers', emoji: '☕', count: 23 },
];

const PRODUCTS = [
  {
    id: 1,
    name: 'ProBlend 750W Mixer Grinder',
    category: 'Mixer Grinders',
    price: 3299,
    mrp: 4999,
    rating: 4.6,
    reviews: 1248,
    badge: 'Best Seller',
    emoji: '🫙',
    desc: 'Powerful 750W motor with 3 stainless steel jars. Perfect for grinding spices, making chutneys, and preparing smooth batters.',
    colors: ['Silver', 'White', 'Black'],
    features: [
      '750W Motor',
      '3 SS Jars',
      '5-Year Warranty',
      'Overload Protection',
      'ISI Certified',
    ],
    inStock: true,
    images: ['🫙', '⚙️', '🔩'],
  },
  {
    id: 2,
    name: 'SteelMaster 5L Pressure Cooker',
    category: 'Pressure Cookers',
    price: 1899,
    mrp: 2599,
    rating: 4.8,
    reviews: 892,
    badge: 'Top Rated',
    emoji: '🥘',
    desc: 'ISI-marked hard anodized pressure cooker with inner lid design. Suitable for gas, induction, and electric cooktops.',
    colors: ['Anodized Silver'],
    features: ['Hard Anodized', '5 Litre', 'Induction Compatible', 'ISI Marked', '2-Year Warranty'],
    inStock: true,
    images: ['🥘', '🫕', '🍲'],
  },
  {
    id: 3,
    name: 'CrispAir 4.5L Digital Air Fryer',
    category: 'Air Fryers',
    price: 5499,
    mrp: 7999,
    rating: 4.5,
    reviews: 634,
    badge: '31% Off',
    emoji: '🍟',
    desc: 'Digital touchscreen air fryer with 8 preset cooking modes. Enjoy guilt-free crispy food with 85% less oil.',
    colors: ['Black', 'White'],
    features: ['4.5L Capacity', '1400W', '8 Presets', 'Auto Shutoff', 'BPA-Free Basket'],
    inStock: true,
    images: ['🍟', '🍗', '🥕'],
  },
  {
    id: 4,
    name: 'FlameTouch 2000W Induction',
    category: 'Induction Cooktops',
    price: 2199,
    mrp: 2999,
    rating: 4.4,
    reviews: 478,
    badge: 'New',
    emoji: '🔥',
    desc: 'Smart induction cooktop with 10 power levels and auto-detect pan technology. Crystal glass surface for easy cleaning.',
    colors: ['Black'],
    features: ['2000W', '10 Power Levels', 'Auto Detect', 'Timer', 'Crystal Glass'],
    inStock: true,
    images: ['🔥', '⚡', '🫕'],
  },
  {
    id: 5,
    name: 'BrewMate Drip Coffee Maker',
    category: 'Coffee Makers',
    price: 3799,
    mrp: 4999,
    rating: 4.3,
    reviews: 312,
    badge: '',
    emoji: '☕',
    desc: '12-cup programmable coffee maker with keep-warm plate. Brew fresh aromatic coffee at your preferred strength.',
    colors: ['Black', 'Silver'],
    features: ['12 Cup', 'Keep Warm', 'Programmable', 'Anti-Drip', 'Brew Strength Control'],
    inStock: false,
    images: ['☕', '🫖', '☕'],
  },
  {
    id: 6,
    name: 'ChefPro 10-Piece Cookware Set',
    category: 'Cookware Sets',
    price: 8499,
    mrp: 12999,
    rating: 4.7,
    reviews: 203,
    badge: 'Hot Deal',
    emoji: '🍲',
    desc: 'Premium non-stick cookware set with titanium coating. PFOA-free, scratch-resistant, compatible with all cooktops.',
    colors: ['Granite Grey', 'Maroon'],
    features: ['10 Pieces', 'Titanium Non-Stick', 'PFOA-Free', 'All Cooktops', 'Glass Lids'],
    inStock: true,
    images: ['🍲', '🥘', '🫕'],
  },
];

const TESTIMONIALS = [
  {
    name: 'Priya Sharma',
    city: 'Delhi',
    text: 'The ProBlend mixer is fantastic! Grinds coconut chutney in seconds. The 5-year warranty gives great peace of mind.',
    rating: 5,
    initial: 'P',
  },
  {
    name: 'Rahul Verma',
    city: 'Mumbai',
    text: 'Got the pressure cooker for my mom. She loves how quickly it cooks dal and rice. Build quality is excellent.',
    rating: 5,
    initial: 'R',
  },
  {
    name: 'Anita Reddy',
    city: 'Hyderabad',
    text: 'Air fryer changed our eating habits! The kids now love healthy snacks. Delivery was super fast too.',
    rating: 4,
    initial: 'A',
  },
];

// ── Star Rating ───────────────────────────────────────────────────────────────
function Stars({ rating, size = 14 }) {
  return (
    <span style={{ display: 'flex', gap: 2 }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} className={i <= Math.round(rating) ? 'star-filled' : 'star-empty'}>
          {Icon.star(size)}
        </span>
      ))}
    </span>
  );
}

// ── HOME PAGE ─────────────────────────────────────────────────────────────────
function HomePage({ setPage, setSelectedProduct, addToCart }) {
  const heroRef = useRef(null);

  const stats = [
    { val: '2L+', label: 'Happy Customers' },
    { val: '500+', label: 'Products' },
    { val: '4.8★', label: 'Average Rating' },
    { val: '5yr', label: 'Warranty' },
  ];

  return (
    <div>
      {/* HERO */}
      <section
        style={{
          minHeight: '92vh',
          background: `linear-gradient(135deg, ${BRAND.brownDark} 0%, ${BRAND.brown} 45%, #7A4B22 100%)`,
          display: 'flex',
          alignItems: 'center',
          paddingTop: 110,
          paddingBottom: 60,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative circles */}
        <div
          style={{
            position: 'absolute',
            top: -80,
            right: -80,
            width: 480,
            height: 480,
            borderRadius: '50%',
            background: 'rgba(240,168,48,.07)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -100,
            left: -60,
            width: 380,
            height: 380,
            borderRadius: '50%',
            background: 'rgba(240,168,48,.05)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '30%',
            right: '8%',
            width: 240,
            height: 240,
            borderRadius: '50%',
            border: '1px solid rgba(240,168,48,.15)',
          }}
        />

        <div
          style={{
            maxWidth: 1280,
            margin: '0 auto',
            padding: '0 24px',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 60,
            alignItems: 'center',
            width: '100%',
          }}
        >
          {/* Text */}
          <div>
            <div
              className="fade-up tag"
              style={{
                marginBottom: 20,
                background: 'rgba(240,168,48,.15)',
                borderColor: 'rgba(240,168,48,.4)',
                color: BRAND.amberLight,
              }}
            >
              ✨ India's Trusted Kitchen Store
            </div>
            <h1
              className="fade-up delay-1 playfair"
              style={{
                fontSize: 'clamp(36px,5vw,62px)',
                fontWeight: 900,
                color: 'white',
                lineHeight: 1.12,
                marginBottom: 20,
              }}
            >
              Cook Better.
              <br />
              <span style={{ color: BRAND.amberLight }}>Live Better.</span>
              <br />
              Every Day.
            </h1>
            <p
              className="fade-up delay-2"
              style={{
                fontSize: 17,
                color: 'rgba(255,255,255,.72)',
                lineHeight: 1.7,
                marginBottom: 36,
                maxWidth: 460,
              }}
            >
              Discover premium kitchen appliances that transform your cooking experience. From
              powerful mixer grinders to smart induction cooktops — find everything for the modern
              Indian kitchen.
            </p>
            <div className="fade-up delay-3" style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <button
                className="btn-primary"
                onClick={() => setPage('products')}
                style={{ padding: '14px 32px', fontSize: 15 }}
              >
                Shop Now →
              </button>
              <button
                className="btn-outline"
                onClick={() => setPage('offers')}
                style={{
                  padding: '14px 28px',
                  fontSize: 15,
                  borderColor: 'rgba(255,255,255,.4)',
                  color: 'white',
                }}
              >
                View Offers
              </button>
            </div>
            {/* Trust badges */}
            <div
              className="fade-up delay-4"
              style={{ display: 'flex', gap: 20, marginTop: 36, flexWrap: 'wrap' }}
            >
              {[
                ['🚚', 'Free Delivery'],
                ['🔒', 'Secure Payment'],
                ['↩️', 'Easy Returns'],
              ].map(([ic, l]) => (
                <div
                  key={l}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    color: 'rgba(255,255,255,.6)',
                    fontSize: 13,
                  }}
                >
                  <span style={{ fontSize: 16 }}>{ic}</span>
                  {l}
                </div>
              ))}
            </div>
          </div>

          {/* Hero Visual */}
          <div
            className="fade-up delay-2"
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          >
            <div
              className="float"
              style={{
                width: 340,
                height: 340,
                borderRadius: '50%',
                background: 'rgba(240,168,48,.1)',
                border: '1px solid rgba(240,168,48,.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
              }}
            >
              <div
                style={{
                  width: 260,
                  height: 260,
                  borderRadius: '50%',
                  background: 'rgba(240,168,48,.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 120,
                }}
              >
                🫕
              </div>
              {/* orbiting product icons */}
              {[
                { emoji: '🫙', angle: 0 },
                { emoji: '☕', angle: 72 },
                { emoji: '🍟', angle: 144 },
                { emoji: '🔥', angle: 216 },
                { emoji: '🥘', angle: 288 },
              ].map(({ emoji, angle }) => {
                const rad = (angle * Math.PI) / 180;
                const r = 165;
                return (
                  <div
                    key={angle}
                    style={{
                      position: 'absolute',
                      left: `calc(50% + ${Math.cos(rad) * r}px - 24px)`,
                      top: `calc(50% + ${Math.sin(rad) * r}px - 24px)`,
                      width: 48,
                      height: 48,
                      borderRadius: 14,
                      background: 'rgba(255,255,255,.1)',
                      border: '1px solid rgba(240,168,48,.25)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 24,
                      backdropFilter: 'blur(8px)',
                    }}
                  >
                    {emoji}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section style={{ background: BRAND.amber, padding: '28px 24px' }}>
        <div
          style={{
            maxWidth: 1280,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(4,1fr)',
            gap: 20,
            textAlign: 'center',
          }}
        >
          {stats.map((s) => (
            <div key={s.label}>
              <div
                style={{
                  fontFamily: 'Playfair Display, serif',
                  fontSize: 28,
                  fontWeight: 700,
                  color: 'white',
                }}
              >
                {s.val}
              </div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,.8)', fontWeight: 500 }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      <section style={{ padding: '80px 24px', background: BRAND.offWhite }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div className="tag" style={{ marginBottom: 12 }}>
              Browse By Category
            </div>
            <h2
              className="playfair section-title center"
              style={{ fontSize: 36, fontWeight: 700, color: BRAND.brown }}
            >
              Shop What You Need
            </h2>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
              gap: 20,
            }}
          >
            {CATEGORIES.map((cat, i) => (
              <div
                key={cat.id}
                className="card-lift"
                onClick={() => setPage('products')}
                style={{
                  background: 'white',
                  borderRadius: 20,
                  padding: '28px 16px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  border: `1px solid #F0E8D4`,
                  animationDelay: `${i * 0.08}s`,
                }}
              >
                <div style={{ fontSize: 44, marginBottom: 12 }}>{cat.emoji}</div>
                <div style={{ fontWeight: 600, fontSize: 14, color: BRAND.brown, marginBottom: 4 }}>
                  {cat.name}
                </div>
                <div style={{ fontSize: 12, color: BRAND.textMuted }}>{cat.count} products</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section style={{ padding: '80px 24px', background: 'white' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              marginBottom: 48,
            }}
          >
            <div>
              <div className="tag" style={{ marginBottom: 12 }}>
                Featured
              </div>
              <h2
                className="playfair section-title"
                style={{ fontSize: 36, fontWeight: 700, color: BRAND.brown }}
              >
                Best Sellers
              </h2>
            </div>
            <button
              className="btn-outline"
              onClick={() => setPage('products')}
              style={{ padding: '10px 24px', fontSize: 14 }}
            >
              View All
            </button>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: 24,
            }}
          >
            {PRODUCTS.slice(0, 4).map((p, i) => (
              <ProductCard
                key={p.id}
                product={p}
                i={i}
                setPage={setPage}
                setSelectedProduct={setSelectedProduct}
                addToCart={addToCart}
              />
            ))}
          </div>
        </div>
      </section>

      {/* PROMO BANNER */}
      <section style={{ padding: '60px 24px', background: BRAND.amberPale }}>
        <div
          style={{
            maxWidth: 1280,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 24,
          }}
        >
          {[
            {
              title: 'Up to 40% Off on Cookware',
              sub: 'Limited time deal • Shop now',
              emoji: '🍳',
              bg: `linear-gradient(135deg, ${BRAND.brown}, #8B5E35)`,
            },
            {
              title: 'Free Delivery on First Order',
              sub: 'Use code: SAATHI1 at checkout',
              emoji: '🚚',
              bg: `linear-gradient(135deg, ${BRAND.amber}, #C47800)`,
            },
          ].map((b, i) => (
            <div
              key={i}
              className="card-lift"
              style={{
                borderRadius: 20,
                padding: '36px 32px',
                background: b.bg,
                color: 'white',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: 'Playfair Display, serif',
                    fontSize: 22,
                    fontWeight: 700,
                    marginBottom: 6,
                  }}
                >
                  {b.title}
                </div>
                <div style={{ fontSize: 13, opacity: 0.8 }}>{b.sub}</div>
                <button
                  style={{
                    marginTop: 18,
                    background: 'rgba(255,255,255,.2)',
                    border: '1px solid rgba(255,255,255,.4)',
                    borderRadius: 50,
                    padding: '8px 20px',
                    color: 'white',
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  Shop Now
                </button>
              </div>
              <div style={{ fontSize: 64 }}>{b.emoji}</div>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ padding: '80px 24px', background: BRAND.offWhite }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div className="tag" style={{ marginBottom: 12 }}>
              Testimonials
            </div>
            <h2
              className="playfair section-title center"
              style={{ fontSize: 36, fontWeight: 700, color: BRAND.brown }}
            >
              What Our Customers Say
            </h2>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 24,
            }}
          >
            {TESTIMONIALS.map((t, i) => (
              <div
                key={i}
                className="card-lift"
                style={{
                  background: 'white',
                  borderRadius: 20,
                  padding: 28,
                  border: `1px solid #F0E8D4`,
                }}
              >
                <div style={{ display: 'flex', gap: 4, marginBottom: 16 }}>
                  <Stars rating={t.rating} />
                </div>
                <p
                  style={{
                    fontSize: 15,
                    lineHeight: 1.7,
                    color: BRAND.textMuted,
                    marginBottom: 20,
                  }}
                >
                  "{t.text}"
                </p>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: '50%',
                      background: `linear-gradient(135deg, ${BRAND.amber}, ${BRAND.amberLight})`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontWeight: 700,
                      fontSize: 16,
                    }}
                  >
                    {t.initial}
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14, color: BRAND.brown }}>
                      {t.name}
                    </div>
                    <div style={{ fontSize: 12, color: BRAND.textMuted }}>{t.city}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY KITCHENSAATHI */}
      <section
        style={{
          padding: '80px 24px',
          background: `linear-gradient(135deg, ${BRAND.brownDark} 0%, ${BRAND.brown} 100%)`,
          color: 'white',
        }}
      >
        <div style={{ maxWidth: 1280, margin: '0 auto', textAlign: 'center' }}>
          <div
            className="tag"
            style={{
              marginBottom: 12,
              background: 'rgba(240,168,48,.15)',
              borderColor: 'rgba(240,168,48,.3)',
              color: BRAND.amberLight,
            }}
          >
            Why Choose Us
          </div>
          <h2 className="playfair" style={{ fontSize: 36, fontWeight: 700, marginBottom: 48 }}>
            Why KitchenSaathi?
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: 28,
            }}
          >
            {[
              {
                emoji: '🏆',
                title: 'Premium Quality',
                desc: 'Only ISI-certified appliances from trusted brands',
              },
              {
                emoji: '💰',
                title: 'Best Prices',
                desc: 'Lowest prices guaranteed with no hidden charges',
              },
              {
                emoji: '🔧',
                title: 'After-Sales Service',
                desc: 'Dedicated support team & free installation',
              },
              { emoji: '📦', title: 'Fast Delivery', desc: 'Same-day dispatch for metro cities' },
            ].map((f, i) => (
              <div
                key={i}
                style={{
                  background: 'rgba(255,255,255,.06)',
                  borderRadius: 20,
                  padding: 32,
                  border: '1px solid rgba(255,255,255,.08)',
                  transition: 'background .2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(240,168,48,.12)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,.06)')}
              >
                <div style={{ fontSize: 44, marginBottom: 16 }}>{f.emoji}</div>
                <div
                  style={{
                    fontFamily: 'Playfair Display, serif',
                    fontSize: 18,
                    fontWeight: 600,
                    marginBottom: 8,
                  }}
                >
                  {f.title}
                </div>
                <div style={{ fontSize: 14, color: 'rgba(255,255,255,.65)', lineHeight: 1.6 }}>
                  {f.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// ── Product Card ──────────────────────────────────────────────────────────────
function ProductCard({ product: p, i, setPage, setSelectedProduct, addToCart }) {
  const [wishlisted, setWishlisted] = useState(false);
  const disc = Math.round(((p.mrp - p.price) / p.mrp) * 100);

  return (
    <div
      className="card-lift"
      style={{
        background: 'white',
        borderRadius: 20,
        overflow: 'hidden',
        border: `1px solid #F0E8D4`,
        position: 'relative',
        cursor: 'pointer',
      }}
    >
      {p.badge && <div className="ribbon">{p.badge}</div>}
      {/* Image */}
      <div
        className="img-placeholder"
        style={{ height: 200, position: 'relative' }}
        onClick={() => {
          setSelectedProduct(p);
          setPage('product');
        }}
      >
        <span style={{ fontSize: 80 }}>{p.emoji}</span>
        {!p.inStock && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(255,255,255,.75)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span
              style={{
                background: BRAND.brown,
                color: 'white',
                borderRadius: 50,
                padding: '6px 16px',
                fontSize: 12,
                fontWeight: 600,
              }}
            >
              Out of Stock
            </span>
          </div>
        )}
      </div>

      <div style={{ padding: '18px 18px 20px' }}>
        <div
          style={{
            fontSize: 11,
            color: BRAND.textMuted,
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: 0.8,
            marginBottom: 4,
          }}
        >
          {p.category}
        </div>
        <div
          style={{
            fontWeight: 600,
            fontSize: 15,
            color: BRAND.brown,
            lineHeight: 1.4,
            marginBottom: 8,
            cursor: 'pointer',
          }}
          onClick={() => {
            setSelectedProduct(p);
            setPage('product');
          }}
        >
          {p.name}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
          <Stars rating={p.rating} />
          <span style={{ fontSize: 12, color: BRAND.textMuted }}>
            ({p.reviews.toLocaleString()})
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
          <span
            style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 22,
              fontWeight: 700,
              color: BRAND.brown,
            }}
          >
            ₹{p.price.toLocaleString()}
          </span>
          <span style={{ fontSize: 13, color: BRAND.steelDark, textDecoration: 'line-through' }}>
            ₹{p.mrp.toLocaleString()}
          </span>
          <span style={{ fontSize: 12, fontWeight: 700, color: '#2D8B2D' }}>{disc}% off</span>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            className="btn-primary"
            onClick={() => p.inStock && addToCart(p)}
            disabled={!p.inStock}
            style={{ flex: 1, padding: '10px 0', fontSize: 13, opacity: p.inStock ? 1 : 0.5 }}
          >
            {p.inStock ? 'Add to Cart' : 'Notify Me'}
          </button>
          <button
            onClick={() => setWishlisted(!wishlisted)}
            style={{
              width: 40,
              height: 40,
              border: `1px solid ${wishlisted ? BRAND.amber : '#E8DDD0'}`,
              borderRadius: 10,
              background: wishlisted ? BRAND.amberPale : 'white',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: wishlisted ? BRAND.amber : BRAND.steelDark,
              flexShrink: 0,
            }}
          >
            {Icon.heart(16, wishlisted)}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── PRODUCTS PAGE ─────────────────────────────────────────────────────────────
function ProductsPage({ setPage, setSelectedProduct, addToCart }) {
  const [filter, setFilter] = useState('All');
  const cats = ['All', ...CATEGORIES.map((c) => c.name)];
  const filtered = filter === 'All' ? PRODUCTS : PRODUCTS.filter((p) => p.category === filter);

  return (
    <div
      style={{ paddingTop: 110, paddingBottom: 80, background: BRAND.offWhite, minHeight: '100vh' }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
        {/* Breadcrumb */}
        <div
          style={{
            fontSize: 13,
            color: BRAND.textMuted,
            padding: '20px 0',
            display: 'flex',
            gap: 6,
            alignItems: 'center',
          }}
        >
          <span onClick={() => setPage('home')} style={{ cursor: 'pointer', color: BRAND.amber }}>
            Home
          </span>
          {Icon.arrow(14)} All Products
        </div>

        <h1
          className="playfair"
          style={{ fontSize: 36, fontWeight: 700, color: BRAND.brown, marginBottom: 8 }}
        >
          Our Products
        </h1>
        <p style={{ color: BRAND.textMuted, marginBottom: 32 }}>
          {PRODUCTS.length} premium kitchen appliances
        </p>

        {/* Filter tabs */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 36 }}>
          {cats.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              style={{
                padding: '8px 18px',
                borderRadius: 50,
                fontSize: 13,
                fontWeight: 500,
                cursor: 'pointer',
                border: filter === c ? 'none' : `1px solid #E8DDD0`,
                background: filter === c ? BRAND.amber : 'white',
                color: filter === c ? 'white' : BRAND.brown,
                transition: 'all .2s',
              }}
            >
              {c}
            </button>
          ))}
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: 24,
          }}
        >
          {filtered.map((p, i) => (
            <ProductCard
              key={p.id}
              product={p}
              i={i}
              setPage={setPage}
              setSelectedProduct={setSelectedProduct}
              addToCart={addToCart}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ── PRODUCT DETAIL PAGE ───────────────────────────────────────────────────────
function ProductDetailPage({ product: p, setPage, addToCart }) {
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState('description');
  const [wishlisted, setWishlisted] = useState(false);
  const [selectedImg, setSelectedImg] = useState(0);
  const [added, setAdded] = useState(false);

  if (!p) return null;

  const disc = Math.round(((p.mrp - p.price) / p.mrp) * 100);

  const handleAdd = () => {
    addToCart(p, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div
      style={{ paddingTop: 110, paddingBottom: 80, background: BRAND.offWhite, minHeight: '100vh' }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
        {/* Breadcrumb */}
        <div
          style={{
            fontSize: 13,
            color: BRAND.textMuted,
            padding: '20px 0',
            display: 'flex',
            gap: 6,
            alignItems: 'center',
            flexWrap: 'wrap',
          }}
        >
          <span onClick={() => setPage('home')} style={{ cursor: 'pointer', color: BRAND.amber }}>
            Home
          </span>
          {Icon.arrow(14)}
          <span
            onClick={() => setPage('products')}
            style={{ cursor: 'pointer', color: BRAND.amber }}
          >
            Products
          </span>
          {Icon.arrow(14)}
          <span>{p.name}</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, marginTop: 8 }}>
          {/* Gallery */}
          <div>
            <div
              className="img-placeholder"
              style={{
                height: 420,
                borderRadius: 24,
                marginBottom: 14,
                border: `1px solid #F0E8D4`,
                fontSize: 120,
              }}
            >
              <span>{p.images[selectedImg]}</span>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              {p.images.map((img, i) => (
                <div
                  key={i}
                  onClick={() => setSelectedImg(i)}
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: 12,
                    cursor: 'pointer',
                    background: '#F5ECD7',
                    border: `2px solid ${selectedImg === i ? BRAND.amber : '#E8D5B0'}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 32,
                    transition: 'border .2s',
                  }}
                >
                  {img}
                </div>
              ))}
            </div>
          </div>

          {/* Info */}
          <div>
            <div className="tag" style={{ marginBottom: 14 }}>
              {p.category}
            </div>
            {p.badge && (
              <span
                style={{
                  background: '#2D8B2D',
                  color: 'white',
                  borderRadius: 50,
                  padding: '3px 12px',
                  fontSize: 11,
                  fontWeight: 700,
                  marginLeft: 8,
                }}
              >
                {p.badge}
              </span>
            )}

            <h1
              className="playfair"
              style={{
                fontSize: 30,
                fontWeight: 700,
                color: BRAND.brown,
                lineHeight: 1.3,
                marginBottom: 16,
                marginTop: 8,
              }}
            >
              {p.name}
            </h1>

            {/* Rating */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
              <Stars rating={p.rating} size={18} />
              <span style={{ fontWeight: 700, color: BRAND.amber }}>{p.rating}</span>
              <span style={{ fontSize: 14, color: BRAND.textMuted }}>
                ({p.reviews.toLocaleString()} reviews)
              </span>
            </div>

            {/* Price */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 8 }}>
              <span
                className="playfair"
                style={{ fontSize: 38, fontWeight: 700, color: BRAND.brown }}
              >
                ₹{p.price.toLocaleString()}
              </span>
              <span
                style={{ fontSize: 18, color: BRAND.steelDark, textDecoration: 'line-through' }}
              >
                ₹{p.mrp.toLocaleString()}
              </span>
            </div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 24 }}>
              <span
                style={{
                  background: '#E8F5E9',
                  color: '#2D8B2D',
                  borderRadius: 50,
                  padding: '4px 12px',
                  fontSize: 13,
                  fontWeight: 700,
                }}
              >
                {disc}% OFF • Save ₹{(p.mrp - p.price).toLocaleString()}
              </span>
              <span style={{ fontSize: 12, color: BRAND.textMuted }}>Inclusive of all taxes</span>
            </div>

            {/* Availability */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                marginBottom: 24,
                padding: '12px 16px',
                background: p.inStock ? '#E8F5E9' : '#FFF3E0',
                borderRadius: 10,
              }}
            >
              <span style={{ color: p.inStock ? '#2D8B2D' : '#E65100', fontSize: 16 }}>
                {p.inStock ? '✅' : '⏰'}
              </span>
              <span
                style={{ fontSize: 14, fontWeight: 500, color: p.inStock ? '#2D8B2D' : '#E65100' }}
              >
                {p.inStock ? 'In Stock — Ready to Ship' : 'Currently Out of Stock'}
              </span>
            </div>

            {/* Colors */}
            {p.colors.length > 0 && (
              <div style={{ marginBottom: 24 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: BRAND.brown, marginBottom: 8 }}>
                  Available Colors
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  {p.colors.map((c) => (
                    <button
                      key={c}
                      style={{
                        padding: '6px 14px',
                        border: `1.5px solid ${BRAND.amber}`,
                        borderRadius: 50,
                        fontSize: 12,
                        cursor: 'pointer',
                        background: 'white',
                        fontFamily: 'DM Sans, sans-serif',
                      }}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: BRAND.brown }}>Quantity:</div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0,
                  border: `1px solid #E8DDD0`,
                  borderRadius: 50,
                  overflow: 'hidden',
                }}
              >
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  style={{
                    width: 40,
                    height: 40,
                    border: 'none',
                    background: 'white',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: BRAND.brown,
                  }}
                >
                  {Icon.minus(16)}
                </button>
                <span style={{ width: 40, textAlign: 'center', fontWeight: 700, fontSize: 15 }}>
                  {qty}
                </span>
                <button
                  onClick={() => setQty(qty + 1)}
                  style={{
                    width: 40,
                    height: 40,
                    border: 'none',
                    background: 'white',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: BRAND.brown,
                  }}
                >
                  {Icon.plus(16)}
                </button>
              </div>
            </div>

            {/* CTAs */}
            <div style={{ display: 'flex', gap: 10, marginBottom: 24 }}>
              <button
                className="btn-primary"
                onClick={handleAdd}
                disabled={!p.inStock}
                style={{
                  flex: 1,
                  padding: '14px 0',
                  fontSize: 15,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  opacity: p.inStock ? 1 : 0.5,
                }}
              >
                {added ? (
                  <>
                    <span>{Icon.check(18)}</span> Added!
                  </>
                ) : (
                  <>{Icon.cart(18)} Add to Cart</>
                )}
              </button>
              <button className="btn-outline" style={{ flex: 1, padding: '14px 0', fontSize: 15 }}>
                Buy Now
              </button>
              <button
                onClick={() => setWishlisted(!wishlisted)}
                style={{
                  width: 50,
                  height: 50,
                  border: `1.5px solid ${wishlisted ? BRAND.amber : '#E8DDD0'}`,
                  borderRadius: 12,
                  background: wishlisted ? BRAND.amberPale : 'white',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: wishlisted ? BRAND.amber : BRAND.steelDark,
                  flexShrink: 0,
                }}
              >
                {Icon.heart(20, wishlisted)}
              </button>
            </div>

            {/* Delivery info */}
            <div
              style={{
                background: BRAND.amberPale,
                borderRadius: 14,
                padding: 16,
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 12,
              }}
            >
              {[
                [Icon.truck(18), 'Free Delivery', 'Orders above ₹999'],
                [Icon.shield(18), '2-Year Warranty', 'Manufacturer warranty'],
                [Icon.check(18), 'ISI Certified', 'Quality assured'],
                ['↩️', '10-Day Returns', 'Hassle-free returns'],
              ].map(([ic, t, s], idx) => (
                <div key={idx} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                  <span style={{ color: BRAND.amber, flexShrink: 0, marginTop: 2 }}>
                    {typeof ic === 'string' ? ic : ic}
                  </span>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: BRAND.brown }}>{t}</div>
                    <div style={{ fontSize: 11, color: BRAND.textMuted }}>{s}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* TABS */}
        <div
          style={{
            marginTop: 60,
            background: 'white',
            borderRadius: 20,
            padding: 32,
            border: `1px solid #F0E8D4`,
          }}
        >
          <div
            style={{ display: 'flex', gap: 4, borderBottom: `2px solid #F0E8D4`, marginBottom: 28 }}
          >
            {['description', 'features', 'reviews'].map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                style={{
                  padding: '10px 24px',
                  border: 'none',
                  borderBottom: tab === t ? `2px solid ${BRAND.amber}` : '2px solid transparent',
                  marginBottom: -2,
                  background: 'none',
                  cursor: 'pointer',
                  fontFamily: 'DM Sans, sans-serif',
                  fontWeight: tab === t ? 600 : 400,
                  fontSize: 14,
                  color: tab === t ? BRAND.amber : BRAND.textMuted,
                  textTransform: 'capitalize',
                  transition: 'all .2s',
                }}
              >
                {t}
              </button>
            ))}
          </div>

          {tab === 'description' && (
            <p style={{ fontSize: 15, lineHeight: 1.8, color: BRAND.textMuted, maxWidth: 680 }}>
              {p.desc}
            </p>
          )}
          {tab === 'features' && (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                gap: 16,
              }}
            >
              {p.features.map((f) => (
                <div
                  key={f}
                  style={{
                    display: 'flex',
                    gap: 10,
                    alignItems: 'center',
                    padding: '12px 16px',
                    background: BRAND.amberPale,
                    borderRadius: 10,
                  }}
                >
                  <span style={{ color: BRAND.amber }}>{Icon.check(16)}</span>
                  <span style={{ fontSize: 14, fontWeight: 500, color: BRAND.brown }}>{f}</span>
                </div>
              ))}
            </div>
          )}
          {tab === 'reviews' && (
            <div>
              {TESTIMONIALS.map((t, i) => (
                <div
                  key={i}
                  style={{ borderBottom: `1px solid #F0E8D4`, paddingBottom: 20, marginBottom: 20 }}
                >
                  <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 8 }}>
                    <div
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        background: `linear-gradient(135deg, ${BRAND.amber}, ${BRAND.amberLight})`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontWeight: 700,
                      }}
                    >
                      {t.initial}
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 14, color: BRAND.brown }}>
                        {t.name}
                      </div>
                      <Stars rating={t.rating} size={12} />
                    </div>
                  </div>
                  <p style={{ fontSize: 14, color: BRAND.textMuted, lineHeight: 1.7 }}>{t.text}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Related products */}
        <div style={{ marginTop: 60 }}>
          <h2
            className="playfair section-title"
            style={{ fontSize: 28, fontWeight: 700, color: BRAND.brown, marginBottom: 32 }}
          >
            You May Also Like
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
              gap: 20,
            }}
          >
            {PRODUCTS.filter((pr) => pr.id !== p.id)
              .slice(0, 4)
              .map((pr, i) => (
                <ProductCard
                  key={pr.id}
                  product={pr}
                  i={i}
                  setPage={setPage}
                  setSelectedProduct={() => {}}
                  addToCart={addToCart}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── CART PAGE ─────────────────────────────────────────────────────────────────
function CartPage({ cartItems, setCartItems, setPage }) {
  const total = cartItems.reduce((s, i) => s + i.price * i.qty, 0);
  const savings = cartItems.reduce((s, i) => s + (i.mrp - i.price) * i.qty, 0);

  const updateQty = (id, delta) => {
    setCartItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i))
    );
  };
  const remove = (id) => setCartItems((prev) => prev.filter((i) => i.id !== id));

  return (
    <div
      style={{ paddingTop: 110, paddingBottom: 80, background: BRAND.offWhite, minHeight: '100vh' }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ fontSize: 13, color: BRAND.textMuted, padding: '20px 0' }}>
          <span onClick={() => setPage('home')} style={{ cursor: 'pointer', color: BRAND.amber }}>
            Home
          </span>{' '}
          › Cart
        </div>
        <h1
          className="playfair"
          style={{ fontSize: 32, fontWeight: 700, color: BRAND.brown, marginBottom: 32 }}
        >
          Your Cart ({cartItems.length} items)
        </h1>

        {cartItems.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <div style={{ fontSize: 80, marginBottom: 20 }}>🛒</div>
            <h2 className="playfair" style={{ fontSize: 24, color: BRAND.brown, marginBottom: 12 }}>
              Your cart is empty
            </h2>
            <p style={{ color: BRAND.textMuted, marginBottom: 28 }}>
              Looks like you haven't added anything yet!
            </p>
            <button
              className="btn-primary"
              onClick={() => setPage('products')}
              style={{ padding: '12px 32px', fontSize: 15 }}
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 28 }}>
            {/* Items */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  style={{
                    background: 'white',
                    borderRadius: 16,
                    padding: 20,
                    border: `1px solid #F0E8D4`,
                    display: 'flex',
                    gap: 16,
                    alignItems: 'center',
                  }}
                >
                  <div
                    style={{
                      width: 80,
                      height: 80,
                      background: '#F5ECD7',
                      borderRadius: 12,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 40,
                      flexShrink: 0,
                    }}
                  >
                    {item.emoji}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div
                      style={{ fontWeight: 600, fontSize: 15, color: BRAND.brown, marginBottom: 4 }}
                    >
                      {item.name}
                    </div>
                    <div style={{ fontSize: 13, color: BRAND.textMuted, marginBottom: 8 }}>
                      {item.category}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <span
                        className="playfair"
                        style={{ fontSize: 18, fontWeight: 700, color: BRAND.brown }}
                      >
                        ₹{item.price.toLocaleString()}
                      </span>
                      <span
                        style={{
                          fontSize: 13,
                          color: BRAND.steelDark,
                          textDecoration: 'line-through',
                        }}
                      >
                        ₹{item.mrp.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        border: `1px solid #E8DDD0`,
                        borderRadius: 50,
                        overflow: 'hidden',
                      }}
                    >
                      <button
                        onClick={() => updateQty(item.id, -1)}
                        style={{
                          width: 32,
                          height: 32,
                          border: 'none',
                          background: 'white',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        {Icon.minus(12)}
                      </button>
                      <span
                        style={{ width: 28, textAlign: 'center', fontSize: 14, fontWeight: 600 }}
                      >
                        {item.qty}
                      </span>
                      <button
                        onClick={() => updateQty(item.id, 1)}
                        style={{
                          width: 32,
                          height: 32,
                          border: 'none',
                          background: 'white',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        {Icon.plus(12)}
                      </button>
                    </div>
                    <button
                      onClick={() => remove(item.id)}
                      style={{
                        width: 32,
                        height: 32,
                        border: `1px solid #FFD0D0`,
                        borderRadius: 8,
                        background: '#FFF5F5',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#E53E3E',
                      }}
                    >
                      {Icon.close(14)}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div
              style={{
                background: 'white',
                borderRadius: 20,
                padding: 28,
                border: `1px solid #F0E8D4`,
                height: 'fit-content',
                position: 'sticky',
                top: 90,
              }}
            >
              <h3
                className="playfair"
                style={{ fontSize: 20, fontWeight: 700, color: BRAND.brown, marginBottom: 24 }}
              >
                Order Summary
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
                {[
                  ['Subtotal', `₹${(total + savings).toLocaleString()}`],
                  [
                    'Discount',
                    <span style={{ color: '#2D8B2D' }}>-₹{savings.toLocaleString()}</span>,
                  ],
                  [
                    'Delivery',
                    <span style={{ color: '#2D8B2D' }}>{total > 999 ? 'FREE' : '₹99'}</span>,
                  ],
                ].map(([l, v]) => (
                  <div
                    key={l}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontSize: 14,
                      color: BRAND.textMuted,
                    }}
                  >
                    <span>{l}</span>
                    <span style={{ fontWeight: 500 }}>{v}</span>
                  </div>
                ))}
                <div
                  style={{
                    borderTop: `1px solid #F0E8D4`,
                    paddingTop: 12,
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <span style={{ fontWeight: 700, fontSize: 16, color: BRAND.brown }}>Total</span>
                  <span
                    className="playfair"
                    style={{ fontWeight: 700, fontSize: 22, color: BRAND.brown }}
                  >
                    ₹{(total > 999 ? total : total + 99).toLocaleString()}
                  </span>
                </div>
              </div>
              <div
                style={{
                  background: '#E8F5E9',
                  borderRadius: 10,
                  padding: '10px 14px',
                  fontSize: 13,
                  color: '#2D8B2D',
                  fontWeight: 600,
                  marginBottom: 20,
                }}
              >
                🎉 You save ₹{savings.toLocaleString()} on this order!
              </div>
              <button
                className="btn-primary"
                style={{ width: '100%', padding: '14px 0', fontSize: 15 }}
              >
                Proceed to Checkout →
              </button>
              <button
                className="btn-outline"
                onClick={() => setPage('products')}
                style={{ width: '100%', padding: '12px 0', fontSize: 14, marginTop: 10 }}
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── OFFERS PAGE ───────────────────────────────────────────────────────────────
function OffersPage({ setPage, setSelectedProduct, addToCart }) {
  const deals = PRODUCTS.filter((p) => (p.mrp - p.price) / p.mrp > 0.25);
  return (
    <div
      style={{ paddingTop: 110, paddingBottom: 80, background: BRAND.offWhite, minHeight: '100vh' }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
        <div
          style={{
            background: `linear-gradient(135deg, ${BRAND.brown}, ${BRAND.amber})`,
            borderRadius: 24,
            padding: '48px 40px',
            marginBottom: 48,
            marginTop: 20,
            textAlign: 'center',
            color: 'white',
          }}
        >
          <div style={{ fontSize: 48, marginBottom: 12 }}>🏷️</div>
          <h1 className="playfair" style={{ fontSize: 40, fontWeight: 700, marginBottom: 12 }}>
            Today's Best Deals
          </h1>
          <p style={{ fontSize: 16, opacity: 0.85 }}>
            Exclusive offers on premium kitchen appliances — limited time only!
          </p>
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: 24,
          }}
        >
          {deals.map((p, i) => (
            <ProductCard
              key={p.id}
              product={p}
              i={i}
              setPage={setPage}
              setSelectedProduct={setSelectedProduct}
              addToCart={addToCart}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ── ABOUT PAGE ────────────────────────────────────────────────────────────────
function AboutPage() {
  return (
    <div
      style={{ paddingTop: 110, paddingBottom: 80, background: BRAND.offWhite, minHeight: '100vh' }}
    >
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '40px 24px' }}>
        <div className="tag" style={{ marginBottom: 16 }}>
          Our Story
        </div>
        <h1
          className="playfair"
          style={{
            fontSize: 44,
            fontWeight: 800,
            color: BRAND.brown,
            lineHeight: 1.2,
            marginBottom: 24,
          }}
        >
          We're Your Trusted
          <br />
          <span style={{ color: BRAND.amber }}>Kitchen Companion</span>
        </h1>
        <p style={{ fontSize: 17, lineHeight: 1.9, color: BRAND.textMuted, marginBottom: 24 }}>
          KitchenSaathi was born from a simple belief — every Indian household deserves access to
          premium, reliable kitchen appliances at honest prices. Since 2018, we've been helping
          families across India cook better and live better.
        </p>
        <p style={{ fontSize: 17, lineHeight: 1.9, color: BRAND.textMuted, marginBottom: 48 }}>
          From the bustling kitchens of Delhi to cozy homes in Chennai, over 2 lakh happy customers
          trust KitchenSaathi for their kitchen needs. We curate only ISI-certified, quality-tested
          appliances backed by genuine warranties.
        </p>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: 20,
          }}
        >
          {[
            ['2018', 'Founded'],
            ['2L+', 'Happy Customers'],
            ['500+', 'Products'],
            ['4.8★', 'Google Rating'],
          ].map(([v, l]) => (
            <div
              key={l}
              style={{
                background: 'white',
                borderRadius: 16,
                padding: 24,
                textAlign: 'center',
                border: `1px solid #F0E8D4`,
              }}
            >
              <div
                className="playfair"
                style={{ fontSize: 34, fontWeight: 700, color: BRAND.amber }}
              >
                {v}
              </div>
              <div style={{ fontSize: 14, color: BRAND.textMuted, fontWeight: 500 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── MAIN APP ──────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product, qty = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) return prev.map((i) => (i.id === product.id ? { ...i, qty: i.qty + qty } : i));
      return [...prev, { ...product, qty }];
    });
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page]);

  const cartCount = cartItems.reduce((s, i) => s + i.qty, 0);

  return (
    <>
      <GlobalStyles />
      <Header page={page} setPage={setPage} cart={cartCount} wishlist={0} />

      <main>
        {page === 'home' && (
          <HomePage
            setPage={setPage}
            setSelectedProduct={(p) => {
              setSelectedProduct(p);
              setPage('product');
            }}
            addToCart={addToCart}
          />
        )}
        {page === 'products' && (
          <ProductsPage
            setPage={setPage}
            setSelectedProduct={(p) => {
              setSelectedProduct(p);
              setPage('product');
            }}
            addToCart={addToCart}
          />
        )}
        {page === 'product' && (
          <ProductDetailPage product={selectedProduct} setPage={setPage} addToCart={addToCart} />
        )}
        {page === 'cart' && (
          <CartPage cartItems={cartItems} setCartItems={setCartItems} setPage={setPage} />
        )}
        {page === 'offers' && (
          <OffersPage
            setPage={setPage}
            setSelectedProduct={(p) => {
              setSelectedProduct(p);
              setPage('product');
            }}
            addToCart={addToCart}
          />
        )}
        {page === 'about' && <AboutPage />}
      </main>

      <Footer setPage={setPage} />

      {/* Floating cart button */}
      {cartCount > 0 && page !== 'cart' && (
        <button
          onClick={() => setPage('cart')}
          style={{
            position: 'fixed',
            bottom: 28,
            right: 28,
            zIndex: 999,
            background: `linear-gradient(135deg, ${BRAND.amber}, ${BRAND.amberLight})`,
            color: 'white',
            border: 'none',
            borderRadius: 50,
            padding: '14px 24px',
            fontSize: 15,
            fontWeight: 700,
            cursor: 'pointer',
            boxShadow: '0 8px 32px rgba(212,134,11,.4)',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            fontFamily: 'DM Sans, sans-serif',
            animation: 'fadeUp .4s ease',
          }}
        >
          {Icon.cart(20)} {cartCount} item{cartCount > 1 ? 's' : ''} · ₹
          {cartItems.reduce((s, i) => s + i.price * i.qty, 0).toLocaleString()}
        </button>
      )}
    </>
  );
}
