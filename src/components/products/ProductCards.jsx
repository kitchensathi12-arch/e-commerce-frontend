import { Stars } from '../Stars';
import { Heart } from 'lucide-react';
import Button from '@components/ui/Buttons';
import { getAllProducts } from '@/service/product.service';
import { useQuery } from '@tanstack/react-query';

export function ProductCard() {
  const { data: Products, isLoading: isProductsLoading } = useQuery({
    queryKey: ['products'],
    queryFn: () => getAllProducts({ page: 1, limit: 10 }),
  });

  if (isProductsLoading) {
    return <div>loading....</div>;
  }

  const productList = Array.isArray(Products?.data)
  ? Products.data
  : [];

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-3">
      {productList.map((item) => (
        <div key={item?._id || item?.id} className="card-lift bg-white rounded-[20px] overflow-hidden border border-[#F0E8D4] relative cursor-pointer flex flex-col">
          {/* IMAGE */}
          <div className="h-50 relative flex items-center justify-center">
            <img src={item?.product_images?.image_url} className="h-32 object-contain" />
          </div>

          <div className="px-4.5 pt-4.5 pb-5 flex flex-1 flex-col">
            <div className="text-[11px] text-text-muted font-semibold uppercase tracking-[0.8px] mb-1">
              {item?.category?.name}
            </div>

            <div className="font-semibold text-[15px] text-brown leading-[1.4] mb-2 cursor-pointer truncate">
              {item?.product_title}
            </div>

            <div className="flex items-center gap-1.5 mb-3">
              <Stars rating={4} />
              <span className="text-xs text-text-muted">1000+</span>
            </div>

            <div className="flex items-center gap-2 mb-4">
              <span className="font-playfair text-[22px] font-bold text-brown">
                ₹{item?.product_selling_price?.toLocaleString()}
              </span>

              <span className="text-[13px] text-steel-dark line-through">
                ₹{item?.product_mrp_price?.toLocaleString()}
              </span>

              <span className="text-xs font-bold text-green-700">
                {item?.product_discount?.toLocaleString()}% off
              </span>
            </div>

            <div className="flex gap-2 mt-auto">
              <Button className="btn-primary mt-auto flex-1 py-2.5 text-[13px] disabled:opacity-50">
                Add to Cart
              </Button>

              <button
                className={`w-10 h-10 border rounded-[10px] flex items-center justify-center shrink-0 transition ${'bg-white border-[#E8DDD0] text-steel-dark'}`}
              >
                <Heart />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
