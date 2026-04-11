import { useNavigate } from "react-router-dom";
import { ArrowRight } from 'lucide-react';

interface ProductCardProps {
  id: string;
  image: string;
  title: string;
  subtitle?: string;
  price: number;
  mrp?: number;
  tag?: string;           // Optional category tag like "Jars", "Hand Blender"
}

const ProductCard = ({ id, image, title, subtitle, price, mrp, tag }: ProductCardProps) => {
  const navigate = useNavigate();

  const discountAmount = mrp ? mrp - price : 0;
  const hasDiscount = discountAmount > 0;

  return (
    <>
      <style>{`
        .product-card {
          height: 100%;
          display: flex;
          flex-direction: column;
          transition: all 0.4s ease;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.06);
        }

        .product-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 35px rgba(0, 0, 0, 0.1);
        }

        .image-wrapper {
          background: #f9f9f9;
          height: 220px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          transition: transform 0.5s ease;
        }

        .product-card:hover .image-wrapper {
          transform: scale(1.05);
        }

        .title-line {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      `}</style>

      <div
        onClick={() => navigate(`/product-detail/${id}`)}
        className="product-card bg-white rounded-3xl overflow-hidden cursor-pointer group border border-gray-100"
      >
        {/* Image */}
        <div className="image-wrapper">
          <img
            src={image}
            alt={title}
            className="max-h-full max-w-full object-contain drop-shadow-sm"
            loading="lazy"
          />
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col p-6">
          {/* Tag (like "Jars", "Hand Blender") */}
          {tag && (
            <div className="text-sm font-medium text-gray-500 mb-2">
              {tag}
            </div>
          )}

          {/* Title - Handles long names gracefully */}
          <h3 className="title-line font-semibold text-lg leading-tight text-gray-900 mb-4 min-h-[52px]">
            {title}
          </h3>

          {/* Subtitle (optional) */}
          {subtitle && (
            <p className="text-gray-500 text-sm mb-5 line-clamp-2">
              {subtitle}
            </p>
          )}

          {/* Pricing Section */}
          <div className="mt-auto">
            <div className="flex items-center gap-3 mb-5">
              <span className="text-2xl font-bold text-gray-900">
                ₹{price.toLocaleString('en-IN')}
              </span>

              {hasDiscount && (
                <>
                  <span className="text-base text-gray-400 line-through">
                    ₹{mrp?.toLocaleString('en-IN')}
                  </span>
                  <div className="ml-auto bg-green-100 text-green-700 text-xs font-medium px-3 py-1 rounded-full">
                    Save ₹{discountAmount.toLocaleString('en-IN')}
                  </div>
                </>
              )}
            </div>

            {/* Shop Now Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/product-detail/${id}`);
              }}
              className="w-full bg-[#e63939] hover:bg-[#d62828] active:bg-[#c81e1e] 
                         text-white font-medium py-3.5 rounded-2xl text-base 
                         flex items-center justify-center gap-2 transition-all"
            >
              Shop Now 
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;