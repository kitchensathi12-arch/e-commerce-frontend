import { useState } from 'react';

// ── Sample Product Data ───────────────────────────────────────────────────────
const sampleProduct = {
  id: 1,
  name: 'ProBlend 750W Mixer Grinder',
  category: 'Mixer Grinders',
  price: 3299,
  mrp: 4999,
  rating: 4.6,
  reviews: 1248,
  badge: 'Best Seller',
  emoji: '🫙',
  desc: 'Powerful 750W motor with 3 stainless steel jars. Perfect for grinding spices, making chutneys, and preparing smooth batters. The powerful copper motor ensures smooth grinding every time.',
  colors: ['Silver', 'White', 'Black'],
  features: [
    '750W Motor',
    '3 SS Jars',
    '5-Year Warranty',
    'Overload Protection',
    'ISI Certified',
    'Anti-Skid Base',
  ],
  inStock: true,
  images: ['🫙', '⚙️', '🔩'],
};

const TESTIMONIALS = [
  {
    name: 'Priya Sharma',
    city: 'Delhi',
    text: 'The ProBlend mixer is fantastic! Grinds coconut chutney in seconds. The 5-year warranty gives great peace of mind.',
    rating: 5,
    initial: 'P',
  },
  {
    name: 'Rahul Verma',
    city: 'Mumbai',
    text: 'Got the pressure cooker for my mom. She loves how quickly it cooks dal and rice. Build quality is excellent.',
    rating: 5,
    initial: 'R',
  },
  {
    name: 'Anita Reddy',
    city: 'Hyderabad',
    text: 'Air fryer changed our eating habits! The kids now love healthy snacks. Delivery was super fast too.',
    rating: 4,
    initial: 'A',
  },
];

// ── Icons ─────────────────────────────────────────────────────────────────────
const CartIcon = () => (
  <svg width={18} height={18} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.4 7h12.8M7 13l-1-4m12 4l1-4M9 21a1 1 0 100-2 1 1 0 000 2zm6 0a1 1 0 100-2 1 1 0 000 2z"
    />
  </svg>
);

const HeartIcon = ({ filled = false }) => (
  <svg
    width={20}
    height={20}
    fill={filled ? 'currentColor' : 'none'}
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
    />
  </svg>
);

const CheckIcon = ({ size = 16 }) => (
  <svg
    width={size}
    height={size}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2.5}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

const MinusIcon = () => (
  <svg
    width={14}
    height={14}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2.5}
  >
    <path strokeLinecap="round" d="M5 12h14" />
  </svg>
);

const PlusIcon = () => (
  <svg
    width={14}
    height={14}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2.5}
  >
    <path strokeLinecap="round" d="M12 5v14M5 12h14" />
  </svg>
);

const TruckIcon = () => (
  <svg
    width={18}
    height={18}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.8}
  >
    <rect x="1" y="3" width="15" height="13" rx="1" />
    <path d="M16 8h4l3 5v3h-7V8z" />
    <circle cx="5.5" cy="18.5" r="2.5" />
    <circle cx="18.5" cy="18.5" r="2.5" />
  </svg>
);

const ShieldIcon = () => (
  <svg
    width={18}
    height={18}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.8}
  >
    <path strokeLinecap="round" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const ShareIcon = () => (
  <svg width={18} height={18} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <circle cx="18" cy="5" r="3" />
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="19" r="3" />
    <path strokeLinecap="round" d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98" />
  </svg>
);

const ArrowIcon = () => (
  <svg width={14} height={14} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6" />
  </svg>
);

const StarIcon = ({ filled = true }) => (
  <svg width={15} height={15} fill={filled ? '#F0A830' : '#E5E7EB'} viewBox="0 0 24 24">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

// ── Stars Component ───────────────────────────────────────────────────────────
function Stars({ rating, size = 'sm' }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <StarIcon key={i} filled={i <= Math.round(rating)} />
      ))}
    </div>
  );
}

// ── Breadcrumb ────────────────────────────────────────────────────────────────
function Breadcrumb({ product }) {
  return (
    <nav className="flex items-center gap-1.5 text-xs text-[#6B5B45] py-4">
      <span className="text-[#D4860B] cursor-pointer hover:underline font-medium">Home</span>
      <ArrowIcon />
      <span className="text-[#D4860B] cursor-pointer hover:underline font-medium">Products</span>
      <ArrowIcon />
      <span className="text-[#D4860B] cursor-pointer hover:underline font-medium">
        {product.category}
      </span>
      <ArrowIcon />
      <span className="text-[#6B5B45] truncate max-w-[200px]">{product.name}</span>
    </nav>
  );
}

// ── Image Gallery ─────────────────────────────────────────────────────────────
function ImageGallery({ images, productName }) {
  const [selectedIdx, setSelectedIdx] = useState(0);

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image */}
      <div className="relative bg-gradient-to-br from-[#F5ECD7] to-[#E8D5B0] rounded-3xl flex items-center justify-center h-[420px] border border-[#F0E8D4] overflow-hidden group">
        <span className="text-[120px] transition-transform duration-300 group-hover:scale-110">
          {images[selectedIdx]}
        </span>

        {/* Zoom hint */}
        <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm rounded-full px-3 py-1.5 text-xs text-[#6B5B45] font-medium opacity-0 group-hover:opacity-100 transition-opacity">
          🔍 Hover to zoom
        </div>

        {/* Nav arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={() => setSelectedIdx((prev) => (prev - 1 + images.length) % images.length)}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-md text-[#5C3A1E] border-none cursor-pointer transition-all hover:scale-110"
            >
              <svg
                width={16}
                height={16}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                className="rotate-180"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6" />
              </svg>
            </button>
            <button
              onClick={() => setSelectedIdx((prev) => (prev + 1) % images.length)}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-md text-[#5C3A1E] border-none cursor-pointer transition-all hover:scale-110"
            >
              <svg
                width={16}
                height={16}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      <div className="flex gap-3">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setSelectedIdx(i)}
            className={`w-20 h-20 rounded-2xl bg-gradient-to-br from-[#F5ECD7] to-[#E8D5B0] flex items-center justify-center text-3xl cursor-pointer border-none transition-all hover:scale-105
              ${
                selectedIdx === i
                  ? 'ring-2 ring-[#D4860B] ring-offset-2 shadow-md'
                  : 'opacity-60 hover:opacity-100'
              }`}
          >
            {img}
          </button>
        ))}
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center gap-1.5">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setSelectedIdx(i)}
            className={`rounded-full border-none cursor-pointer transition-all
              ${selectedIdx === i ? 'bg-[#D4860B] w-5 h-2' : 'bg-[#E8DDD0] w-2 h-2'}`}
          />
        ))}
      </div>
    </div>
  );
}

// ── Product Info ──────────────────────────────────────────────────────────────
function ProductInfo({ product, onAddToCart }) {
  const [qty, setQty] = useState(1);
  const [wishlisted, setWishlisted] = useState(false);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [added, setAdded] = useState(false);

  const disc = Math.round(((product.mrp - product.price) / product.mrp) * 100);
  const savings = product.mrp - product.price;

  const handleAddToCart = () => {
    onAddToCart(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Category + Badge */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="bg-[#FFF4E0] text-[#D4860B] border border-[#F0C870] rounded-full text-[11px] font-semibold tracking-widest uppercase px-3 py-1">
          {product.category}
        </span>
        {product.badge && (
          <span className="bg-green-600 text-white rounded-full text-[11px] font-bold px-3 py-1">
            ✓ {product.badge}
          </span>
        )}
        {!product.inStock && (
          <span className="bg-red-100 text-red-600 rounded-full text-[11px] font-bold px-3 py-1">
            Out of Stock
          </span>
        )}
      </div>

      {/* Title */}
      <div>
        <h1 className="font-playfair text-[30px] font-bold text-[#5C3A1E] leading-snug">
          {product.name}
        </h1>
        <p className="text-[#6B5B45] text-sm mt-2 leading-relaxed">{product.desc}</p>
      </div>

      {/* Rating Bar */}
      <div className="flex items-center gap-3 pb-4 border-b border-[#F0E8D4]">
        <Stars rating={product.rating} />
        <span className="font-bold text-[#D4860B] text-sm">{product.rating}</span>
        <span className="text-xs text-[#6B5B45]">
          ({product.reviews.toLocaleString()} verified reviews)
        </span>
        <span className="text-xs text-[#D4860B] cursor-pointer hover:underline font-medium ml-auto">
          Write a review
        </span>
      </div>

      {/* Pricing */}
      <div className="bg-[#FFF4E0] rounded-2xl p-4 flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-baseline gap-3">
          <span className="font-playfair text-[42px] font-bold text-[#5C3A1E] leading-none">
            ₹{product.price.toLocaleString()}
          </span>
          <div className="flex flex-col">
            <span className="text-sm text-[#8A9299] line-through">
              ₹{product.mrp.toLocaleString()}
            </span>
            <span className="text-xs text-[#6B5B45]">incl. all taxes</span>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1">
          <span className="bg-green-600 text-white rounded-lg px-3 py-1.5 text-sm font-bold">
            {disc}% OFF
          </span>
          <span className="text-xs text-green-700 font-semibold">
            You save ₹{savings.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Stock status */}
      <div
        className={`flex items-center gap-2.5 rounded-xl px-4 py-3 ${product.inStock ? 'bg-green-50 border border-green-100' : 'bg-orange-50 border border-orange-100'}`}
      >
        <div
          className={`w-2 h-2 rounded-full ${product.inStock ? 'bg-green-500' : 'bg-orange-400'} animate-pulse`}
        />
        <span
          className={`text-sm font-semibold ${product.inStock ? 'text-green-700' : 'text-orange-600'}`}
        >
          {product.inStock ? 'In Stock — Ready to Ship Today' : 'Currently Out of Stock'}
        </span>
        {product.inStock && (
          <span className="text-xs text-green-600 ml-auto">🚚 Ships in 24 hrs</span>
        )}
      </div>

      {/* Color Selector */}
      {product.colors.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-sm font-semibold text-[#5C3A1E]">Color</span>
            <span className="text-xs text-[#D4860B] font-medium">{selectedColor}</span>
          </div>
          <div className="flex gap-2.5 flex-wrap">
            {product.colors.map((c) => (
              <button
                key={c}
                onClick={() => setSelectedColor(c)}
                className={`px-4 py-2 rounded-full text-xs font-semibold cursor-pointer border-none transition-all
                  ${
                    selectedColor === c
                      ? 'bg-[#D4860B] text-white ring-2 ring-[#D4860B] ring-offset-2 shadow-md'
                      : 'bg-white text-[#5C3A1E] border border-[#E8DDD0] hover:border-[#D4860B] hover:text-[#D4860B]'
                  }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quantity + Add to Cart */}
      <div className="flex gap-3 items-center flex-wrap">
        {/* Qty stepper */}
        <div className="flex items-center border border-[#E8DDD0] rounded-full overflow-hidden bg-white">
          <button
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="w-11 h-11 flex items-center justify-center text-[#5C3A1E] border-none bg-transparent cursor-pointer hover:bg-[#FFF4E0] transition-colors"
          >
            <MinusIcon />
          </button>
          <span className="w-10 text-center font-bold text-[15px] text-[#5C3A1E]">{qty}</span>
          <button
            onClick={() => setQty((q) => q + 1)}
            className="w-11 h-11 flex items-center justify-center text-[#5C3A1E] border-none bg-transparent cursor-pointer hover:bg-[#FFF4E0] transition-colors"
          >
            <PlusIcon />
          </button>
        </div>

        {/* Add to Cart */}
        <button
          onClick={handleAddToCart}
          disabled={!product.inStock}
          className={`flex-1 h-11 rounded-full font-semibold text-sm text-white border-none cursor-pointer flex items-center justify-center gap-2 transition-all duration-300
            ${
              product.inStock
                ? added
                  ? 'bg-green-600 scale-95'
                  : 'bg-gradient-to-r from-[#D4860B] to-[#F0A830] hover:from-[#3E2610] hover:to-[#5C3A1E] hover:-translate-y-0.5 shadow-lg shadow-[#D4860B]/30'
                : 'bg-[#D4860B]/40 cursor-not-allowed'
            }`}
        >
          {added ? (
            <>
              <CheckIcon size={16} />
              Added to Cart!
            </>
          ) : (
            <>
              <CartIcon />
              {product.inStock ? 'Add to Cart' : 'Notify Me'}
            </>
          )}
        </button>

        {/* Wishlist */}
        <button
          onClick={() => setWishlisted(!wishlisted)}
          className={`w-11 h-11 rounded-full border-none cursor-pointer flex items-center justify-center transition-all hover:scale-110
            ${
              wishlisted
                ? 'bg-red-50 text-red-500 ring-2 ring-red-200'
                : 'bg-white border border-[#E8DDD0] text-[#8A9299] hover:border-red-300 hover:text-red-400'
            }`}
        >
          <HeartIcon filled={wishlisted} />
        </button>
      </div>

      {/* Buy Now */}
      <button
        disabled={!product.inStock}
        className={`w-full py-3.5 rounded-full font-semibold text-[15px] border-2 cursor-pointer transition-all
          ${
            product.inStock
              ? 'bg-transparent text-[#D4860B] border-[#D4860B] hover:bg-[#D4860B] hover:text-white hover:-translate-y-0.5'
              : 'bg-transparent text-[#D4860B]/40 border-[#D4860B]/40 cursor-not-allowed'
          }`}
      >
        ⚡ Buy Now
      </button>

      {/* Delivery Info Grid */}
      <div className="grid grid-cols-2 gap-3 pt-1">
        {[
          { icon: <TruckIcon />, title: 'Free Delivery', sub: 'On orders above ₹999' },
          { icon: <ShieldIcon />, title: '2-Year Warranty', sub: 'Manufacturer warranty' },
          { icon: <CheckIcon size={18} />, title: 'ISI Certified', sub: 'Quality guaranteed' },
          { icon: '↩️', title: '10-Day Returns', sub: 'Hassle-free returns' },
        ].map((item, i) => (
          <div
            key={i}
            className="flex gap-2.5 items-start bg-[#FFF4E0] rounded-xl p-3 border border-[#F0E8D4]"
          >
            <span className="text-[#D4860B] shrink-0 mt-0.5">
              {typeof item.icon === 'string' ? item.icon : item.icon}
            </span>
            <div>
              <div className="text-xs font-semibold text-[#5C3A1E]">{item.title}</div>
              <div className="text-[10px] text-[#6B5B45] mt-0.5">{item.sub}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Share */}
      <div className="flex items-center gap-3 pt-1 pb-1">
        <span className="text-xs text-[#6B5B45] font-medium">Share:</span>
        {['📘 Facebook', '📷 Instagram', '🐦 Twitter'].map((s) => (
          <button
            key={s}
            className="text-xs text-[#6B5B45] bg-[#F5ECD7] hover:bg-[#FFF4E0] px-3 py-1.5 rounded-full cursor-pointer border-none transition-colors"
          >
            {s}
          </button>
        ))}
        <button className="ml-auto text-[#6B5B45] bg-[#F5ECD7] hover:bg-[#FFF4E0] w-8 h-8 rounded-full cursor-pointer border-none flex items-center justify-center transition-colors">
          <ShareIcon />
        </button>
      </div>
    </div>
  );
}

// ── Tabs Section ──────────────────────────────────────────────────────────────
function ProductTabs({ product }) {
  const [tab, setTab] = useState('description');

  const tabs = [
    { key: 'description', label: 'Description' },
    { key: 'features', label: 'Features & Specs' },
    { key: 'reviews', label: `Reviews (${product.reviews.toLocaleString()})` },
  ];

  return (
    <div className="bg-white rounded-3xl border border-[#F0E8D4] overflow-hidden">
      {/* Tab Header */}
      <div className="flex border-b border-[#F0E8D4] overflow-x-auto">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-6 py-4 text-sm font-semibold whitespace-nowrap border-none cursor-pointer transition-all border-b-2 -mb-px
              ${
                tab === t.key
                  ? 'text-[#D4860B] border-b-[#D4860B] bg-[#FFF4E0]/50'
                  : 'text-[#6B5B45] border-b-transparent bg-transparent hover:text-[#5C3A1E] hover:bg-[#FAFAF7]'
              }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-8">
        {/* Description */}
        {tab === 'description' && (
          <div className="max-w-3xl">
            <h3 className="font-playfair text-xl font-bold text-[#5C3A1E] mb-4">
              Product Description
            </h3>
            <p className="text-[15px] leading-[1.85] text-[#6B5B45] mb-5">{product.desc}</p>
            <p className="text-[15px] leading-[1.85] text-[#6B5B45] mb-5">
              Designed for the modern Indian kitchen, this appliance combines powerful performance
              with elegant design. The stainless steel build ensures durability while the smart
              motor protection prevents overheating.
            </p>
            <div className="bg-[#FFF4E0] rounded-2xl p-5 border-l-4 border-[#D4860B]">
              <p className="text-sm text-[#5C3A1E] font-medium leading-relaxed">
                💡 <strong>Pro Tip:</strong> Add a little water before grinding dry spices to get
                the smoothest consistency and extend the life of your jars.
              </p>
            </div>
          </div>
        )}

        {/* Features */}
        {tab === 'features' && (
          <div>
            {/* Spec Table */}
            <h3 className="font-semibold text-[#5C3A1E] mb-3 text-sm uppercase tracking-wide">
              Specifications
            </h3>
            <div className="rounded-2xl overflow-hidden border border-[#F0E8D4]">
              {[
                ['Motor Power', '750 Watts'],
                ['Number of Jars', '3 (Wet, Dry, Chutney)'],
                ['Jar Material', 'Stainless Steel 304 Grade'],
                ['Speed Settings', '3 Speed + Pulse'],
                ['Warranty', '5 Years (Motor) | 2 Years (Product)'],
                ['Certifications', 'ISI Mark | BIS Certified'],
                ['Weight', '3.8 kg'],
                ['Cord Length', '1.5 meters'],
              ].map(([label, value], i) => (
                <div
                  key={label}
                  className={`flex items-center px-5 py-3.5 text-sm ${i % 2 === 0 ? 'bg-[#FAFAF7]' : 'bg-white'}`}
                >
                  <span className="w-1/2 font-medium text-[#5C3A1E]">{label}</span>
                  <span className="w-1/2 text-[#6B5B45]">{value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Reviews */}
        {tab === 'reviews' && (
          <div>
            {/* Rating Summary */}
            <div className="flex flex-col sm:flex-row gap-8 mb-8 pb-8 border-b border-[#F0E8D4]">
              <div className="text-center shrink-0">
                <div className="font-playfair text-[64px] font-bold text-[#5C3A1E] leading-none">
                  {product.rating}
                </div>
                <div className="flex justify-center mt-2 mb-1">
                  <Stars rating={product.rating} />
                </div>
                <div className="text-xs text-[#6B5B45]">
                  {product.reviews.toLocaleString()} reviews
                </div>
              </div>
              <div className="flex-1 flex flex-col gap-2">
                {[5, 4, 3, 2, 1].map((star) => {
                  const pct =
                    star === 5 ? 68 : star === 4 ? 20 : star === 3 ? 7 : star === 2 ? 3 : 2;
                  return (
                    <div key={star} className="flex items-center gap-2.5 text-xs text-[#6B5B45]">
                      <span className="w-3 text-right shrink-0">{star}</span>
                      <StarIcon filled />
                      <div className="flex-1 h-2 bg-[#F0E8D4] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#D4860B] to-[#F0A830] rounded-full"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <span className="w-7 shrink-0">{pct}%</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Review Cards */}
            <div className="flex flex-col gap-5">
              {TESTIMONIALS.map((t, i) => (
                <div key={i} className="bg-[#FAFAF7] rounded-2xl p-5 border border-[#F0E8D4]">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D4860B] to-[#F0A830] flex items-center justify-center text-white font-bold text-sm shrink-0">
                      {t.initial}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-sm text-[#5C3A1E]">{t.name}</span>
                        <span className="text-xs text-[#8A9299]">·</span>
                        <span className="text-xs text-[#6B5B45]">{t.city}</span>
                        <span className="ml-auto text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
                          ✓ Verified Purchase
                        </span>
                      </div>
                      <div className="flex gap-0.5 mt-1">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <StarIcon key={s} filled={s <= t.rating} />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-[#6B5B45] leading-relaxed">"{t.text}"</p>
                </div>
              ))}
            </div>

            {/* Write Review CTA */}
            <div className="mt-6 text-center">
              <button className="bg-gradient-to-r from-[#D4860B] to-[#F0A830] text-white border-none rounded-full px-8 py-3 text-sm font-semibold cursor-pointer hover:from-[#3E2610] hover:to-[#5C3A1E] transition-all">
                ✏️ Write a Review
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Related Products ──────────────────────────────────────────────────────────
const relatedProducts = [
  {
    id: 2,
    name: 'SteelMaster 5L Pressure Cooker',
    price: 1899,
    mrp: 2599,
    rating: 4.8,
    emoji: '🥘',
    category: 'Pressure Cookers',
  },
  {
    id: 3,
    name: 'CrispAir 4.5L Air Fryer',
    price: 5499,
    mrp: 7999,
    rating: 4.5,
    emoji: '🍟',
    category: 'Air Fryers',
  },
  {
    id: 4,
    name: 'FlameTouch 2000W Induction',
    price: 2199,
    mrp: 2999,
    rating: 4.4,
    emoji: '🔥',
    category: 'Induction',
  },
  {
    id: 5,
    name: 'BrewMate Coffee Maker',
    price: 3799,
    mrp: 4999,
    rating: 4.3,
    emoji: '☕',
    category: 'Coffee Makers',
  },
];

function RelatedCard({ product }) {
  const disc = Math.round(((product.mrp - product.price) / product.mrp) * 100);
  return (
    <div className="bg-white rounded-2xl border border-[#F0E8D4] overflow-hidden cursor-pointer group hover:-translate-y-1.5 transition-transform duration-300 hover:shadow-xl hover:shadow-[#5C3A1E]/10">
      <div className="h-40 bg-gradient-to-br from-[#F5ECD7] to-[#E8D5B0] flex items-center justify-center">
        <span className="text-[64px] group-hover:scale-110 transition-transform">
          {product.emoji}
        </span>
      </div>
      <div className="p-4">
        <div className="text-[10px] text-[#6B5B45] uppercase tracking-wider font-semibold mb-1">
          {product.category}
        </div>
        <div className="font-semibold text-sm text-[#5C3A1E] leading-snug mb-2 line-clamp-2">
          {product.name}
        </div>
        <div className="flex items-center gap-1 mb-3">
          {[1, 2, 3, 4, 5].map((s) => (
            <StarIcon key={s} filled={s <= Math.round(product.rating)} />
          ))}
          <span className="text-[11px] text-[#6B5B45] ml-1">{product.rating}</span>
        </div>
        <div className="flex items-center gap-2 mb-3">
          <span className="font-playfair text-lg font-bold text-[#5C3A1E]">
            ₹{product.price.toLocaleString()}
          </span>
          <span className="text-xs text-[#8A9299] line-through">
            ₹{product.mrp.toLocaleString()}
          </span>
          <span className="text-[11px] font-bold text-green-700 ml-auto">{disc}% off</span>
        </div>
        <button className="w-full py-2 rounded-full text-xs font-semibold text-white bg-gradient-to-r from-[#D4860B] to-[#F0A830] border-none cursor-pointer hover:from-[#3E2610] hover:to-[#5C3A1E] transition-all">
          Add to Cart
        </button>
      </div>
    </div>
  );
}

// ── Main Product Detail Page ──────────────────────────────────────────────────
export default function ProductDetailPage() {
  const product = sampleProduct;

  const handleAddToCart = (product, qty) => {
    alert(`✅ Added ${qty}x "${product.name}" to cart!`);
  };

  return (
    <div className="min-h-screen bg-[#FAFAF7]">
      {/* Page Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-20">
        {/* Breadcrumb */}
        <Breadcrumb product={product} />

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-14">
          <ImageGallery images={product.images} productName={product.name} />
          <ProductInfo product={product} onAddToCart={handleAddToCart} />
        </div>

        {/* Tabs */}
        <div className="mb-14">
          <ProductTabs product={product} />
        </div>

        {/* Related Products */}
        <div>
          <div className="flex items-end justify-between mb-6">
            <div>
              <div className="inline-block bg-[#FFF4E0] text-[#D4860B] border border-[#F0C870] rounded-full text-[11px] font-semibold tracking-widest uppercase px-3 py-1 mb-2">
                You May Also Like
              </div>
              <h2 className="font-playfair text-2xl font-bold text-[#5C3A1E]">Related Products</h2>
            </div>
            <button className="text-sm text-[#D4860B] font-semibold cursor-pointer hover:underline bg-transparent border-none">
              View All →
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {relatedProducts.map((p) => (
              <RelatedCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
