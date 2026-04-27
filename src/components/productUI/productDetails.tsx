import type { ProductCardProps } from "@/types/productsTypes";
import { Stars } from "./Starts";
import { useNavigate } from "react-router-dom";


const badgeColors: Record<string, string> = {
  'Best Seller': 'bg-amber-100 text-amber-800',
  Hot: 'bg-red-100 text-red-800',
  New: 'bg-blue-100 text-blue-800',
  Sale: 'bg-green-100 text-green-800',
  Trending: 'bg-purple-100 text-purple-800',
  Premium: 'bg-red-100 text-red-800',
};

export const ProductCard = ({ product, view }: ProductCardProps) => {

  const navigate = useNavigate();

  const price = product.product_selling_price ?? 0;
  const mrp = product.product_mrp_price ?? price;
  const discount = mrp > price ? Math.round(((mrp - price) / mrp) * 100) : (product.product_discount ?? 0);
  const name = product.product_title ?? product.product_name ?? '';
  const stock = product.product_stock ?? 0;
  const rating = product.rating ?? 4.0;
  const reviews = product.reviews ?? 0;
  const badge = product.badge ?? (product.is_new_arrival ? 'New' : product.is_featured ? 'Best Seller' : '');
  const image = product?.product_images?.image_url
    ?? 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop';

  if (view === 'list') {
    return (
      <div onClick={()=>navigate(`/product-detail/${product._id}`)} className="bg-white border border-gray-100 rounded-2xl overflow-hidden flex gap-4 p-4 hover:border-red-200 hover:shadow-md transition-all group">
        <div className="relative w-28 h-28 flex-shrink-0 rounded-xl overflow-hidden bg-gray-50">
          <img src={image} alt={name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
          {badge && (
            <span className={`absolute top-1.5 left-1.5 text-[10px] font-semibold px-1.5 py-0.5 rounded-md ${badgeColors[badge] ?? 'bg-gray-100 text-gray-600'}`}>
              {badge}
            </span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-800 text-sm line-clamp-1">{name}</h3>
          <div className="flex items-center gap-2 mt-1">
            <Stars rating={rating} />
            <span className="text-xs text-gray-400">({reviews})</span>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-red-600 font-bold text-base">₹{price.toLocaleString()}</span>
            {mrp > price && <span className="text-gray-400 text-xs line-through">₹{mrp.toLocaleString()}</span>}
            {discount > 0 && <span className="text-green-600 text-xs font-medium">{discount}% off</span>}
          </div>
          <p className="text-xs text-gray-400 mt-1">Stock: {stock} units</p>
        </div>
        <div className="flex-shrink-0 flex items-center">
          <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm rounded-xl transition-colors">View</button>
        </div>
      </div>
    );
  }

  return (
    <div onClick={()=>navigate(`/product-detail/${product._id}`)} className="bg-white border border-gray-100 rounded-2xl overflow-hidden flex flex-col hover:border-red-200 hover:shadow-md transition-all group">
      <div className="relative h-48 overflow-hidden bg-gray-50">
        <img src={image} alt={name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        {badge && (
          <span className={`absolute top-3 left-3 text-[10px] font-semibold px-2 py-1 rounded-lg ${badgeColors[badge] ?? 'bg-gray-100 text-gray-600'}`}>
            {badge}
          </span>
        )}
        {discount > 0 && (
          <span className="absolute top-3 right-3 bg-white text-green-600 text-[10px] font-bold px-2 py-1 rounded-lg">{discount}% OFF</span>
        )}
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-semibold text-gray-800 text-sm line-clamp-2 flex-1">{name}</h3>
        <div className="flex items-center gap-1.5 mt-2">
          <Stars rating={rating} />
          <span className="text-xs text-gray-400">({reviews})</span>
        </div>
        <div className="mt-2 flex items-center gap-2">
          <span className="text-red-600 font-bold">₹{price.toLocaleString()}</span>
          {mrp > price && <span className="text-gray-400 text-xs line-through">₹{mrp.toLocaleString()}</span>}
        </div>
        <p className="text-xs text-gray-400 mt-1">Stock: {stock}</p>
        <button className="mt-3 w-full py-2 bg-red-500 hover:bg-red-600 text-white text-sm rounded-xl transition-colors">View Details</button>
      </div>
    </div>
  );
};