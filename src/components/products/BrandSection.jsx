import { useNavigate } from 'react-router-dom';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { Download } from 'lucide-react';

// ── Brand data — all using same local image /brands/brand.jpg ──
const DUMMY_BRANDS = [
  { _id: '1',  brand_name: 'Philips',         slug: 'philips',         certificate: null, brand_logo: '/brands/brand.jpg' },
  { _id: '2',  brand_name: 'Prestige',        slug: 'prestige',        certificate: null, brand_logo: '/brands/brand1.jpg' },
  { _id: '3',  brand_name: 'Bajaj',           slug: 'bajaj',           certificate: null, brand_logo: '/brands/brand2.jpg' },
  { _id: '4',  brand_name: 'Bosch',           slug: 'bosch',           certificate: null, brand_logo: '/brands/brand3.jpg' },
  { _id: '5',  brand_name: 'Butterfly',       slug: 'butterfly',       certificate: null, brand_logo: '/brands/brand5.jpg' },
  { _id: '6',  brand_name: 'Havells',         slug: 'havells',         certificate: null, brand_logo: '/brands/brand4.jpg' },
  { _id: '7',  brand_name: 'Tefal',           slug: 'tefal',           certificate: null, brand_logo: '/brands/brand6.jpg' },
  { _id: '8',  brand_name: 'Pigeon',          slug: 'pigeon',          certificate: null, brand_logo: '/brands/brand7.jpg' },
  { _id: '9',  brand_name: 'Morphy Richards', slug: 'morphy-richards', certificate: null, brand_logo: '/brands/brand8.jpg' },
  { _id: '10', brand_name: 'Usha',            slug: 'usha',            certificate: null, brand_logo: '/brands/brand9.jpg' },
];

// ── Injected styles ──
const SLIDER_STYLE = `
  @keyframes scrollLeft {
    0%   { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }

  .brand-track {
    animation: scrollLeft 32s linear infinite;
    will-change: transform;
  }

  .brand-slider-wrap:hover .brand-track {
    animation-play-state: paused;
  }

  /* Responsive card widths via CSS custom property */
  .brand-card {
    width: clamp(140px, 22vw, 220px);
    flex-shrink: 0;
  }

  .brand-logo-img {
    opacity: 0.85;
    transition: opacity 0.3s ease, transform 0.3s ease;
    object-fit: contain;
  }

  .brand-card:hover .brand-logo-img {
    opacity: 1;
    transform: scale(1.06);
  }
`;

// ── Certificate Download ──
const handleCertificateDownload = async (e, certificateUrl, brandName) => {
  e.stopPropagation();
  e.preventDefault();
  try {
    const res = await fetch(certificateUrl);
    if (!res.ok) throw new Error();
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${brandName ?? 'brand'}-certificate`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } catch {
    window.open(certificateUrl, '_blank', 'noopener,noreferrer');
  }
};

// ── Brand Card ──
const BrandCard = ({ brand, navigate }) => (
  <div
    onClick={() => brand.slug && navigate(`/brand/${brand.slug}`)}
    className="
      brand-card group relative
      bg-brown/20 hover:bg-brown/40
      border border-amber/20 hover:border-amber/50
      rounded-2xl
      transition-all duration-300 ease-out
      p-4 sm:p-5 md:p-7
      flex flex-col items-center justify-center
      cursor-pointer
      hover:shadow-[0_8px_32px_rgba(212,134,11,0.18)]
      hover:-translate-y-1
    "
  >
    {/* Certificate button */}
    {brand.certificate && (
      <button
        type="button"
        onClick={(e) => handleCertificateDownload(e, brand.certificate, brand.brand_name)}
        title="Download Certificate"
        className="
          absolute top-3 right-3
          flex items-center gap-1
          bg-amber/20 hover:bg-amber-light
          text-amber-light hover:text-brown-dark
          p-1.5 rounded-xl
          opacity-100 md:opacity-0 md:group-hover:opacity-100
          transition-all duration-300
          z-10 cursor-pointer
          text-[10px] font-semibold tracking-wide
        "
      >
        <Download size={12} strokeWidth={2.2} />
        <span className="hidden sm:inline pr-0.5">Cert</span>
      </button>
    )}

    {/* Logo or initials */}
    <div className="h-12 sm:h-14 md:h-16 flex items-center justify-center mb-3 sm:mb-4 overflow-hidden">
      {brand.brand_logo ? (
        <img
          src={brand.brand_logo}
          alt={brand.brand_name || 'brand'}
          className="brand-logo-img max-h-full max-w-[110px] sm:max-w-[130px] md:max-w-[150px] object-contain"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
            // Show initials sibling on error
            const fallback = e.currentTarget.nextElementSibling;
            if (fallback) fallback.style.display = 'flex';
          }}
        />
      ) : null}
      {/* Initials fallback — hidden by default when logo exists */}
      <span
        className="font-playfair text-2xl sm:text-3xl font-bold text-amber-light/40 tracking-tighter select-none items-center justify-center"
        style={{ display: brand.brand_logo ? 'none' : 'flex' }}
      >
        {brand.brand_name?.slice(0, 2).toUpperCase()}
      </span>
    </div>

    {/* Brand name */}
    <h3 className="
      font-dm-sans font-medium
      text-white/60 group-hover:text-white
      text-xs sm:text-sm md:text-[15px]
      tracking-tight text-center leading-snug
      transition-colors duration-300
    ">
      {brand.brand_name}
    </h3>

    {/* Animated underline accent */}
    <div className="h-px w-5 bg-amber/40 mt-2 sm:mt-3 transition-all duration-300 group-hover:w-9 group-hover:bg-amber-light" />
  </div>
);

// ── Skeleton Card ──
const SkeletonCard = () => (
  <div className="brand-card flex-shrink-0 h-36 sm:h-40 md:h-44 bg-brown/20 border border-amber/10 rounded-2xl animate-pulse" />
);

// ── Main Component ──
const BrandSlider = () => {
  const navigate = useNavigate();

  const { data: brands, isLoading } = useQuery({
    queryKey: ['active-brands'],
    queryFn: () => Promise.resolve(DUMMY_BRANDS),
    placeholderData: keepPreviousData,
  });

  return (
    <>
      <style>{SLIDER_STYLE}</style>

      <section className="w-full bg-brown-dark py-12 sm:py-16 md:py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">

          {/* ── Heading ── */}
          <div className="flex flex-col items-center text-center mb-10 sm:mb-12 md:mb-14">
            <span className="tag mb-3 sm:mb-4 text-xs sm:text-sm">✦ Our Brand Partners</span>
            <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight mb-3 sm:mb-4">
              Shop by <span className="text-amber-light">Brand</span>
            </h2>
            <p className="text-white/50 text-sm sm:text-[15px] max-w-xs sm:max-w-md leading-relaxed font-dm-sans px-2">
              Discover premium kitchen brands — authenticated, trusted, and curated for the modern Indian kitchen.
            </p>
            <div className="w-14 h-px bg-amber/40 mt-4 sm:mt-6" />
          </div>

          {/* ── Slider ── */}
          {isLoading ? (
            <div className="flex gap-3 sm:gap-4 md:gap-5 overflow-hidden pb-4">
              {[1, 2, 3, 4, 5, 6].map((i) => <SkeletonCard key={i} />)}
            </div>
          ) : (
            <div className="brand-slider-wrap relative w-full overflow-hidden">
              {/* Fade edges — narrower on mobile */}
              <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-14 md:w-20 bg-gradient-to-r from-brown-dark to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-14 md:w-20 bg-gradient-to-l from-brown-dark to-transparent z-10 pointer-events-none" />

              <div
                className="brand-track flex gap-3 sm:gap-4 md:gap-5 lg:gap-6 py-3 sm:py-4"
                style={{ width: 'max-content' }}
              >
                {[...(brands ?? []), ...(brands ?? [])].map((brand, index) => (
                  <BrandCard
                    key={`${brand._id}-${index}`}
                    brand={brand}
                    navigate={navigate}
                  />
                ))}
              </div>
            </div>
          )}

          {/* ── Stats Strip ── */}
          {!isLoading && brands && brands.length > 0 && (
            <div className="
              flex flex-row items-center justify-center
              gap-6 sm:gap-12 md:gap-16 lg:gap-24
              border-t border-amber/15
              mt-10 sm:mt-12 md:mt-14
              pt-8 sm:pt-10
            ">
              {[
                { value: `${brands.length}+`, label: 'Premium Brands' },
                { value: '100%',              label: 'Authenticated'  },
                { value: 'Free',              label: 'Returns'        },
              ].map(({ value, label }) => (
                <div key={label} className="flex flex-col items-center gap-1 sm:gap-1.5">
                  <span className="font-playfair text-xl sm:text-2xl md:text-3xl font-bold text-amber-light tracking-tight">
                    {value}
                  </span>
                  <span className="text-[9px] sm:text-[10px] md:text-xs text-white/40 uppercase tracking-[0.12em] sm:tracking-[0.14em] font-medium">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          )}

        </div>
      </section>
    </>
  );
};

export default BrandSlider;