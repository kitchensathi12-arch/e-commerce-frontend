import { getAllBrands, type BrandListResponse } from "@/services/BrandServices";
import type { IBrandDocument } from "@kitchensathi12-arch/ecommerce-types";
import { useQuery } from "@tanstack/react-query";




const VerifiedBrands = () => {
  const { data, isLoading } = useQuery<BrandListResponse>({
    queryKey: ['brands'],
    queryFn: () => getAllBrands({ page: 1, limit: 100 }),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }


  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-8">
        All Brands
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data?.data?.map((brand:IBrandDocument) => (
          <div
            key={brand._id.toString()}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 p-5 flex flex-col items-center text-center"
          >
            {/* Logo */}
            <img
              src={brand.brand_logo}
              alt={brand.brand_name}
              className="w-24 h-24 object-contain mb-4"
            />

            {/* Name */}
            <h2 className="text-xl font-semibold">
              {brand.brand_name}
            </h2>

            {/* Description */}
            <p className="text-gray-500 text-sm mt-2">
              {brand.description}
            </p>

            {/* Authorized Badge */}
            {brand.authorized && (
              <span className="mt-3 px-3 py-1 text-xs bg-green-100 text-green-600 rounded-full">
                Authorized ✔
              </span>
            )}

            {/* Certificate */}
            <a
              href={brand.certificate}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 text-blue-500 text-sm underline"
            >
              View Certificate
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VerifiedBrands;