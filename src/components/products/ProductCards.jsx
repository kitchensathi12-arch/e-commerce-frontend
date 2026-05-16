import { useState } from "react";
import { Stars } from "../Stars";
import { Heart } from "lucide-react";

export function ProductCard({ product: p, i, setPage, setSelectedProduct, addToCart }) {
  const [wishlisted, setWishlisted] = useState(false);
  const disc = Math.round(((p.mrp - p.price) / p.mrp) * 100);

  return (
    <div className="card-lift bg-white rounded-[20px] overflow-hidden border border-[#F0E8D4] relative cursor-pointer">

      {p.badge && (
        <div className="ribbon">
          {p.badge}
        </div>
      )}

      {/* IMAGE */}
      <div
        className="h-[200px] relative flex items-center justify-center"
        onClick={() => {
          setSelectedProduct(p);
          setPage("product");
        }}
      >
        <span className="text-[80px]">{p.emoji}</span>

        {!p.inStock && (
          <div className="absolute inset-0 bg-white/75 flex items-center justify-center">
            <span className="bg-brown text-white rounded-full px-4 py-1.5 text-xs font-semibold">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      <div className="px-[18px] pt-[18px] pb-5">

        <div className="text-[11px] text-text-muted font-semibold uppercase tracking-[0.8px] mb-1">
          {p.category}
        </div>

        <div
          className="font-semibold text-[15px] text-brown leading-[1.4] mb-2 cursor-pointer"
          onClick={() => {
            setSelectedProduct(p);
            setPage("product");
          }}
        >
          {p.name}
        </div>

        <div className="flex items-center gap-1.5 mb-3">
          <Stars rating={p.rating} />
          <span className="text-xs text-text-muted">
            ({p.reviews.toLocaleString()})
          </span>
        </div>

        <div className="flex items-center gap-2 mb-4">

          <span className="font-playfair text-[22px] font-bold text-brown">
            ₹{p.price.toLocaleString()}
          </span>

          <span className="text-[13px] text-steel-dark line-through">
            ₹{p.mrp.toLocaleString()}
          </span>

          <span className="text-xs font-bold text-green-700">
            {disc}% off
          </span>

        </div>

        <div className="flex gap-2">

          <button
            className="btn-primary flex-1 py-2.5 text-[13px] disabled:opacity-50"
            onClick={() => p.inStock && addToCart(p)}
            disabled={!p.inStock}
          >
            {p.inStock ? "Add to Cart" : "Notify Me"}
          </button>

          <button
            onClick={() => setWishlisted(!wishlisted)}
            className={`w-10 h-10 border rounded-[10px] flex items-center justify-center flex-shrink-0 transition ${
              wishlisted
                ? "bg-amber-pale border-amber text-amber"
                : "bg-white border-[#E8DDD0] text-steel-dark"
            }`}
          >
            <Heart />
          </button>

        </div>

      </div>
    </div>
  );
}