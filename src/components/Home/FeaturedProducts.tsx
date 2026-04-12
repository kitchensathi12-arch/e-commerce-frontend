import { useQuery } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import { getAllProducts } from '@/services/ProductServices';
import { ArrowRight, Eye, ShoppingCart, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { IProductListForWebsite } from '@kitchensathi12-arch/ecommerce-types';
import { addToCart } from '@/services/CartServices';
import { addToWishlist } from '@/services/Whislist';

const FeaturedProducts = () => {
  const navigate = useNavigate();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['web-products'],
    queryFn: getAllProducts,
  });

  const { mutate: handleAddToCart, isPending } = useMutation({
    mutationFn: addToCart,
    onSuccess: (res) => {
      console.log('Cart Success:', res);
    },
    onError: (err) => {
      console.log('Cart Error:', err);
    },
  });

  const { mutate: handleAddToWishlist, isPending: isWishlistPending } = useMutation({
    mutationFn: addToWishlist,
    onSuccess: (res) => {
      console.log('Wishlist Success:', res);
    },
    onError: (err) => {
      console.log('Wishlist Error:', err);
    },
  });

  return (
    <section className="w-full py-16 md:py-20 lg:py-24 bg-gradient-to-br from-rose-50 via-white to-red-50 overflow-hidden relative">
      <div className="w-full px-4 sm:px-6 lg:px-12 relative z-10">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 md:mb-14 gap-6">
          <div>
            <span className="inline-flex items-center gap-2 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-red-400 bg-red-50 border border-red-100 px-4 py-1.5 rounded-full mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
              Our Products
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-rose-950 tracking-tight leading-tight">
              Explore Our{' '}
              <span className="relative inline-block text-red-600 after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:rounded-full after:bg-red-300/60">
                Products
              </span>
            </h2>
            <p className="mt-3 text-sm text-rose-400 max-w-xs leading-relaxed">
              Handpicked quality products for your kitchen & home
            </p>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <button className="w-11 h-11 flex items-center justify-center border border-rose-200 bg-white rounded-full hover:bg-red-600 hover:border-red-600 hover:text-white text-rose-400 transition-all duration-200 shadow-sm">
              ←
            </button>
            <button className="w-11 h-11 flex items-center justify-center border border-rose-200 bg-white rounded-full hover:bg-red-600 hover:border-red-600 hover:text-white text-rose-400 transition-all duration-200 shadow-sm">
              →
            </button>
          </div>
        </div>

        {/* Loading */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6 lg:gap-8">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden border border-rose-100 shadow-sm animate-pulse">
                <div className="h-56 bg-gradient-to-br from-rose-100 to-red-50" />
                <div className="p-5 flex flex-col gap-3">
                  <div className="h-3.5 bg-rose-100 rounded-full w-3/4" />
                  <div className="h-3 bg-rose-50 rounded-full w-1/2" />
                  <div className="h-4 bg-rose-100 rounded-full w-1/3 mt-1" />
                </div>
              </div>
            ))}
          </div>
        ) : isError ? (
          <div className="text-center py-16">
            <div className="inline-flex flex-col items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center">
                <span className="text-2xl">⚠️</span>
              </div>
              <p className="text-red-500 font-medium">Failed to load products</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6 lg:gap-8">
            {data?.data?.map((product: IProductListForWebsite) => {
              const price = product.product_selling_price || 0;
              const mrp = product.product_mrp_price || price;
              const hasDiscount = mrp > price;
              const discountPct = hasDiscount ? Math.round(((mrp - price) / mrp) * 100) : 0;

              return (
                <div
                  key={product._id?.toString()}
                  className="group bg-white border border-rose-100 rounded-2xl overflow-hidden shadow-[0_2px_12px_rgba(192,57,43,0.06)] hover:shadow-[0_16px_40px_rgba(192,57,43,0.14)] hover:-translate-y-1.5 transition-all duration-300 cursor-pointer relative"
                  onClick={() =>
                    navigate(
                      `/product-detail/${product._id}?category=${product.category?._id}&brand=${product.brand?._id}`
                    )
                  }
                >
                  {/* Top accent line */}
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-red-300 via-rose-400 to-red-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />

                  {/* Discount badge */}
                  {hasDiscount && (
                    <div className="absolute top-3 left-3 z-10 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-lg tracking-wide">
                      -{discountPct}%
                    </div>
                  )}

                  {/* Image Container */}
                  <div className="relative h-56 md:h-60 bg-gradient-to-br from-rose-50 to-red-50 flex items-center justify-center p-6 overflow-hidden">
                    <img
                      src={product.product_images?.image_url || '/placeholder.jpg'}
                      alt={product.product_name}
                      className="w-full h-full object-contain group-hover:scale-108 transition-transform duration-500"
                    />

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-rose-950/50 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center gap-3">
                      <button
                        type="button"
                        onClick={() =>
                          navigate(
                            `/product-detail/${product._id}?category=${product.category?._id}&brand=${product.brand?._id}`
                          )
                        }
                        className="bg-white text-rose-950 px-5 py-2.5 rounded-full text-sm font-semibold flex items-center gap-2 shadow-lg hover:bg-rose-50 transition-all"
                      >
                        <Eye size={16} />
                        Quick View
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (!product._id) return;
                          handleAddToCart({
                            product_id: product._id.toString(),
                            qty: 1,
                            currency: 'INR',
                          });
                        }}
                        className="bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-full text-sm font-semibold flex items-center gap-2 shadow-lg transition-all w-40 justify-center"
                      >
                        <ShoppingCart size={15} />
                        {isPending ? 'Adding...' : 'Add to Cart'}
                      </button>
                    </div>

                    {/* Wishlist */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (!product._id) return;
                        handleAddToWishlist({ product_id: product._id.toString() });
                      }}
                      disabled={isWishlistPending}
                      className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-all hover:text-red-500 hover:scale-110 disabled:opacity-50 z-10"
                    >
                      <Heart size={15} />
                    </button>
                  </div>

                  {/* Product Info */}
                  <div className="p-4 md:p-5 border-t border-rose-50">
                    <h3 className="font-semibold text-rose-950 text-sm md:text-base leading-snug line-clamp-2 min-h-[44px]">
                      {product.product_name}
                    </h3>

                    <div className="flex items-center gap-1 mt-2.5 text-amber-400 text-sm">
                      ★★★★☆
                      <span className="text-xs text-rose-300 ml-1">(45)</span>
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-lg md:text-xl font-bold text-rose-950">
                          ₹{price.toLocaleString('en-IN')}
                        </span>
                        {hasDiscount && (
                          <span className="text-xs text-rose-300 line-through">
                            ₹{mrp.toLocaleString('en-IN')}
                          </span>
                        )}
                      </div>

                      {/* Mini add to cart */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (!product._id) return;
                          handleAddToCart({
                            product_id: product._id.toString(),
                            qty: 1,
                            currency: 'INR',
                          });
                        }}
                        className="w-8 h-8 rounded-full bg-red-50 border border-red-100 flex items-center justify-center text-red-500 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all duration-200 flex-shrink-0"
                      >
                        <ShoppingCart size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* View All Button */}
        <div className="flex justify-center mt-14 md:mt-16">
          <button
            onClick={() => navigate('/all-products')}
            className="group inline-flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white px-10 py-4 rounded-2xl font-semibold text-sm md:text-base transition-all duration-200 shadow-[0_4px_20px_rgba(192,57,43,0.3)] hover:shadow-[0_8px_28px_rgba(192,57,43,0.4)] hover:-translate-y-0.5"
          >
            View All Products
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-200" />
          </button>
        </div>

      </div>
    </section>
  );
};

export default FeaturedProducts;