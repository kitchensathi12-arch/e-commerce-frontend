/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getActiveCategories } from '@/services/CategoryServices';

// ──────────────────────────────────────────────────────────────────

const ShopCategorySection = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['active-categories'],
    queryFn: getActiveCategories,
  });

  const categories = Array.isArray(data) ? data : undefined;
  const [active, setActive] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // drag-to-scroll on mobile
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let isDown = false,
      startX = 0,
      scrollLeft = 0;
    const down = (e: MouseEvent) => {
      isDown = true;
      startX = e.pageX - el.offsetLeft;
      scrollLeft = el.scrollLeft;
    };
    const up = () => {
      isDown = false;
    };
    const move = (e: MouseEvent) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - el.offsetLeft;
      el.scrollLeft = scrollLeft - (x - startX) * 1.5;
    };
    el.addEventListener('mousedown', down);
    el.addEventListener('mouseup', up);
    el.addEventListener('mouseleave', up);
    el.addEventListener('mousemove', move);
    return () => {
      el.removeEventListener('mousedown', down);
      el.removeEventListener('mouseup', up);
      el.removeEventListener('mouseleave', up);
      el.removeEventListener('mousemove', move);
    };
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Outfit:wght@300;400;500;600&display=swap');

        .cat-section {
          background: #faf9f7;
          padding: clamp(48px, 7vw, 96px) 0;
          overflow: hidden;
          position: relative;
          margin-left: calc(50% - 50vw);
          width: 100vw;
        }

        /* subtle dot grid bg */
        .cat-section::before {
          content: '';
          position: absolute; inset: 0; pointer-events: none;
          background-image: radial-gradient(circle, rgba(0,0,0,0.045) 1px, transparent 1px);
          background-size: 28px 28px;
        }

        .cat-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 clamp(20px, 5vw, 64px);
          position: relative;
        }

        /* ── heading ── */
        .cat-eyebrow {
          font-family: 'Outfit', sans-serif;
          font-size: 11px; font-weight: 500;
          letter-spacing: 0.3em; text-transform: uppercase;
          color: #b07d4a;
          margin-bottom: 10px;
          display: block; text-align: center;
        }
        .cat-heading {
          font-family: 'DM Serif Display', Georgia, serif;
          font-size: clamp(1.7rem, 3.5vw, 2.8rem);
          font-weight: 400; line-height: 1.15;
          color: #1c1712;
          text-align: center;
          margin-bottom: clamp(36px, 5vw, 64px);
          letter-spacing: -0.01em;
        }

        /* ── scroll track ── */
        .cat-track {
          display: flex;
          gap: clamp(16px, 3vw, 36px);
          overflow-x: auto;
          padding-bottom: 16px;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
          cursor: grab;
          user-select: none;
        }
        .cat-track::-webkit-scrollbar { display: none; }
        .cat-track:active { cursor: grabbing; }

        /* center on large screens */
        @media (min-width: 900px) {
          .cat-track {
            justify-content: center;
            overflow-x: visible;
            flex-wrap: wrap;
            cursor: default;
          }
        }

        /* ── card ── */
        .cat-card {
          flex: 0 0 auto;
          scroll-snap-align: start;
          display: flex; flex-direction: column; align-items: center;
          gap: 14px;
          cursor: pointer;
          min-width: clamp(88px, 18vw, 128px);
        }

        /* ring + image */
        .cat-ring {
          position: relative;
          width: clamp(80px, 16vw, 120px);
          height: clamp(80px, 16vw, 120px);
          border-radius: 50%;
          padding: 3px;
          background: #e9e4dc;
          transition: background 0.4s, transform 0.35s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.35s;
          box-shadow: 0 2px 12px rgba(0,0,0,0.06);
        }
        .cat-card:hover .cat-ring,
        .cat-card.active .cat-ring {
          background: conic-gradient(#b07d4a, #e0c08a, #b07d4a);
          transform: translateY(-6px) scale(1.05);
          box-shadow: 0 16px 40px rgba(176,125,74,0.22);
        }

        .cat-ring-inner {
          width: 100%; height: 100%;
          border-radius: 50%; overflow: hidden;
          background: #f0ebe3;
          border: 2.5px solid #faf9f7;
        }
        .cat-ring-inner img {
          width: 100%; height: 100%;
          object-fit: cover;
          transition: transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94);
        }
        .cat-card:hover .cat-ring-inner img,
        .cat-card.active .cat-ring-inner img {
          transform: scale(1.12);
        }

        /* active dot indicator */
        .cat-ring::after {
          content: '';
          position: absolute; bottom: -2px; left: 50%; transform: translateX(-50%);
          width: 6px; height: 6px; border-radius: 50%;
          background: #b07d4a;
          opacity: 0; transition: opacity 0.3s;
        }
        .cat-card.active .cat-ring::after { opacity: 1; }

        /* label */
        .cat-label {
          font-family: 'Outfit', sans-serif;
          font-size: clamp(12px, 1.3vw, 14px);
          font-weight: 500;
          color: #5a4a3a;
          letter-spacing: 0.02em;
          text-align: center;
          transition: color 0.3s;
          white-space: nowrap;
        }
        .cat-card:hover .cat-label,
        .cat-card.active .cat-label { color: #b07d4a; }

        /* skeleton */
        .cat-skeleton-ring {
          width: clamp(80px, 16vw, 120px);
          height: clamp(80px, 16vw, 120px);
          border-radius: 50%;
          background: linear-gradient(90deg, #ede8e0 25%, #e0dbd2 50%, #ede8e0 75%);
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
        }
        .cat-skeleton-label {
          height: 12px; width: 60px; border-radius: 6px;
          background: linear-gradient(90deg, #ede8e0 25%, #e0dbd2 50%, #ede8e0 75%);
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
        }
        @keyframes shimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        /* staggered entry */
        .cat-card { animation: cardIn 0.5s cubic-bezier(0.25,0.46,0.45,0.94) both; }
        @keyframes cardIn { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }

        /* bottom count bar */
        .cat-meta {
          display: flex; align-items: center; justify-content: center;
          gap: 8px; margin-top: clamp(28px, 4vw, 48px);
          font-family: 'Outfit', sans-serif;
          font-size: 12px; font-weight: 400;
          color: rgba(28,23,18,0.35);
          letter-spacing: 0.05em;
        }
        .cat-meta span {
          display: inline-block; width: 4px; height: 4px;
          border-radius: 50%; background: currentColor;
        }
      `}</style>

      <section className="cat-section">
        <div className="cat-inner">
          <em className="cat-eyebrow">Browse by Category</em>
          <h2 className="cat-heading">What are you shopping for today?</h2>

          {/* Track */}
          <div className="cat-track" ref={scrollRef}>
            {isLoading
              ? [...Array(6)].map((_, i) => (
                  <div key={i} className="cat-card" style={{ animationDelay: `${i * 0.07}s` }}>
                    <div className="cat-skeleton-ring" />
                    <div className="cat-skeleton-label" />
                  </div>
                ))
              : categories?.map((cat: any, i: number) => (
                  <div
                    key={cat._id}
                    className={`cat-card${active === cat._id ? ' active' : ''}`}
                    style={{ animationDelay: `${i * 0.07}s` }}
                    onClick={() => setActive(active === cat._id ? null : cat._id)}
                  >
                    <div className="cat-ring">
                      <div className="cat-ring-inner">
                        <img src={cat.image} alt={cat.name} draggable={false} />
                      </div>
                    </div>
                    <p className="cat-label">{cat.name}</p>
                  </div>
                ))}
          </div>

          {/* Meta footer */}
          {!isLoading && (
            <p className="cat-meta">
              {categories?.length} categories available
              <span />
            </p>
          )}
        </div>
      </section>
    </>
  );
};

export default ShopCategorySection;
