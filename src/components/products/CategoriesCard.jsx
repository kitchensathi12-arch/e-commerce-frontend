import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getActiveCategories } from '@/service/category.service';
import CategoryCardsLoaders from '@/Loaders/CategoryCardsLoaders';

const CategoriesCard = () => {
  const { data: categories, isLoading: isCategoryLoading } = useQuery({
    queryKey: ['public-categories'],
    queryFn: () => getActiveCategories(),
    placeholderData: keepPreviousData,
  });

  if (isCategoryLoading) {
    return <CategoryCardsLoaders />;
  }

  return (
    <section className="py-16 px-6 bg-off-white relative overflow-hidden">
      {/* Subtle background texture circles */}
      <div className="pointer-events-none absolute -top-16 -left-16 w-64 h-64 rounded-full bg-[#C17A2A]/5" />
      <div className="pointer-events-none absolute -bottom-20 -right-10 w-80 h-80 rounded-full bg-[#C17A2A]/5" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p
            className="text-xs tracking-[0.25em] uppercase font-semibold mb-3"
            style={{ color: '#C17A2A' }}
          >
            Browse By Category
          </p>
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-brown leading-tight">
            What are you shopping for today?
          </h2>
        </div>

        {/* Category circles grid */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-10">
          {categories.map((cat, index) => (
            <div
              key={cat._id}
              className="group flex flex-col items-center gap-3 cursor-pointer"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              {/* Circle image container */}
              <div
                className="relative w-28 h-28 md:w-32 md:h-32 rounded-full flex items-center justify-center
                  border-2 border-[#E8D5B0] bg-white shadow-md
                  transition-all duration-300 ease-out
                  group-hover:shadow-xl group-hover:scale-105 group-hover:border-[#C17A2A]"
              >
                {/* Inner warm ring on hover */}
                <div
                  className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background:
                      'radial-gradient(circle at 50% 50%, rgba(193,122,42,0.08) 0%, transparent 70%)',
                  }}
                />
                <img
                  src={cat?.image}
                  alt={cat.slug}
                  className="h-16 w-16 md:h-20 md:w-20 object-contain relative z-10
                    transition-transform duration-300 group-hover:scale-110 drop-shadow-md"
                />
              </div>

              {/* Label */}
              <span
                className="text-sm md:text-[15px] font-semibold text-brown text-center
                  transition-colors duration-200 group-hover:text-[#C17A2A]"
              >
                {cat?.name}
              </span>
            </div>
          ))}
        </div>

        {/* Footer count */}
        <div className="flex items-center justify-center gap-2 mt-10 text-xs text-[#9E8A6F] tracking-widest uppercase">
          <span>{categories.length} categories available</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#C17A2A] inline-block" />
        </div>
      </div>
    </section>
  );
};

export default CategoriesCard;