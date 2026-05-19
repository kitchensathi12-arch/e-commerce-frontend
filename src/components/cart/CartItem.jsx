import { Clock9, Heart, Plus, X } from 'lucide-react';
import { useState } from 'react';

function QtyStepper({ qty, onInc, onDec }) {
  return (
    <div className="flex items-center border border-[#E8DDD0] rounded-xl overflow-hidden bg-white">
      <button
        onClick={onDec}
        className="w-8 h-8 flex items-center justify-center text-[#5C3A1E] bg-transparent border-none cursor-pointer hover:bg-[#FFF4E0] transition-colors"
      >
        <Clock9 />
      </button>
      <span className="w-8 text-center text-sm font-bold text-[#5C3A1E]">{qty}</span>
      <button
        onClick={onInc}
        className="w-8 h-8 flex items-center justify-center text-[#5C3A1E] bg-transparent border-none cursor-pointer hover:bg-[#FFF4E0] transition-colors"
      >
        <Plus />
      </button>
    </div>
  );
}

export function CartItem({ item, onQtyChange, onRemove, onMoveToWishlist }) {
  const disc = Math.round(((item.mrp - item.price) / item.mrp) * 100);
  const [removing, setRemoving] = useState(false);

  const handleRemove = () => {
    setRemoving(true);
    setTimeout(() => onRemove(item.id), 280);
  };

  return (
    <div
      className={`bg-white rounded-2xl border border-[#F0E8D4] p-4 sm:p-5 transition-all duration-300 card-hover animate-fade-slide-up
        ${removing ? 'opacity-0 scale-95 -translate-x-4' : 'opacity-100'}`}
    >
      <div className="flex gap-4 items-start">
        {/* Product Image */}
        <div className="relative shrink-0">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-[#F5ECD7] to-[#E8D5B0] flex items-center justify-center text-4xl sm:text-5xl">
            {item.emoji}
          </div>
          {!item.inStock && (
            <div className="absolute inset-0 bg-white/75 rounded-2xl flex items-center justify-center">
              <span className="text-[9px] font-bold text-red-500 text-center leading-tight px-1">
                Out of Stock
              </span>
            </div>
          )}
        </div>

        {/* Details */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="text-[10px] text-[#6B5B45] font-semibold uppercase tracking-wider mb-0.5">
                {item.category}
              </p>
              <h3 className="font-semibold text-[#5C3A1E] text-sm sm:text-[15px] leading-snug mb-1 truncate pr-2">
                {item.name}
              </h3>
              <p className="text-xs text-[#8A9299]">
                Color: <span className="text-[#5C3A1E] font-medium">{item.color}</span>
              </p>
            </div>
            <button
              onClick={handleRemove}
              className="shrink-0 w-7 h-7 rounded-lg bg-red-50 hover:bg-red-100 border border-red-100 text-red-400 hover:text-red-600 flex items-center justify-center cursor-pointer border-none transition-colors"
            >
              <X className="w-3 h-3" />
            </button>
          </div>

          {/* Price row */}
          <div className="flex items-center gap-2 mt-2 mb-3">
            <span className="font-playfair font-bold text-lg text-[#5C3A1E]">
              ₹{item.price.toLocaleString()}
            </span>
            <span className="text-xs text-[#8A9299] line-through">
              ₹{item.mrp.toLocaleString()}
            </span>
            <span className="text-[10px] font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded-full">
              {disc}% off
            </span>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-3">
              <QtyStepper
                qty={item.qty}
                onDec={() => item.qty > 1 && onQtyChange(item.id, item.qty - 1)}
                onInc={() => onQtyChange(item.id, item.qty + 1)}
              />
              <span className="text-xs text-[#6B5B45]">
                Subtotal:{' '}
                <span className="font-bold text-[#5C3A1E]">
                  ₹{(item.price * item.qty).toLocaleString()}
                </span>
              </span>
            </div>
            <button
              onClick={() => onMoveToWishlist(item.id)}
              className="flex items-center gap-1.5 text-xs text-[#D4860B] font-medium cursor-pointer bg-transparent border-none hover:text-[#5C3A1E] transition-colors"
            >
              <Heart className="w-3 h-3" />
              Save for later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
