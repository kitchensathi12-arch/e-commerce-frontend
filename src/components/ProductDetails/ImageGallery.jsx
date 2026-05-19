import { useState } from 'react';

export function ImageGallery({ images = [] }) {
  const [selectedIdx, setSelectedIdx] = useState(0);

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image */}
      <div className="relative rounded-3xl flex items-center justify-center h-[420px] border border-[#F0E8D4] overflow-hidden group">
        <span className="text-[120px] transition-transform duration-300 group-hover:scale-110">
          <img src={images[selectedIdx]?.image_url} className="size-full" />
        </span>

        {/* Zoom hint */}
        <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm rounded-full px-3 py-1.5 text-xs text-[#6B5B45] font-medium opacity-0 group-hover:opacity-100 transition-opacity">
          🔍 Hover to zoom
        </div>

        {/* Nav arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={() => setSelectedIdx((prev) => (prev - 1 + images.length) % images.length)}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-md text-[#5C3A1E] border-none cursor-pointer transition-all hover:scale-110"
            >
              <svg
                width={16}
                height={16}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                className="rotate-180"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6" />
              </svg>
            </button>
            <button
              onClick={() => setSelectedIdx((prev) => (prev + 1) % images.length)}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-md text-[#5C3A1E] border-none cursor-pointer transition-all hover:scale-110"
            >
              <svg
                width={16}
                height={16}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      <div className="flex gap-3">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setSelectedIdx(i)}
            className={`w-20 h-20 rounded-2xl bg-gradient-to-br from-[#F5ECD7] to-[#E8D5B0] flex items-center justify-center text-3xl cursor-pointer border-none transition-all hover:scale-105 overflow-hidden
              ${
                selectedIdx === i
                  ? 'ring-2 ring-[#D4860B] ring-offset-2 shadow-md'
                  : 'opacity-60 hover:opacity-100'
              }`}
          >
            <img src={img?.image_url} className="size-full" />
          </button>
        ))}
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center gap-1.5">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setSelectedIdx(i)}
            className={`rounded-full border-none cursor-pointer transition-all
              ${selectedIdx === i ? 'bg-[#D4860B] w-5 h-2' : 'bg-[#E8DDD0] w-2 h-2'}`}
          />
        ))}
      </div>
    </div>
  );
}
