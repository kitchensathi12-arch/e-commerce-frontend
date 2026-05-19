import { EmptyCart } from '@/components/cart/EmptyCart';
import { CartItem } from '@/components/cart/CartItem';
import { CouponBox } from '@/components/cart/CouponBox';
import { OrderSummary } from '@/components/cart/OrderSummary';
import { Check, Gift, Shield, Truck } from 'lucide-react';
import { useState } from 'react';

const initialCart = [
  {
    id: 1,
    name: 'ProBlend 750W Mixer Grinder',
    category: 'Mixer Grinders',
    price: 3299,
    mrp: 4999,
    emoji: '🫙',
    color: 'Silver',
    qty: 1,
    inStock: true,
  },
  {
    id: 2,
    name: 'SteelMaster 5L Pressure Cooker',
    category: 'Pressure Cookers',
    price: 1899,
    mrp: 2599,
    emoji: '🥘',
    color: 'Anodized Silver',
    qty: 2,
    inStock: true,
  },
  {
    id: 3,
    name: 'CrispAir 4.5L Digital Air Fryer',
    category: 'Air Fryers',
    price: 5499,
    mrp: 7999,
    emoji: '🍟',
    color: 'Black',
    qty: 1,
    inStock: true,
  },
  {
    id: 4,
    name: 'BrewMate Drip Coffee Maker',
    category: 'Coffee Makers',
    price: 3799,
    mrp: 4999,
    emoji: '☕',
    color: 'Black',
    qty: 1,
    inStock: false,
  },
];

export default function Cart() {
  const [cartItems, setCartItems] = useState(initialCart);

  /* Cart handlers */
  const updateQty = (id, qty) =>
    setCartItems((prev) => prev.map((i) => (i.id === id ? { ...i, qty } : i)));

  const removeFromCart = (id) => setCartItems((prev) => prev.filter((i) => i.id !== id));

  if (cartItems?.length === 0) {
    return <EmptyCart onShop={() => {}} />;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 py-10 px-5">
      {/* Left — Items + Coupon */}
      <div className="flex flex-col gap-4 ">
        {/* Select all bar */}
        <div className="bg-white rounded-2xl border border-[#F0E8D4] px-5 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-5 h-5 rounded-md bg-linear-to-br from-[#D4860B] to-[#F0A830] flex items-center justify-center text-white">
              <Check />
            </div>
            <span className="text-sm font-semibold text-[#5C3A1E]">
              {cartItems?.filter((i) => i.inStock)?.length} item
              {cartItems?.filter((i) => i.inStock)?.length > 1 ? 's' : ''} selected
            </span>
          </div>
          <button
            // onClick={() => setCartItems([])}
            className="text-xs text-red-400 hover:text-red-600 cursor-pointer bg-transparent border-none font-medium transition-colors"
          >
            Remove All
          </button>
        </div>

        {/* Cart items */}
        {cartItems?.map((item, i) => (
          <div key={item.id} className={`delay-${Math.min(i * 100, 400)}`}>
            <CartItem
              item={item}
              onQtyChange={updateQty}
              onRemove={removeFromCart}
              // onMoveToWishlist={moveToWishlist}
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
        <OrderSummary cartItems={cartItems?.filter((i) => i.inStock)} />

        {/* Delivery info card */}
        <div className="bg-white rounded-2xl border border-[#F0E8D4] p-4">
          <p className="text-xs font-bold text-[#5C3A1E] uppercase tracking-wide mb-3">
            Why shop with us?
          </p>
          <div className="flex flex-col gap-2.5">
            {[
              [<Truck />, 'Free delivery on orders ₹999+'],
              [<Shield />, '2-year manufacturer warranty'],
              ['🔄', '10-day hassle-free returns'],
              [<Gift />, 'EMI available from ₹0 interest'],
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
  );
}
