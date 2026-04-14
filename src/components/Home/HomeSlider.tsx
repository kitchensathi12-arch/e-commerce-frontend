/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getActiveBanners } from '@/services/BannerServices';

const HomeSlider = () => {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [, setProgress] = useState(0);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ['active-banners'],
    queryFn: getActiveBanners,
  });

  const slides = data?.data || [];

  const goTo = useCallback(
    (index: number) => {
      if (isTransitioning || index === current || !slides.length) return;
      setPrev(current);
      setIsTransitioning(true);
      setCurrent(index);
      setProgress(0);
      setTimeout(() => {
        setPrev(null);
        setIsTransitioning(false);
      }, 950);
    },
    [current, isTransitioning, slides.length]
  );

  const goNext = useCallback(() => {
    if (!slides.length) return;
    goTo((current + 1) % slides.length);
  }, [current, slides.length, goTo]);

  const goPrev = useCallback(() => {
    if (!slides.length) return;
    goTo((current - 1 + slides.length) % slides.length);
  }, [current, slides.length, goTo]);

  // Auto-slide + Progress
  useEffect(() => {
    if (!slides.length || isPaused) return;

    const DURATION = 5500;
    const TICK = 50;

    progressRef.current = setInterval(() => {
      setProgress((p) => (p >= 100 ? 0 : p + (TICK / DURATION) * 100));
    }, TICK);

    intervalRef.current = setInterval(goNext, DURATION);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, [slides.length, isPaused, goNext]);

  // Keyboard Navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [goNext, goPrev]);

  if (isLoading) {
    return (
      <section className="relative w-full flex items-center justify-center bg-[#f8f5f0]" style={{ height: 'min(87vh, 720px)', minHeight: '500px' }}>
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-[#1a1208]/10 border-t-[#1a1208] rounded-full animate-spin" />
          <p className="text-xs tracking-[0.3em] uppercase text-[#1a1208]/40 font-medium">Loading premium collection...</p>
        </div>
      </section>
    );
  }

  if (!slides.length) return null;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Inter:wght@400;500;600&display=swap');

        .sl-root {
          position: relative;
          width: 100%;
          height: min(90vh, 780px);
          min-height: 560px;
          overflow: hidden;
          background: #111;
        }

        .sl-bgs-wrapper {
          position: absolute;
          inset: 0;
          z-index: 1;
        }

        .sl-bg {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          background-attachment: fixed;
        }

        .sl-bg-in {
          animation: slIn 1.05s cubic-bezier(0.77, 0, 0.175, 1) forwards;
        }
        .sl-bg-out {
          animation: slOut 0.95s ease forwards;
        }

        @keyframes slIn {
          from { opacity: 0; transform: scale(1.06); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes slOut {
          from { opacity: 1; }
          to   { opacity: 0; }
        }

        .sl-content {
          position: absolute;
          inset: 0;
          z-index: 10;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: clamp(40px, 6vw, 90px) clamp(30px, 7vw, 110px);
          background: linear-gradient(
            to top,
            rgba(17,17,17,0.92) 25%,
            rgba(17,17,17,0.65) 55%,
            transparent 80%
          );
        }

        .sl-tag {
          font-family: 'Inter', sans-serif;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: #f4a261;
          border-bottom: 2px solid #f4a261;
          padding-bottom: 6px;
          display: inline-block;
          margin-bottom: 16px;
        }

        .sl-title {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: clamp(2.6rem, 6.5vw, 5rem);
          font-weight: 700;
          line-height: 1.05;
          color: #ffffff;
          margin-bottom: 20px;
          letter-spacing: -0.025em;
        }

        .sl-subtitle {
          font-family: 'Inter', sans-serif;
          font-size: clamp(1rem, 1.8vw, 1.2rem);
          font-weight: 400;
          color: rgba(255, 255, 255, 0.88);
          line-height: 1.7;
          max-width: 560px;
          margin-bottom: 34px;
        }

        .sl-cta {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 16px 40px;
          background: #ffffff;
          color: #1f2937;
          border: none;
          border-radius: 9999px;
          font-family: 'Inter', sans-serif;
          font-size: 15px;
          font-weight: 600;
          letter-spacing: 0.06em;
          cursor: pointer;
          transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 8px 25px rgba(255,255,255,0.25);
        }

        .sl-cta:hover {
          transform: translateY(-3px);
          box-shadow: 0 16px 35px rgba(255,255,255,0.35);
        }

        .sl-controls {
          position: absolute;
          bottom: 42px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          align-items: center;
          gap: 14px;
          z-index: 20;
        }

        .sl-dot {
          height: 4px;
          background: rgba(255,255,255,0.4);
          border-radius: 999px;
          cursor: pointer;
          transition: all 0.4s ease;
        }

        .sl-dot.active {
          background: #f4a261;
          box-shadow: 0 0 8px rgba(244, 162, 97, 0.6);
        }

        /* Responsive Layout Split for Full Uncropped Image */
        @media (max-width: 768px) {
          .sl-root {
            height: auto !important; 
            min-height: auto !important;
            max-height: none !important;
            display: flex;
            flex-direction: column;
            background: #111;
          }

          .sl-bgs-wrapper {
            position: relative;
            width: 100%;
            aspect-ratio: 16 / 9;
            background: #000;
          }
          
          .sl-bg {
            background-size: contain !important; /* Uncropped Full View */
            background-repeat: no-repeat !important;
            background-attachment: scroll !important; 
            background-position: center !important;
          }

          .sl-content {
            position: relative !important;
            inset: auto !important;
            padding: 30px 24px 70px !important; 
            background: #151515 !important;
            flex-grow: 1;
          }

          .sl-title {
            font-size: 2.3rem !important;
            margin-bottom: 12px;
            line-height: 1.1;
          }

          .sl-subtitle {
            font-size: 0.95rem !important;
            margin-bottom: 24px;
          }
          
          .sl-cta {
            width: 100%;
            justify-content: center;
            padding: 16px 20px;
          }

          .sl-controls {
            bottom: 24px !important;
          }
        }
      `}</style>

      <section className="sl-root" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)} onTouchStart={() => setIsPaused(true)} onTouchEnd={() => setIsPaused(false)}>
        {/* Background Images */}
        <div className="sl-bgs-wrapper">
          {slides.map((slide: any, i: number) => (
            <div key={i}>
              {prev === i && <div className="sl-bg sl-bg-out" style={{ backgroundImage: `url(${slide.image})` }} />}
              {current === i && <div className={`sl-bg ${isTransitioning ? 'sl-bg-in' : ''}`} style={{ backgroundImage: `url(${slide.image})` }} />}
            </div>
          ))}
        </div>

        {/* Content */}
        <div className="sl-content">
          {slides[current]?.tag && <div className="sl-tag">{slides[current].tag}</div>}

          <h1 className="sl-title">{slides[current]?.title || ''}</h1>

          {slides[current]?.subtitle && <p className="sl-subtitle">{slides[current].subtitle}</p>}

          {slides[current]?.buttonText && (
            <button
              type="button"
              className="sl-cta"
              onClick={() => {
                if (slides[current].redirectUrl) {
                  window.location.href = slides[current].redirectUrl;
                }
              }}
            >
              {slides[current].buttonText}
              <span style={{ fontSize: '18px', lineHeight: 1 }}>→</span>
            </button>
          )}
        </div>

        {/* Bottom Controls */}
        <div className="sl-controls">
          {slides.map((_: any, i: number) => (
            <button
              key={i}
              className={`sl-dot ${i === current ? 'active' : ''}`}
              style={{
                width: i === current ? '64px' : '28px',
              }}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </section>
    </>
  );
};

export default HomeSlider;
