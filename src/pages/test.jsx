import { useState } from "react";

/* ─── Global Font ─────────────────────────────────────────────────────────── */
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;900&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,400&display=swap');
    body { font-family: 'DM Sans', sans-serif; }
    .font-playfair { font-family: 'Playfair Display', serif; }

    @keyframes fadeSlideUp {
      from { opacity: 0; transform: translateY(20px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to   { opacity: 1; }
    }
    @keyframes scaleIn {
      from { opacity: 0; transform: scale(0.95); }
      to   { opacity: 1; transform: scale(1); }
    }
    @keyframes slideLeft {
      from { opacity: 0; transform: translateX(30px); }
      to   { opacity: 1; transform: translateX(0); }
    }
    @keyframes bounce-once {
      0%,100% { transform: scale(1); }
      40%      { transform: scale(1.15); }
      70%      { transform: scale(0.93); }
    }
    @keyframes shimmer {
      0%   { background-position: -400px 0; }
      100% { background-position: 400px 0; }
    }
    .animate-fade-slide-up { animation: fadeSlideUp 0.5s ease both; }
    .animate-fade-in       { animation: fadeIn 0.4s ease both; }
    .animate-scale-in      { animation: scaleIn 0.35s ease both; }
    .animate-slide-left    { animation: slideLeft 0.4s ease both; }
    .animate-bounce-once   { animation: bounce-once 0.5s ease; }
    .delay-100 { animation-delay: 0.1s; }
    .delay-200 { animation-delay: 0.2s; }
    .delay-300 { animation-delay: 0.3s; }
    .delay-400 { animation-delay: 0.4s; }

    .shimmer-btn {
      position: relative;
      overflow: hidden;
    }
    .shimmer-btn::after {
      content: '';
      position: absolute;
      top: 0; left: 0;
      width: 100%; height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent);
      transform: translateX(-100%);
      transition: transform 0.6s ease;
    }
    .shimmer-btn:hover::after { transform: translateX(100%); }

    .card-hover {
      transition: transform 0.28s ease, box-shadow 0.28s ease;
    }
    .card-hover:hover {
      transform: translateY(-4px);
      box-shadow: 0 16px 40px rgba(92,58,30,0.13);
    }

    /* Remove button outline */
    button { outline: none; }
    input  { outline: none; }
  `}</style>
);

/* ─── Data ────────────────────────────────────────────────────────────────── */
const initialCart = [
  { id: 1, name: "ProBlend 750W Mixer Grinder", category: "Mixer Grinders", price: 3299, mrp: 4999, emoji: "🫙", color: "Silver", qty: 1, inStock: true },
  { id: 2, name: "SteelMaster 5L Pressure Cooker", category: "Pressure Cookers", price: 1899, mrp: 2599, emoji: "🥘", color: "Anodized Silver", qty: 2, inStock: true },
  { id: 3, name: "CrispAir 4.5L Digital Air Fryer", category: "Air Fryers", price: 5499, mrp: 7999, emoji: "🍟", color: "Black", qty: 1, inStock: true },
  { id: 4, name: "BrewMate Drip Coffee Maker", category: "Coffee Makers", price: 3799, mrp: 4999, emoji: "☕", color: "Black", qty: 1, inStock: false },
];

const initialWishlist = [
  { id: 5, name: "ChefPro 10-Piece Cookware Set", category: "Cookware Sets", price: 8499, mrp: 12999, emoji: "🍲", rating: 4.7, reviews: 203 },
  { id: 6, name: "FlameTouch 2000W Induction", category: "Induction Cooktops", price: 2199, mrp: 2999, emoji: "🔥", rating: 4.4, reviews: 478 },
  { id: 7, name: "SpiceMaster Wet Grinder", category: "Wet Grinders", price: 4599, mrp: 6500, emoji: "🥣", rating: 4.6, reviews: 321 },
  { id: 8, name: "SteelKing 3L Pressure Pan", category: "Pressure Cookers", price: 1299, mrp: 1799, emoji: "🍵", rating: 4.3, reviews: 156 },
];

/* ─── Icons ───────────────────────────────────────────────────────────────── */
const Icons = {
  trash: (
    <svg width={16} height={16} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
  ),
  heart: (filled) => (
    <svg width={16} height={16} fill={filled ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  ),
  cart: (
    <svg width={16} height={16} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.4 7h12.8M9 21a1 1 0 100-2 1 1 0 000 2zm6 0a1 1 0 100-2 1 1 0 000 2z" />
    </svg>
  ),
  minus: (
    <svg width={12} height={12} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" d="M5 12h14" />
    </svg>
  ),
  plus: (
    <svg width={12} height={12} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" d="M12 5v14M5 12h14" />
    </svg>
  ),
  check: (
    <svg width={14} height={14} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  ),
  tag: (
    <svg width={14} height={14} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
    </svg>
  ),
  truck: (
    <svg width={16} height={16} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <rect x="1" y="3" width="15" height="13" rx="1" /><path d="M16 8h4l3 5v3h-7V8z" />
      <circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" />
    </svg>
  ),
  shield: (
    <svg width={16} height={16} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  arrow: (
    <svg width={16} height={16} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6" />
    </svg>
  ),
  x: (
    <svg width={14} height={14} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),
  star: (
    <svg width={12} height={12} fill="#F0A830" viewBox="0 0 24 24">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  ),
  gift: (
    <svg width={16} height={16} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M20 12v10H4V12M2 7h20v5H2zM12 22V7M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z" />
    </svg>
  ),
};

/* ─── Qty Stepper ─────────────────────────────────────────────────────────── */
function QtyStepper({ qty, onInc, onDec }) {
  return (
    <div className="flex items-center border border-[#E8DDD0] rounded-xl overflow-hidden bg-white">
      <button
        onClick={onDec}
        className="w-8 h-8 flex items-center justify-center text-[#5C3A1E] bg-transparent border-none cursor-pointer hover:bg-[#FFF4E0] transition-colors"
      >
        {Icons.minus}
      </button>
      <span className="w-8 text-center text-sm font-bold text-[#5C3A1E]">{qty}</span>
      <button
        onClick={onInc}
        className="w-8 h-8 flex items-center justify-center text-[#5C3A1E] bg-transparent border-none cursor-pointer hover:bg-[#FFF4E0] transition-colors"
      >
        {Icons.plus}
      </button>
    </div>
  );
}

/* ─── Cart Item Row ───────────────────────────────────────────────────────── */
function CartItem({ item, onQtyChange, onRemove, onMoveToWishlist }) {
  const disc = Math.round(((item.mrp - item.price) / item.mrp) * 100);
  const [removing, setRemoving] = useState(false);

  const handleRemove = () => {
    setRemoving(true);
    setTimeout(() => onRemove(item.id), 280);
  };

  return (
    <div
      className={`bg-white rounded-2xl border border-[#F0E8D4] p-4 sm:p-5 transition-all duration-300 card-hover animate-fade-slide-up
        ${removing ? "opacity-0 scale-95 -translate-x-4" : "opacity-100"}`}
    >
      <div className="flex gap-4 items-start">

        {/* Product Image */}
        <div className="relative shrink-0">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-[#F5ECD7] to-[#E8D5B0] flex items-center justify-center text-4xl sm:text-5xl">
            {item.emoji}
          </div>
          {!item.inStock && (
            <div className="absolute inset-0 bg-white/75 rounded-2xl flex items-center justify-center">
              <span className="text-[9px] font-bold text-red-500 text-center leading-tight px-1">Out of Stock</span>
            </div>
          )}
        </div>

        {/* Details */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="text-[10px] text-[#6B5B45] font-semibold uppercase tracking-wider mb-0.5">{item.category}</p>
              <h3 className="font-semibold text-[#5C3A1E] text-sm sm:text-[15px] leading-snug mb-1 truncate pr-2">{item.name}</h3>
              <p className="text-xs text-[#8A9299]">Color: <span className="text-[#5C3A1E] font-medium">{item.color}</span></p>
            </div>
            <button
              onClick={handleRemove}
              className="shrink-0 w-7 h-7 rounded-lg bg-red-50 hover:bg-red-100 border border-red-100 text-red-400 hover:text-red-600 flex items-center justify-center cursor-pointer border-none transition-colors"
            >
              {Icons.x}
            </button>
          </div>

          {/* Price row */}
          <div className="flex items-center gap-2 mt-2 mb-3">
            <span className="font-playfair font-bold text-lg text-[#5C3A1E]">₹{item.price.toLocaleString()}</span>
            <span className="text-xs text-[#8A9299] line-through">₹{item.mrp.toLocaleString()}</span>
            <span className="text-[10px] font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded-full">{disc}% off</span>
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
                Subtotal: <span className="font-bold text-[#5C3A1E]">₹{(item.price * item.qty).toLocaleString()}</span>
              </span>
            </div>
            <button
              onClick={() => onMoveToWishlist(item.id)}
              className="flex items-center gap-1.5 text-xs text-[#D4860B] font-medium cursor-pointer bg-transparent border-none hover:text-[#5C3A1E] transition-colors"
            >
              {Icons.heart(false)}
              Save for later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Coupon Box ──────────────────────────────────────────────────────────── */
function CouponBox() {
  const [code, setCode] = useState("");
  const [applied, setApplied] = useState(false);
  const [error, setError] = useState(false);

  const handleApply = () => {
    if (code.toUpperCase() === "SAATHI10") {
      setApplied(true);
      setError(false);
    } else {
      setError(true);
      setApplied(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-[#F0E8D4] p-5">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-[#D4860B]">{Icons.tag}</span>
        <span className="font-semibold text-sm text-[#5C3A1E]">Apply Coupon</span>
      </div>

      <div className="flex gap-2">
        <input
          value={code}
          onChange={(e) => { setCode(e.target.value.toUpperCase()); setError(false); setApplied(false); }}
          placeholder="Enter coupon code"
          className={`flex-1 border rounded-xl px-4 py-2.5 text-sm font-medium tracking-wider placeholder:font-normal placeholder:tracking-normal focus:ring-2 transition-all
            ${applied ? "border-green-400 bg-green-50 focus:ring-green-200 text-green-700"
              : error ? "border-red-300 bg-red-50 focus:ring-red-100 text-red-600"
              : "border-[#E8DDD0] bg-[#FAFAF7] focus:border-[#D4860B] focus:ring-[#D4860B]/20 text-[#5C3A1E]"}`}
        />
        <button
          onClick={handleApply}
          className="shimmer-btn bg-gradient-to-r from-[#D4860B] to-[#F0A830] text-white border-none cursor-pointer px-5 py-2.5 rounded-xl text-sm font-semibold hover:from-[#3E2610] hover:to-[#5C3A1E] transition-all"
        >
          Apply
        </button>
      </div>

      {applied && (
        <p className="text-xs text-green-700 font-semibold mt-2 flex items-center gap-1 animate-fade-in">
          {Icons.check} "SAATHI10" applied! You save ₹500 extra.
        </p>
      )}
      {error && (
        <p className="text-xs text-red-500 mt-2 animate-fade-in">Invalid coupon. Try <span className="font-bold cursor-pointer" onClick={() => setCode("SAATHI10")}>SAATHI10</span></p>
      )}

      {/* Available coupons */}
      <div className="mt-3 pt-3 border-t border-[#F0E8D4]">
        <p className="text-[11px] text-[#8A9299] mb-2 font-medium uppercase tracking-wide">Available offers</p>
        <div className="flex flex-col gap-1.5">
          {[
            { code: "SAATHI10", desc: "₹500 off on orders above ₹5,000" },
            { code: "FIRST15", desc: "15% off on your first order" },
          ].map((c) => (
            <div
              key={c.code}
              onClick={() => setCode(c.code)}
              className="flex items-center gap-2 cursor-pointer group"
            >
              <span className="font-bold text-xs text-[#D4860B] bg-[#FFF4E0] border border-[#F0C870] rounded-lg px-2 py-1 font-mono tracking-wider group-hover:bg-[#D4860B] group-hover:text-white transition-all">
                {c.code}
              </span>
              <span className="text-xs text-[#6B5B45]">{c.desc}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Order Summary ───────────────────────────────────────────────────────── */
function OrderSummary({ cartItems }) {
  const subtotal = cartItems.reduce((s, i) => s + i.mrp * i.qty, 0);
  const discount = cartItems.reduce((s, i) => s + (i.mrp - i.price) * i.qty, 0);
  const delivery = subtotal - discount > 999 ? 0 : 99;
  const total = subtotal - discount + delivery;

  const rows = [
    { label: "MRP Total", value: `₹${subtotal.toLocaleString()}`, muted: true },
    { label: "Product Discount", value: `-₹${discount.toLocaleString()}`, green: true },
    { label: "Delivery Charges", value: delivery === 0 ? "FREE" : `₹${delivery}`, green: delivery === 0 },
    { label: "Platform Fee", value: "FREE", green: true },
  ];

  return (
    <div className="bg-white rounded-2xl border border-[#F0E8D4] overflow-hidden animate-slide-left">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#5C3A1E] to-[#7A4B22] px-5 py-4">
        <h3 className="font-playfair font-bold text-white text-lg">Order Summary</h3>
        <p className="text-[#F0A830] text-xs mt-0.5">{cartItems.length} item{cartItems.length !== 1 ? "s" : ""} in your cart</p>
      </div>

      <div className="p-5">
        {/* Line items */}
        <div className="flex flex-col gap-3 pb-4 border-b border-[#F0E8D4]">
          {rows.map((r) => (
            <div key={r.label} className="flex justify-between items-center text-sm">
              <span className="text-[#6B5B45]">{r.label}</span>
              <span className={`font-semibold ${r.green ? "text-green-700" : r.muted ? "text-[#8A9299] line-through" : "text-[#5C3A1E]"}`}>
                {r.value}
              </span>
            </div>
          ))}
        </div>

        {/* Total */}
        <div className="flex justify-between items-center pt-4 pb-4 border-b border-[#F0E8D4]">
          <span className="font-bold text-[#5C3A1E]">Total Amount</span>
          <span className="font-playfair font-bold text-2xl text-[#5C3A1E]">₹{total.toLocaleString()}</span>
        </div>

        {/* Savings callout */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-100 rounded-xl px-4 py-3 my-4 flex items-center gap-2">
          <span className="text-green-600 text-lg">🎉</span>
          <div>
            <p className="text-xs font-bold text-green-700">You're saving ₹{discount.toLocaleString()} on this order!</p>
            <p className="text-[10px] text-green-600">Best deal for today</p>
          </div>
        </div>

        {/* CTA */}
        <button className="shimmer-btn w-full py-3.5 rounded-2xl font-bold text-[15px] text-white bg-gradient-to-r from-[#D4860B] to-[#F0A830] border-none cursor-pointer hover:from-[#3E2610] hover:to-[#5C3A1E] transition-all shadow-lg shadow-[#D4860B]/25 flex items-center justify-center gap-2">
          {Icons.truck}
          Proceed to Checkout
        </button>
        <p className="text-center text-[10px] text-[#8A9299] mt-2.5">🔒 100% Secure & Encrypted Checkout</p>

        {/* Trust badges */}
        <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-[#F0E8D4]">
          {[["🚚", "Free Delivery"], ["↩️", "Easy Returns"], ["🛡️", "Secure Pay"]].map(([ic, lbl]) => (
            <div key={lbl} className="flex flex-col items-center gap-1 text-center">
              <span className="text-lg">{ic}</span>
              <span className="text-[10px] text-[#6B5B45] font-medium leading-tight">{lbl}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Empty Cart ──────────────────────────────────────────────────────────── */
function EmptyCart({ onShop }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 animate-scale-in">
      <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#FFF4E0] to-[#F5ECD7] flex items-center justify-center text-6xl mb-6 border-4 border-[#F0E8D4]">
        🛒
      </div>
      <h3 className="font-playfair text-2xl font-bold text-[#5C3A1E] mb-2">Your cart is empty!</h3>
      <p className="text-[#6B5B45] text-sm mb-8 text-center max-w-xs">
        Looks like you haven't added any kitchen appliances yet. Let's fix that!
      </p>
      <button
        onClick={onShop}
        className="shimmer-btn bg-gradient-to-r from-[#D4860B] to-[#F0A830] text-white border-none cursor-pointer px-8 py-3.5 rounded-full font-bold text-[15px] hover:from-[#3E2610] hover:to-[#5C3A1E] transition-all shadow-lg shadow-[#D4860B]/25"
      >
        Start Shopping →
      </button>
    </div>
  );
}

/* ─── Wishlist Card ───────────────────────────────────────────────────────── */
function WishlistCard({ item, onMoveToCart, onRemove }) {
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
          {Icons.x}
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
                {Icons.star}
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
          {adding ? <>{Icons.check} Moving to Cart…</> : <>{Icons.cart} Move to Cart</>}
        </button>
      </div>
    </div>
  );
}

/* ─── Empty Wishlist ──────────────────────────────────────────────────────── */
function EmptyWishlist() {
  return (
    <div className="flex flex-col items-center justify-center py-20 animate-scale-in col-span-full">
      <div className="w-28 h-28 rounded-full bg-gradient-to-br from-red-50 to-[#FFF4E0] flex items-center justify-center text-5xl mb-6 border-4 border-red-100">
        🤍
      </div>
      <h3 className="font-playfair text-2xl font-bold text-[#5C3A1E] mb-2">Wishlist is empty</h3>
      <p className="text-[#6B5B45] text-sm text-center max-w-xs">
        Save your favourite kitchen appliances here and shop them anytime you want!
      </p>
    </div>
  );
}

/* ─── Tab Pill ────────────────────────────────────────────────────────────── */
function TabPill({ active, onClick, children, count }) {
  return (
    <button
      onClick={onClick}
      className={`relative flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold cursor-pointer border-none transition-all duration-300
        ${active
          ? "bg-gradient-to-r from-[#D4860B] to-[#F0A830] text-white shadow-lg shadow-[#D4860B]/30"
          : "bg-white text-[#5C3A1E] border border-[#E8DDD0] hover:border-[#D4860B] hover:text-[#D4860B]"
        }`}
    >
      {children}
      {count > 0 && (
        <span className={`text-[11px] font-bold px-1.5 py-0.5 rounded-full min-w-[20px] text-center
          ${active ? "bg-white/25 text-white" : "bg-[#FFF4E0] text-[#D4860B]"}`}>
          {count}
        </span>
      )}
    </button>
  );
}

/* ─── Main Page ───────────────────────────────────────────────────────────── */
export default function CartWishlistPage() {
  const [activeTab, setActiveTab] = useState("cart");
  const [cartItems, setCartItems] = useState(initialCart);
  const [wishlist, setWishlist] = useState(initialWishlist);
  
  /* Cart handlers */
  const updateQty = (id, qty) =>
    setCartItems((prev) => prev.map((i) => (i.id === id ? { ...i, qty } : i)));
  
  const removeFromCart = (id) =>
    setCartItems((prev) => prev.filter((i) => i.id !== id));
  
    const moveToWishlist = (id) => {
      const item = cartItems.find((i) => i.id === id);
      if (item) {
        setWishlist((prev) => prev.find(w => w.id === id) ? prev : [...prev, { ...item, rating: 4.5, reviews: 100 }]);
        removeFromCart(id);
      }
    };
  
    /* Wishlist handlers */
    const removeFromWishlist = (id) =>
      setWishlist((prev) => prev.filter((i) => i.id !== id));
  
    const moveToCart = (id) => {
      const item = wishlist.find((i) => i.id === id);
      if (item) {
        setCartItems((prev) =>
          prev.find(c => c.id === id) ? prev : [...prev, { ...item, qty: 1, color: "Default", inStock: true }]
        );
        removeFromWishlist(id);
      }
    };
  
    const cartCount = cartItems.length;
    const wishCount = wishlist.length;

  return (
    <>
      <GlobalStyles />
      <div className="min-h-screen bg-[#FAFAF7]">

        {/* ── Top Announcement Bar ── */}
        <div className="bg-[#5C3A1E] text-[#FFF4E0] text-xs font-medium py-1.5 text-center tracking-wide">
          🚚 Free delivery on orders above ₹999 &nbsp;|&nbsp; 🎁 Use code <span className="font-bold text-[#F0A830]">SAATHI10</span> for ₹500 off
        </div>

        {/* ── Sticky Header ── */}
        <header className="bg-white/95 backdrop-blur-md border-b border-[#F0E8D4] sticky top-0 z-40 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2.5 cursor-pointer">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#D4860B] to-[#5C3A1E] flex items-center justify-center text-xl shadow-md">🫕</div>
              <span className="font-playfair font-bold text-xl text-[#5C3A1E]">
                Kitchen<span className="text-[#D4860B]">Saathi</span>
              </span>
            </div>
            <nav className="flex items-center gap-1.5">
              <TabPill active={activeTab === "cart"} onClick={() => setActiveTab("cart")} count={cartCount}>
                🛒 Cart
              </TabPill>
              <TabPill active={activeTab === "wishlist"} onClick={() => setActiveTab("wishlist")} count={wishCount}>
                ❤️ Wishlist
              </TabPill>
            </nav>
          </div>
        </header>

        {/* ── Page Body ── */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">

          {/* ── Breadcrumb ── */}
          <nav className="flex items-center gap-1.5 text-xs text-[#6B5B45] mb-6">
            <span className="text-[#D4860B] cursor-pointer hover:underline font-medium">Home</span>
            <span className="text-[#C0C8D0]">{Icons.arrow}</span>
            <span className="capitalize font-medium text-[#5C3A1E]">{activeTab === "cart" ? "Shopping Cart" : "Wishlist"}</span>
          </nav>

          {/* ── Page Title ── */}
          <div className="mb-8 animate-fade-slide-up">
            <h1 className="font-playfair text-3xl sm:text-4xl font-bold text-[#5C3A1E] leading-tight">
              {activeTab === "cart" ? (
                <>Your Shopping <span className="text-[#D4860B]">Cart</span></>
              ) : (
                <>Your <span className="text-[#D4860B]">Wishlist</span></>
              )}
            </h1>
            <p className="text-[#6B5B45] text-sm mt-1">
              {activeTab === "cart"
                ? cartCount > 0 ? `${cartCount} item${cartCount > 1 ? "s" : ""} waiting for you` : "Your cart is currently empty"
                : wishCount > 0 ? `${wishCount} item${wishCount > 1 ? "s" : ""} saved for later` : "No items saved yet"
              }
            </p>
          </div>

          {/* ════════════════ CART TAB ════════════════ */}
          {activeTab === "cart" && (
            cartItems.length === 0 ? (
              <EmptyCart onShop={() => {}} />
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6">

                {/* Left — Items + Coupon */}
                <div className="flex flex-col gap-4">
                  {/* Select all bar */}
                  <div className="bg-white rounded-2xl border border-[#F0E8D4] px-5 py-3.5 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-5 h-5 rounded-md bg-gradient-to-br from-[#D4860B] to-[#F0A830] flex items-center justify-center text-white">
                        {Icons.check}
                      </div>
                      <span className="text-sm font-semibold text-[#5C3A1E]">
                        {cartItems.filter(i => i.inStock).length} item{cartItems.filter(i => i.inStock).length > 1 ? "s" : ""} selected
                      </span>
                    </div>
                    <button
                      onClick={() => setCartItems([])}
                      className="text-xs text-red-400 hover:text-red-600 cursor-pointer bg-transparent border-none font-medium transition-colors"
                    >
                      Remove All
                    </button>
                  </div>

                  {/* Cart items */}
                  {cartItems.map((item, i) => (
                    <div key={item.id} className={`delay-${Math.min(i * 100, 400)}`}>
                      <CartItem
                        item={item}
                        onQtyChange={updateQty}
                        onRemove={removeFromCart}
                        onMoveToWishlist={moveToWishlist}
                      />
                    </div>
                  ))}

                  {/* Coupon */}
                  <CouponBox />

                  {/* Continue shopping */}
                  <button className="flex items-center justify-center gap-2 text-sm font-semibold text-[#D4860B] py-3 rounded-2xl border-2 border-dashed border-[#F0C870] bg-[#FFF4E0]/50 cursor-pointer hover:bg-[#FFF4E0] transition-colors">
                    ← Continue Shopping
                  </button>
                </div>

                {/* Right — Summary */}
                <div className="flex flex-col gap-4">
                  <OrderSummary cartItems={cartItems.filter(i => i.inStock)} />

                  {/* Delivery info card */}
                  <div className="bg-white rounded-2xl border border-[#F0E8D4] p-4">
                    <p className="text-xs font-bold text-[#5C3A1E] uppercase tracking-wide mb-3">Why shop with us?</p>
                    <div className="flex flex-col gap-2.5">
                      {[
                        [Icons.truck, "Free delivery on orders ₹999+"],
                        [Icons.shield, "2-year manufacturer warranty"],
                        ["🔄", "10-day hassle-free returns"],
                        [Icons.gift, "EMI available from ₹0 interest"],
                      ].map(([ic, text], i) => (
                        <div key={i} className="flex items-center gap-2.5 text-xs text-[#6B5B45]">
                          <span className="text-[#D4860B] shrink-0 w-4">{ic}</span>
                          {text}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )
          )}

          {/* ════════════════ WISHLIST TAB ════════════════ */}
          {activeTab === "wishlist" && (
            <div>
              {/* Toolbar */}
              {wishlist.length > 0 && (
                <div className="flex items-center justify-between mb-6 animate-fade-in">
                  <p className="text-sm text-[#6B5B45]">
                    <span className="font-semibold text-[#5C3A1E]">{wishlist.length}</span> items saved
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        wishlist.forEach(item => {
                          setCartItems(prev =>
                            prev.find(c => c.id === item.id) ? prev : [...prev, { ...item, qty: 1, color: "Default", inStock: true }]
                          );
                        });
                        setWishlist([]);
                      }}
                      className="shimmer-btn flex items-center gap-1.5 bg-gradient-to-r from-[#D4860B] to-[#F0A830] text-white border-none cursor-pointer px-4 py-2 rounded-xl text-xs font-semibold hover:from-[#3E2610] hover:to-[#5C3A1E] transition-all"
                    >
                      {Icons.cart} Add All to Cart
                    </button>
                    <button
                      onClick={() => setWishlist([])}
                      className="flex items-center gap-1.5 bg-white text-red-400 border border-red-100 cursor-pointer px-4 py-2 rounded-xl text-xs font-semibold hover:bg-red-50 hover:text-red-600 transition-all"
                    >
                      {Icons.trash} Clear All
                    </button>
                  </div>
                </div>
              )}

              {/* Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {wishlist.length === 0 ? (
                  <EmptyWishlist />
                ) : (
                  wishlist.map((item, i) => (
                    <div key={item.id} className={`delay-${Math.min(i * 100, 300)}`}>
                      <WishlistCard
                        item={item}
                        onMoveToCart={moveToCart}
                        onRemove={removeFromWishlist}
                      />
                    </div>
                  ))
                )}
              </div>

              {/* You might also like */}
              {wishlist.length > 0 && (
                <div className="mt-12 pt-8 border-t border-[#F0E8D4]">
                  <h2 className="font-playfair text-2xl font-bold text-[#5C3A1E] mb-1">
                    Frequently Bought Together
                  </h2>
                  <p className="text-sm text-[#6B5B45] mb-6">Customers who saved these also liked</p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {[
                      { id: 9, name: "Non-Stick Tawa 28cm", price: 799, mrp: 1199, emoji: "🥞", category: "Cookware" },
                      { id: 10, name: "Glass Water Kettle 1.7L", price: 1499, mrp: 2200, emoji: "🫖", category: "Kettles" },
                      { id: 11, name: "Wooden Cutting Board", price: 549, mrp: 799, emoji: "🪵", category: "Accessories" },
                      { id: 12, name: "Stainless Ladle Set 5pc", price: 399, mrp: 599, emoji: "🥄", category: "Utensils" },
                    ].map((p) => {
                      const d = Math.round(((p.mrp - p.price) / p.mrp) * 100);
                      return (
                        <div key={p.id} className="bg-white rounded-2xl border border-[#F0E8D4] overflow-hidden card-hover cursor-pointer animate-fade-slide-up">
                          <div className="h-32 bg-gradient-to-br from-[#F5ECD7] to-[#E8D5B0] flex items-center justify-center text-5xl">
                            {p.emoji}
                          </div>
                          <div className="p-3">
                            <p className="text-[10px] text-[#6B5B45] font-semibold uppercase tracking-wide mb-1">{p.category}</p>
                            <p className="font-semibold text-xs text-[#5C3A1E] leading-snug mb-2">{p.name}</p>
                            <div className="flex items-center gap-1.5 mb-2">
                              <span className="font-playfair font-bold text-sm text-[#5C3A1E]">₹{p.price}</span>
                              <span className="text-[11px] text-[#8A9299] line-through">₹{p.mrp}</span>
                              <span className="text-[10px] font-bold text-green-700 ml-auto">{d}%</span>
                            </div>
                            <button
                              onClick={() => setWishlist(prev => prev.find(w => w.id === p.id) ? prev : [...prev, { ...p, rating: 4.5, reviews: 50 }])}
                              className="w-full py-2 rounded-xl text-[11px] font-semibold text-[#D4860B] bg-[#FFF4E0] border border-[#F0C870] cursor-pointer hover:bg-[#D4860B] hover:text-white hover:border-[#D4860B] transition-all"
                            >
                              + Add to Wishlist
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}
        </main>

        {/* ── Floating Tab Switcher (mobile) ── */}
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 flex bg-white rounded-full shadow-2xl shadow-[#5C3A1E]/20 border border-[#F0E8D4] p-1 gap-1 sm:hidden">
          {[
            { key: "cart", icon: "🛒", label: "Cart", count: cartCount },
            { key: "wishlist", icon: "❤️", label: "Saved", count: wishCount },
          ].map((t) => (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              className={`relative flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold cursor-pointer border-none transition-all
                ${activeTab === t.key
                  ? "bg-gradient-to-r from-[#D4860B] to-[#F0A830] text-white"
                  : "bg-transparent text-[#5C3A1E]"
                }`}
            >
              {t.icon} {t.label}
              {t.count > 0 && (
                <span className={`text-[10px] font-bold px-1 py-0.5 rounded-full min-w-[16px] text-center
                  ${activeTab === t.key ? "bg-white/30 text-white" : "bg-[#FFF4E0] text-[#D4860B]"}`}>
                  {t.count}
                </span>
              )}
            </button>
          ))}
        </div>

      </div>
    </>
  );
}
