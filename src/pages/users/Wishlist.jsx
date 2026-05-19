import { EmptyWishlist } from '@/components/wishlist/EmptyWishlist';
import { WishlistCard } from '@/components/wishlist/WishlistCard';
import { ShoppingCart, Trash2 } from 'lucide-react';
import { useState } from 'react';

const initialWishlist = [
  {
    id: 5,
    name: 'ChefPro 10-Piece Cookware Set',
    category: 'Cookware Sets',
    price: 8499,
    mrp: 12999,
    emoji: '🍲',
    rating: 4.7,
    reviews: 203,
  },
  {
    id: 6,
    name: 'FlameTouch 2000W Induction',
    category: 'Induction Cooktops',
    price: 2199,
    mrp: 2999,
    emoji: '🔥',
    rating: 4.4,
    reviews: 478,
  },
  {
    id: 7,
    name: 'SpiceMaster Wet Grinder',
    category: 'Wet Grinders',
    price: 4599,
    mrp: 6500,
    emoji: '🥣',
    rating: 4.6,
    reviews: 321,
  },
  {
    id: 8,
    name: 'SteelKing 3L Pressure Pan',
    category: 'Pressure Cookers',
    price: 1299,
    mrp: 1799,
    emoji: '🍵',
    rating: 4.3,
    reviews: 156,
  },
];

const Wishlist = () => {
  const [wishlist, setWishlist] = useState(initialWishlist);
  return (
    <div className="p-6 lg:p-10">
      {/* Toolbar */}
      {wishlist.length > 0 && (
        <div className="flex items-center justify-between mb-6 animate-fade-in">
          <p className="text-sm text-[#6B5B45]">
            <span className="font-semibold text-[#5C3A1E]">{wishlist.length}</span> items saved
          </p>
          <div className="flex gap-2">
            <button
              // onClick={() => {
              //     wishlist.forEach(item => {
              //         setCartItems(prev =>
              //             prev.find(c => c.id === item.id) ? prev : [...prev, { ...item, qty: 1, color: "Default", inStock: true }]
              //         );
              //     });
              //     setWishlist([]);
              // }}
              className="shimmer-btn flex items-center gap-1.5 bg-gradient-to-r from-[#D4860B] to-[#F0A830] text-white border-none cursor-pointer px-4 py-2 rounded-xl text-xs font-semibold hover:from-[#3E2610] hover:to-[#5C3A1E] transition-all"
            >
              <ShoppingCart /> Add All to Cart
            </button>
            <button
              onClick={() => setWishlist([])}
              className="flex items-center gap-1.5 bg-white text-red-400 border border-red-100 cursor-pointer px-4 py-2 rounded-xl text-xs font-semibold hover:bg-red-50 hover:text-red-600 transition-all"
            >
              <Trash2 /> Clear All
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
                // onMoveToCart={moveToCart}
                // onRemove={removeFromWishlist}
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
              {
                id: 9,
                name: 'Non-Stick Tawa 28cm',
                price: 799,
                mrp: 1199,
                emoji: '🥞',
                category: 'Cookware',
              },
              {
                id: 10,
                name: 'Glass Water Kettle 1.7L',
                price: 1499,
                mrp: 2200,
                emoji: '🫖',
                category: 'Kettles',
              },
              {
                id: 11,
                name: 'Wooden Cutting Board',
                price: 549,
                mrp: 799,
                emoji: '🪵',
                category: 'Accessories',
              },
              {
                id: 12,
                name: 'Stainless Ladle Set 5pc',
                price: 399,
                mrp: 599,
                emoji: '🥄',
                category: 'Utensils',
              },
            ].map((p) => {
              const d = Math.round(((p.mrp - p.price) / p.mrp) * 100);
              return (
                <div
                  key={p.id}
                  className="bg-white rounded-2xl border border-[#F0E8D4] overflow-hidden card-hover cursor-pointer animate-fade-slide-up"
                >
                  <div className="h-32 bg-gradient-to-br from-[#F5ECD7] to-[#E8D5B0] flex items-center justify-center text-5xl">
                    {p.emoji}
                  </div>
                  <div className="p-3">
                    <p className="text-[10px] text-[#6B5B45] font-semibold uppercase tracking-wide mb-1">
                      {p.category}
                    </p>
                    <p className="font-semibold text-xs text-[#5C3A1E] leading-snug mb-2">
                      {p.name}
                    </p>
                    <div className="flex items-center gap-1.5 mb-2">
                      <span className="font-playfair font-bold text-sm text-[#5C3A1E]">
                        ₹{p.price}
                      </span>
                      <span className="text-[11px] text-[#8A9299] line-through">₹{p.mrp}</span>
                      <span className="text-[10px] font-bold text-green-700 ml-auto">{d}%</span>
                    </div>
                    <button
                      onClick={() =>
                        setWishlist((prev) =>
                          prev.find((w) => w.id === p.id)
                            ? prev
                            : [...prev, { ...p, rating: 4.5, reviews: 50 }]
                        )
                      }
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
  );
};

export default Wishlist;
