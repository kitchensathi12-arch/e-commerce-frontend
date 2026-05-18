import { useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

const banners = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1570222094114-d054a817e56b?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1586208958839-06c17cacdf08?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1600&q=80",
  },
];

export default function EcommerceBannerSlider() {
  const [current, setCurrent] = useState(0);

  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    slides: {
      perView: 1,
    },

    created(slider) {
      setInterval(() => {
        slider.next();
      }, 4000);
    },

    slideChanged(slider) {
      setCurrent(slider.track.details.rel);
    },
  });

  return (
    <div className="relative w-full overflow-hidden">
      {/* Slider */}
      <div ref={sliderRef} className="keen-slider">
        {banners.map((banner) => (
          <div
            key={banner.id}
            className="keen-slider__slide h-[220px] sm:h-[300px] md:h-[480px] w-full"
          >
            <img
              src={banner.image}
              alt={`banner-${banner.id}`}
              className="h-full w-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Prev Button */}
      <button
        onClick={() => instanceRef.current?.prev()}
        className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition hover:bg-black/60"
      >
        ‹
      </button>

      {/* Next Button */}
      <button
        onClick={() => instanceRef.current?.next()}
        className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition hover:bg-black/60"
      >
        ›
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {banners.map((_, idx) => (
          <button
            key={idx}
            onClick={() => instanceRef.current?.moveToIdx(idx)}
            className={`h-2 rounded-full transition-all duration-300 ${
              current === idx
                ? "w-8 bg-white"
                : "w-2 bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}