import { keepPreviousData, useQuery } from '@tanstack/react-query';

// ----------- local import start here --------------
import { getActiveCategories } from '@/service/category.service';
import CategoryCardsLoaders from '@/Loaders/CategoryCardsLoaders';

const CategoriesCard = () => {
  // ---------------- tanstack query start here ---------------
  const { data: categories, isLoading: isCategoryLoading } = useQuery({
    queryKey: ['public-categories'],
    queryFn: () => getActiveCategories(),
    placeholderData: keepPreviousData,
  });

  if (isCategoryLoading) {
    return <CategoryCardsLoaders />;
  }

  return (
    <section className="py-10 px-6 bg-off-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-start">
          <div className="tag mb-3">Browse By Category</div>
          <h2 className="font-playfair text-[36px] font-bold text-brown">Shop What You Need</h2>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(110px,1fr))] gap-6">
          {categories.map((cat) => (
            <div
              key={cat._id}
              // onClick={() => setPage("products")}
              className="card-lift bg-white rounded-[20px] p-7 text-center cursor-pointer border border-[#F0E8D4]"
            >
              <div className="text-[44px] mb-3 flex-center ">
                <img src={cat?.image} alt={cat.slug} className="h-28" />
              </div>
              <div className="text-[14px] font-semibold text-brown mb-1">{cat?.name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesCard;
