

const CategoryCardsLoaders = () => {
  return (
    <section className="py-20 px-6 bg-off-white">

      <div className="max-w-7xl mx-auto">

        {/* Heading Skeleton */}
        <div className="text-center mb-12 animate-pulse">
          <div className="h-6 w-40 bg-amber-pale rounded-full mx-auto mb-4" />
          <div className="h-10 w-72 bg-gray-200 rounded mx-auto" />
        </div>

        {/* Category Skeleton Grid */}
        <div className="grid grid-cols-[repeat(auto-fit,minmax(110px,1fr))] gap-6">

          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-[20px] p-7 text-center border border-[#F0E8D4] animate-pulse"
            >

              {/* Image Skeleton */}
              <div className="flex items-center justify-center mb-3">
                <div className="h-28 w-28 rounded-xl bg-gray-200" />
              </div>

              {/* Text Skeleton */}
              <div className="h-4 w-24 bg-gray-200 rounded mx-auto" />

            </div>
          ))}

        </div>
      </div>

    </section>
  )
}

export default CategoryCardsLoaders