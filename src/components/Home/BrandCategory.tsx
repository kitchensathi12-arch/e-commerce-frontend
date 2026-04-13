import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Download } from 'lucide-react';

import { getActiveBrands } from '@/services/BrandServices';
import type { IBrandDocument } from '@kitchensathi12-arch/ecommerce-types';

/* ─────────────────────────────────────────────
   Add to your global CSS / tailwind config:

   @keyframes fastScroll {
     0%   { transform: translateX(0); }
     100% { transform: translateX(-50%); }
   }
   .animate-fastScroll {
     animation: fastScroll 28s linear infinite;
   }
   .scrollbar-hide::-webkit-scrollbar { display: none; }
   .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
───────────────────────────────────────────── */

/* ── Fixed certificate download handler ── */
const handleCertificateDownload = async (e: React.MouseEvent<HTMLButtonElement>, certificateUrl: string, brandName?: string) => {
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
const BrandCard = ({ brand, index, navigate }: { brand: IBrandDocument; index: number; navigate: (path: string) => void }) => (
  <div
    key={brand._id?.toString() || index}
    onClick={() => brand.slug && navigate(`/brand/${brand.slug}`)}
    className="
      group relative
      min-w-[220px] md:min-w-[260px]
      bg-white rounded-3xl
      shadow-sm hover:shadow-2xl
      transition-all duration-500 ease-out
      p-8 flex flex-col items-center justify-center
      cursor-pointer
      border border-transparent hover:border-[#1a1208]/5
    "
  >
    {/* Certificate Download Button */}
    {brand.certificate && (
      <button
        type="button"
        onClick={(e) => handleCertificateDownload(e, brand.certificate!, brand.brand_name)}
        title="Download Certificate"
        className="
          absolute top-5 right-5
          flex items-center gap-1.5
          bg-white hover:bg-[#1a1208]
          text-[#1a1208] hover:text-white
          p-2.5 rounded-2xl shadow-md
          opacity-100 md:opacity-0 md:group-hover:opacity-100
          transition-all duration-300
          z-10 cursor-pointer
          text-[10px] sm:text-xs font-medium tracking-wide
        "
      >
        <Download size={14} strokeWidth={2.2} />
        <span className="hidden sm:inline pr-0.5">Cert</span>
      </button>
    )}

    {/* Brand Logo */}
    {brand.brand_logo ? (
      <div className="h-20 md:h-24 flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-105">
        <img src={brand.brand_logo} alt={brand.brand_name || 'brand'} className="max-h-full max-w-[180px] object-contain" loading="lazy" />
      </div>
    ) : (
      <div className="h-20 md:h-24 flex items-center justify-center mb-6">
        <span className="text-3xl font-bold text-[#1a1208]/20 tracking-tighter select-none">{brand.brand_name?.slice(0, 2).toUpperCase()}</span>
      </div>
    )}

    {/* Brand Name */}
    <h3 className="font-medium text-[#1a1208] text-base md:text-lg tracking-tight text-center leading-tight">{brand.brand_name}</h3>

    {/* Animated underline */}
    <div className="h-px w-8 bg-[#1a1208]/20 mt-4 transition-all duration-300 group-hover:w-12 group-hover:bg-[#1a1208]/40" />
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
    <section className="w-screen relative left-1/2 -translate-x-1/2 bg-[#f8f6f2] py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* ── Centered Section Heading ── */}
        <div className="flex flex-col items-center text-center mb-12">
          <span className="uppercase tracking-[0.125em] text-xs font-medium text-[#1a1208]/60 mb-2">DISCOVER PREMIUM LABELS</span>
          <h2 className="text-4xl md:text-5xl font-semibold text-[#1a1208] tracking-tight">Shop by Brand</h2>
          <div className="w-16 h-px bg-[#1a1208]/20 mt-6" />
        </div>

        {/* ── Skeleton ── */}
        {isLoading ? (
          <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="min-w-[220px] h-40 bg-white rounded-3xl shadow-sm animate-pulse" />
            ))}
          </div>
        ) : (
          /* ── ALWAYS MARQUEE — pauses on hover ── */
          <div className="relative w-full overflow-hidden" onMouseEnter={pauseSlider} onMouseLeave={resumeSlider}>
            {/* Left fade */}
            <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#f8f6f2] to-transparent z-10 pointer-events-none" />
            {/* Right fade */}
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#f8f6f2] to-transparent z-10 pointer-events-none" />

            <div ref={sliderRef} className="flex w-max animate-fastScroll gap-6 md:gap-8 py-4">
              {/* Duplicate for seamless infinite loop */}
              {[...(brands ?? []), ...(brands ?? [])].map((brand, index) => (
                <BrandCard key={`${brand._id?.toString()}-${index}`} brand={brand} index={index} navigate={navigate} />
              ))}
            </div>
          </div>
        )}

        {/* ── Stats strip ── */}
        {!isLoading && brands && brands.length > 0 && (
          <div
            className="
            flex flex-row items-center justify-center
            gap-6 sm:gap-10 lg:gap-16
            border-t border-[#1a1208]/10 mt-14 pt-10
          "
          >
            {[
              { value: `${brands.length}+`, label: 'Premium Brands' },
              { value: '100%', label: 'Authenticated' },
              { value: 'Free', label: 'Returns' },
            ].map(({ value, label }) => (
              <div key={label} className="flex flex-col items-center gap-1 sm:gap-1.5">
                <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#1a1208] tracking-tight">{value}</span>
                <span className="text-[10px] sm:text-xs lg:text-sm text-[#9a876a] uppercase tracking-widest font-medium">{label}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default BrandSlider;
