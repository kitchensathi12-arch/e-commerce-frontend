/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getActiveCategories } from '@/services/CategoryServices';

const ShopCategorySection = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['active-categories'],
    queryFn: getActiveCategories,
  });

  const categories = Array.isArray(data) ? data : undefined;
  const scrollRef = useRef<HTMLDivElement>(null);

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
    const up = () => { isDown = false; };
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
    <div className="mt-6 sm:mt-8 lg:mt-12">
      {/* Section wrapper */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-rose-50 via-red-50 to-rose-100 border border-rose-100 px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-8">

        {/* Decorative blobs */}
        <div className="pointer-events-none absolute -top-10 -right-10 h-48 w-48 rounded-full bg-red-200/20" />
        <div className="pointer-events-none absolute -bottom-8 -left-6 h-32 w-32 rounded-full bg-rose-300/15" />
        <div className="pointer-events-none absolute top-6 right-32 h-16 w-16 rounded-full bg-red-300/10" />

        {/* Header */}
        <div className="relative z-10 mb-4 flex items-center justify-between sm:mb-5 lg:mb-6">
          <div className="flex flex-col gap-0.5">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-red-400">
              Picked for you
            </span>
            <p className="text-base font-bold text-rose-950 sm:text-lg lg:text-xl">
              <span className="relative inline-block text-red-600 after:absolute after:-bottom-0.5 after:left-0 after:h-0.5 after:w-full after:rounded-full after:bg-red-400/50">
                Hey
              </span>
              , looking for these categories?
            </p>
          </div>
        </div>

        {/* Scroll track */}
        <div
          ref={scrollRef}
          className="relative z-10 flex gap-3 overflow-x-auto pb-2 sm:gap-4 [cursor:grab] [&:active]:[cursor:grabbing] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden [-webkit-overflow-scrolling:touch] [scroll-snap-type:x_mandatory]"
        >
          {isLoading
            ? [...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 w-36 sm:w-44 lg:w-48 rounded-2xl overflow-hidden bg-white border border-red-50 shadow-sm [scroll-snap-align:start]"
                >
                  {/* skeleton image */}
                  <div className="w-full aspect-[1/1.1] animate-pulse bg-gradient-to-r from-red-100 via-rose-100 to-red-100 bg-[length:200%_100%]" />
                  {/* skeleton footer */}
                  <div className="p-3 flex flex-col gap-2">
                    <div className="h-3 w-full animate-pulse rounded-full bg-red-100" />
                    <div className="h-3 w-1/2 animate-pulse rounded-full bg-red-100" />
                  </div>
                </div>
              ))
            : categories?.map((cat: any) => (
                <div
                  key={cat._id}
                  className="group flex-shrink-0 w-36 sm:w-44 lg:w-48 rounded-2xl overflow-hidden bg-white border border-red-50 shadow-[0_3px_14px_rgba(192,57,43,0.07)] transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:-translate-y-2 hover:scale-[1.025] hover:shadow-[0_16px_40px_rgba(192,57,43,0.15)] cursor-pointer [scroll-snap-align:start]"
                >
                  {/* Image */}
                  <div className="relative w-full aspect-[1/1.1] bg-gradient-to-b from-rose-50 to-red-50 flex items-center justify-center overflow-hidden">
                    <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-rose-50/60 to-transparent z-10" />
                    <img
                      src={cat.image}
                      alt={cat.name}
                      draggable={false}
                      className="w-full h-full object-contain p-3 box-border transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-110 select-none"
                    />
                  </div>

                  {/* Footer */}
                  <div className="p-3 sm:p-3.5 flex flex-col gap-2 border-t border-rose-50 bg-white">
                    <p className="text-[12.5px] sm:text-sm font-600 text-rose-950 leading-snug line-clamp-2 min-h-[2.4rem] m-0">
                      {cat.name}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center rounded-full border border-red-100 bg-gradient-to-r from-rose-50 to-red-50 px-2.5 py-0.5 text-[10.5px] font-semibold text-red-600 tracking-wide">
                        Shop now
                      </span>
                      <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-red-400 to-red-600">
                        <svg
                          className="h-2.5 w-2.5 stroke-white"
                          viewBox="0 0 10 10"
                          fill="none"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="3,2 7,5 3,8" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default ShopCategorySection;