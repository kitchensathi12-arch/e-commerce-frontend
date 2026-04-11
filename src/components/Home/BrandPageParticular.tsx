import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Download } from "lucide-react";

import { getAllBrands } from "@/services/BrandServices";
import type { IBrandDocument } from "@kitchensathi12-arch/ecommerce-types";

const BrandProductsPage = () => {
  const { slug } = useParams<{ slug: string }>();

  const { data, isLoading } = useQuery({
    queryKey: ["brands-list"],
    queryFn: () => getAllBrands({ page: 1, limit: 50 }),
  });

  // ✅ extract brands safely
  const brands: IBrandDocument[] = data?.data || [];

  // ✅ find selected brand
  const selectedBrand = brands.find(
    (b) => b.slug === slug
  );

  return (
    <section className="py-16 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">

        {/* 🔥 BRAND HEADER */}
        {isLoading ? (
          <div className="h-40 bg-gray-200 animate-pulse rounded-2xl" />
        ) : selectedBrand ? (
          <div className="flex flex-col items-center text-center mb-12">

            <div className="group relative bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition">

              {/* ✅ Certificate Download */}
              {selectedBrand.certificate && (
                <a
                  href={selectedBrand.certificate}
                  download
                  onClick={(e) => e.stopPropagation()}
                  className="
                    absolute top-3 right-3
                    bg-white p-2 rounded-full shadow-md
                    opacity-100 md:opacity-0 md:group-hover:opacity-100
                  "
                >
                  <Download size={16} />
                </a>
              )}

              {/* Logo */}
              {selectedBrand.brand_logo && (
                <img
                  src={selectedBrand.brand_logo}
                  alt={selectedBrand.brand_name || "brand"}
                  className="h-20 object-contain mx-auto mb-4"
                />
              )}

              {/* Name */}
              <h1 className="text-2xl md:text-3xl font-bold">
                {selectedBrand.brand_name}
              </h1>

              {/* Description */}
              {selectedBrand.description && (
                <p className="text-gray-500 mt-2 max-w-xl">
                  {selectedBrand.description}
                </p>
              )}

            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500">
            Brand not found
          </p>
        )}

        {/* 🔥 PRODUCTS SECTION (placeholder) */}
        <div>
          <h2 className="text-xl md:text-2xl font-bold mb-6">
            Products
          </h2>

          {/* 🚧 Until API comes */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">

            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-4 shadow-sm animate-pulse"
              >
                <div className="h-32 bg-gray-200 rounded mb-3" />
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
              </div>
            ))}

          </div>
        </div>

      </div>
    </section>
  );
};

export default BrandProductsPage;