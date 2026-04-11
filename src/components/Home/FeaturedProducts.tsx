import { useQuery } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { getAllProducts } from "@/services/ProductServices";
import { ArrowRight, Eye, ShoppingCart, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { IProductListForWebsite } from "@kitchensathi12-arch/ecommerce-types";
import { addToCart } from "@/services/CartServices";
import { addToWishlist } from "@/services/Whislist";

const FeaturedProducts = () => {
  const navigate = useNavigate();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["web-products"],
    queryFn: getAllProducts,
  });

  const { mutate: handleAddToCart, isPending } = useMutation({
    mutationFn: addToCart,
    onSuccess: (res) => {
      console.log("Cart Success:", res);
    },
    onError: (err) => {
      console.log("Cart Error:", err);
    },
  });

  const { mutate: handleAddToWishlist, isPending: isWishlistPending } = useMutation({
    mutationFn: addToWishlist,
    onSuccess: (res) => {
      console.log("Wishlist Success:", res);
    },
    onError: (err) => {
      console.log("Wishlist Error:", err);
    },
  });

  return (
    <section className="w-full py-20 bg-white overflow-hidden">
      <div className="w-full px-6 lg:px-12">

        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-3 h-6 bg-red-500 rounded"></div>
              <span className="text-red-500 text-sm font-semibold tracking-widest uppercase">
                Our Products
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-semibold text-gray-900">
              Explore Our Products
            </h2>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <button className="w-11 h-11 flex items-center justify-center border border-gray-300 rounded-full hover:bg-gray-50 transition-colors">←</button>
            <button className="w-11 h-11 flex items-center justify-center border border-gray-300 rounded-full hover:bg-gray-50 transition-colors">→</button>
          </div>
        </div>

        {/* Products Grid */}
        {isLoading ? (
          <div className="text-center py-16 text-gray-500">Loading products...</div>
        ) : isError ? (
          <div className="text-center py-16 text-red-500">Failed to load products</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {data?.data?.map((product: IProductListForWebsite) => {
              const price = product.product_selling_price || 0;
              const mrp = product.product_mrp_price || price;
              const hasDiscount = mrp > price;

              return (
                <div
                  key={product._id?.toString()}
                  className="group bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer"
                  onClick={() => navigate(`/product-detail/${product._id}?category=${product.category?._id}&brand=${product.brand?._id}`)}
                >
                  {/* Image Container */}
                  <div className="relative h-64 bg-gray-50 flex items-center justify-center p-8 overflow-hidden">
                    <img
                      src={product.product_images?.image_url || "/placeholder.jpg"}
                      alt={product.product_name}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center gap-4">
                      <button
                        type="button"
                        onClick={() => navigate(`/product-detail/${product._id}?category=${product.category?._id}&brand=${product.brand?._id}`)}
                        className="bg-white text-gray-900 px-6 py-3 rounded-full font-medium flex items-center gap-2 shadow-lg hover:bg-gray-100 transition-all"
                      >
                        <Eye size={20} />
                        View
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (!product._id) return;
                          handleAddToCart({
                            product_id: product._id.toString(),
                            qty: 1,
                            currency: "INR",
                          });
                        }}
                        className="bg-black text-white px-6 py-3 rounded-full font-medium flex items-center gap-2 shadow-lg hover:bg-gray-800 transition-all w-40"
                      >
                        <ShoppingCart size={18} />
                        {isPending ? "Adding..." : "Add To Cart"}
                      </button>
                    </div>

                    {/* Heart / Wishlist Icon */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (!product._id) return;
                        handleAddToWishlist({ product_id: product._id.toString() });
                      }}
                      disabled={isWishlistPending}
                      className="absolute top-4 right-4 w-9 h-9 bg-white rounded-full flex items-center justify-center shadow opacity-0 group-hover:opacity-100 transition-all hover:text-red-500 disabled:opacity-50"
                    >
                      <Heart size={18} />
                    </button>
                  </div>

                  {/* Product Info */}
                  <div className="p-5">
                    <h3 className="font-medium text-gray-900 text-base leading-tight line-clamp-2 min-h-[44px]">
                      {product.product_name}
                    </h3>
                    <div className="flex items-center gap-1 mt-3 text-amber-400 text-sm">
                      ★★★★☆
                      <span className="text-xs text-gray-400 ml-1">(45)</span>
                    </div>
                    <div className="mt-4 flex items-center gap-2">
                      <span className="text-xl font-semibold text-gray-900">
                        ₹{price.toLocaleString('en-IN')}
                      </span>
                      {hasDiscount && (
                        <span className="text-sm text-gray-400 line-through">
                          ₹{mrp.toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="flex justify-center mt-16">
          <button
            onClick={() => navigate('/all-products')}
            className="bg-red-500 hover:bg-red-600 text-white px-12 py-4 rounded-2xl font-medium flex items-center gap-3 transition-all"
          >
            View All Products
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;