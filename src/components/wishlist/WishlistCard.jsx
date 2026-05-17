import { Check, ShoppingCart, Star, X } from "lucide-react";
import { useState } from "react";

export function WishlistCard({ item, onMoveToCart, onRemove }) {
  const disc = Math.round(((item.mrp - item.price) / item.mrp) * 100);
  const [removing, setRemoving] = useState(false);
  const [adding, setAdding] = useState(false);

  const handleAdd = () => {
    setAdding(true);
    setTimeout(() => { onMoveToCart(item.id); setAdding(false); }, 700);
  };
  const handleRemove = () => {
    setRemoving(true);
    setTimeout(() => onRemove(item.id), 280);
  };

  return (
    <div
      className={`bg-white rounded-2xl border border-[#F0E8D4] overflow-hidden card-hover animate-fade-slide-up transition-all duration-300
        ${removing ? "opacity-0 scale-90" : "opacity-100"}`}
    >
      {/* Image */}
      <div className="relative h-44 bg-gradient-to-br from-[#F5ECD7] to-[#E8D5B0] flex items-center justify-center">
        <span className="text-[72px]">{item.emoji}</span>
        <div className="absolute top-3 right-3 bg-green-600 text-white text-[10px] font-bold px-2 py-1 rounded-full">
          {disc}% OFF
        </div>
        <button
          onClick={handleRemove}
          className="absolute top-3 left-3 w-7 h-7 rounded-full bg-white/90 hover:bg-red-50 border border-[#E8DDD0] hover:border-red-200 text-[#8A9299] hover:text-red-500 flex items-center justify-center cursor-pointer transition-all"
        >
          <X />
        </button>
      </div>

      {/* Body */}
      <div className="p-4">
        <p className="text-[10px] text-[#6B5B45] font-semibold uppercase tracking-wider mb-1">{item.category}</p>
        <h3 className="font-semibold text-[#5C3A1E] text-sm leading-snug mb-2 line-clamp-2">{item.name}</h3>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-3">
          <div className="flex gap-0.5">
            {[1,2,3,4,5].map(s => (
              <span key={s} className={s <= Math.round(item.rating) ? "text-[#F0A830]" : "text-gray-200"}>
                <Star />
              </span>
            ))}
          </div>
          <span className="text-[11px] text-[#6B5B45]">{item.rating} ({item.reviews})</span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-3">
          <span className="font-playfair font-bold text-xl text-[#5C3A1E]">₹{item.price.toLocaleString()}</span>
          <span className="text-xs text-[#8A9299] line-through">₹{item.mrp.toLocaleString()}</span>
        </div>
        <p className="text-xs text-green-700 font-semibold mb-3">
          You save ₹{(item.mrp - item.price).toLocaleString()}
        </p>

        {/* CTA */}
        <button
          onClick={handleAdd}
          className={`shimmer-btn w-full py-2.5 rounded-xl text-sm font-semibold border-none cursor-pointer flex items-center justify-center gap-2 transition-all
            ${adding
              ? "bg-green-600 text-white"
              : "bg-gradient-to-r from-[#D4860B] to-[#F0A830] text-white hover:from-[#3E2610] hover:to-[#5C3A1E]"
            }`}
        >
          {adding ? <><Check /> Moving to Cart…</> : <><ShoppingCart />Move to Cart</>}
        </button>
      </div>
    </div>
  );
}