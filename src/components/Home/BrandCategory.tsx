import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Download } from 'lucide-react';

import { getActiveBrands } from '@/services/BrandServices';
import type { IBrandDocument } from '@kitchensathi12-arch/ecommerce-types';

/*
  Add to your global CSS:

  @keyframes fastScroll {
    0%   { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  .animate-fastScroll {
    animation: fastScroll 28s linear infinite;
  }
  .scrollbar-hide::-webkit-scrollbar { display: none; }
  .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
*/

const handleCertificateDownload = async (
  e: React.MouseEvent<HTMLButtonElement>,
  certificateUrl: string,
  brandName?: string
) => {
  e.stopPropagation();
  e.preventDefault();
  try {
    const response = await fetch(certificateUrl);
    if (!response.ok) throw new Error('Fetch failed');
    const blob = await response.blob();
    const objectUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = objectUrl;
    link.download = `${brandName ?? 'brand'}-certificate`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(objectUrl);
  } catch {
    window.open(certificateUrl, '_blank', 'noopener,noreferrer');
  }
};

/* ── Brand Card ── */
const BrandCard = ({
  brand,
  index,
  navigate,
}: {
  brand: IBrandDocument;
  index: number;
  navigate: (path: string) => void;
}) => (
  <div
    key={brand._id?.toString() || index}
    onClick={() => brand.slug && navigate(`/brand/${brand.slug}`)}
    className="
      group relative
      min-w-[200px] md:min-w-[240px]
      bg-white rounded-2xl
      border border-rose-100
      shadow-[0_2px_12px_rgba(192,57,43,0.06)]
      hover:shadow-[0_12px_36px_rgba(192,57,43,0.14)]
      hover:-translate-y-1.5
      transition-all duration-300 ease-out
      flex flex-col items-center justify-between
      cursor-pointer
      overflow-hidden
      min-h-[200px] md:min-h-[220px]
    "
  >
    {/* Subtle top accent line */}
    <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl bg-gradient-to-r from-red-300 via-rose-400 to-red-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

    {/* Decorative bg circle */}
    <div className="absolute -bottom-6 -right-6 h-24 w-24 rounded-full bg-rose-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

    {/* Certificate Download Button — top right, always visible on mobile, hover on desktop */}
    {brand.certificate && (
      <button
        type="button"
        onClick={(e) => handleCertificateDownload(e, brand.certificate!, brand.brand_name)}
        title="Download Certificate"
        className="
          absolute top-3 right-3
          flex items-center gap-1
          bg-rose-50 hover:bg-red-600
          text-red-500 hover:text-white
          px-2.5 py-1.5 rounded-xl
          border border-red-100 hover:border-red-600
          opacity-100 md:opacity-0 md:group-hover:opacity-100
          transition-all duration-300
          z-20 cursor-pointer
          text-[10px] font-semibold tracking-wide
          shadow-sm whitespace-nowrap
        "
      >
        <Download size={11} strokeWidth={2.5} />
        <span className="hidden sm:inline">Cert</span>
      </button>
    )}

    {/* Logo area — taller, centered, with top padding to avoid cert button overlap */}
    <div className="flex-1 w-full flex items-center justify-center pt-10 pb-4 px-6 relative z-10">
      {brand.brand_logo ? (
        <img
          src={brand.brand_logo}
          alt={brand.brand_name || 'brand'}
          className="
            max-h-20 md:max-h-24
            max-w-[160px] md:max-w-[180px]
            w-auto object-contain
            transition-transform duration-500 group-hover:scale-105
          "
          loading="lazy"
        />
      ) : (
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-rose-100 to-red-100 flex items-center justify-center border border-red-100">
          <span className="text-xl font-bold text-red-400 tracking-tighter select-none">
            {brand.brand_name?.slice(0, 2).toUpperCase()}
          </span>
        </div>
      )}
    </div>

    {/* Brand name + underline */}
    <div className="w-full flex flex-col items-center pb-5 px-4 relative z-10">
      <h3 className="font-semibold text-rose-950 text-sm md:text-base tracking-tight text-center leading-tight">
        {brand.brand_name}
      </h3>
      <div className="h-px w-6 bg-red-200 mt-2.5 transition-all duration-300 group-hover:w-10 group-hover:bg-red-400 rounded-full" />
    </div>
  </div>
);
/* ── Main Component ── */
const BrandSlider = () => {
  const navigate = useNavigate();
  const sliderRef = useRef<HTMLDivElement>(null);

  const { data: brands, isLoading } = useQuery<IBrandDocument[]>({
    queryKey: ['active-brands'],
    queryFn: getActiveBrands,
  });

  const pauseSlider = () => {
    if (sliderRef.current) sliderRef.current.style.animationPlayState = 'paused';
  };

  const resumeSlider = () => {
    if (sliderRef.current) sliderRef.current.style.animationPlayState = 'running';
  };

  return (
    <section className="w-screen relative left-1/2 -translate-x-1/2 py-16 md:py-20 lg:py-24 overflow-hidden bg-gradient-to-br from-rose-50 via-white to-red-50 mt-6 sm:mt-8 lg:mt-12">
      {/* Background decorative blobs */}
      <div className="pointer-events-none absolute -top-16 -right-16 h-64 w-64 rounded-full bg-red-100/30" />
      <div className="pointer-events-none absolute -bottom-12 -left-12 h-48 w-48 rounded-full bg-rose-100/25" />
      <div className="pointer-events-none absolute top-1/2 left-1/3 h-32 w-32 rounded-full bg-red-50/40" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ── Section Heading ── */}
        <div className="flex flex-col items-center text-center mb-10 md:mb-14">
          <span className="inline-block text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-red-400 mb-3 bg-red-50 border border-red-100 px-4 py-1.5 rounded-full">
            Discover Premium Labels
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-rose-950 tracking-tight">
            Shop by{' '}
            <span className="relative inline-block text-red-600 after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:rounded-full after:bg-red-300/60">
              Brand
            </span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-rose-400 max-w-xs sm:max-w-sm text-center leading-relaxed">
            Handpicked, authenticated brands you can trust
          </p>
          <div className="mt-5 h-px w-12 rounded-full bg-gradient-to-r from-red-300 to-rose-300" />
        </div>

        {/* ── Skeleton ── */}
        {isLoading ? (
          <div className="flex gap-4 md:gap-6 overflow-x-auto pb-4 scrollbar-hide">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="min-w-[200px] md:min-w-[240px] h-44 bg-white rounded-2xl border border-rose-100 animate-pulse shadow-sm"
              />
            ))}
          </div>
        ) : (
          /* ── Marquee ── */
          <div
            className="relative w-full overflow-hidden"
            onMouseEnter={pauseSlider}
            onMouseLeave={resumeSlider}
          >
            {/* Left fade */}
            <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-r from-rose-50 to-transparent z-10 pointer-events-none" />
            {/* Right fade */}
            <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-l from-red-50 to-transparent z-10 pointer-events-none" />

            <div
              ref={sliderRef}
              className="flex w-max animate-fastScroll gap-4 md:gap-6 py-4"
            >
              {[...(brands ?? []), ...(brands ?? [])].map((brand, index) => (
                <BrandCard
                  key={`${brand._id?.toString()}-${index}`}
                  brand={brand}
                  index={index}
                  navigate={navigate}
                />
              ))}
            </div>
          </div>
        )}

        {/* ── Stats strip ── */}
        {!isLoading && brands && brands.length > 0 && (
          <div className="mt-12 md:mt-16 pt-8 md:pt-10 border-t border-rose-100">
            <div className="flex flex-row items-center justify-center gap-8 sm:gap-12 lg:gap-20">
              {[
                { value: `${brands.length}+`, label: 'Premium Brands' },
                { value: '100%', label: 'Authenticated' },
                { value: 'Free', label: 'Returns' },
              ].map(({ value, label }) => (
                <div key={label} className="flex flex-col items-center gap-1.5 group">
                  <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-red-600 tracking-tight transition-transform duration-300 group-hover:scale-110">
                    {value}
                  </span>
                  <span className="text-[9px] sm:text-[10px] lg:text-xs text-rose-400 uppercase tracking-[0.18em] font-semibold">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default BrandSlider;