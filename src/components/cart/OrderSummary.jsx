import { Truck } from 'lucide-react';

export function OrderSummary({ cartItems }) {
  const subtotal = cartItems?.reduce((s, i) => s + i.mrp * i.qty, 0);
  const discount = cartItems?.reduce((s, i) => s + (i.mrp - i.price) * i.qty, 0);
  const delivery = subtotal - discount > 999 ? 0 : 99;
  const total = subtotal - discount + delivery;

  const rows = [
    { label: 'MRP Total', value: `₹${subtotal?.toLocaleString()}`, muted: true },
    { label: 'Product Discount', value: `-₹${discount?.toLocaleString()}`, green: true },
    {
      label: 'Delivery Charges',
      value: delivery === 0 ? 'FREE' : `₹${delivery}`,
      green: delivery === 0,
    },
    { label: 'Platform Fee', value: 'FREE', green: true },
  ];

  return (
    <div className="bg-white rounded-2xl border border-[#F0E8D4] overflow-hidden animate-slide-left">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#5C3A1E] to-[#7A4B22] px-5 py-4">
        <h3 className="font-playfair font-bold text-white text-lg">Order Summary</h3>
        <p className="text-[#F0A830] text-xs mt-0.5">
          {cartItems?.length} item{cartItems?.length !== 1 ? 's' : ''} in your cart
        </p>
      </div>

      <div className="p-5">
        {/* Line items */}
        <div className="flex flex-col gap-3 pb-4 border-b border-[#F0E8D4]">
          {rows?.map((r) => (
            <div key={r.label} className="flex justify-between items-center text-sm">
              <span className="text-[#6B5B45]">{r.label}</span>
              <span
                className={`font-semibold ${r.green ? 'text-green-700' : r.muted ? 'text-[#8A9299] line-through' : 'text-[#5C3A1E]'}`}
              >
                {r.value}
              </span>
            </div>
          ))}
        </div>

        {/* Total */}
        <div className="flex justify-between items-center pt-4 pb-4 border-b border-[#F0E8D4]">
          <span className="font-bold text-[#5C3A1E]">Total Amount</span>
          <span className="font-playfair font-bold text-2xl text-[#5C3A1E]">
            ₹{total?.toLocaleString()}
          </span>
        </div>

        {/* Savings callout */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-100 rounded-xl px-4 py-3 my-4 flex items-center gap-2">
          <span className="text-green-600 text-lg">🎉</span>
          <div>
            <p className="text-xs font-bold text-green-700">
              You're saving ₹{discount?.toLocaleString()} on this order!
            </p>
            <p className="text-[10px] text-green-600">Best deal for today</p>
          </div>
        </div>

        {/* CTA */}
        <button className="shimmer-btn w-full py-3.5 rounded-2xl font-bold text-[15px] text-white bg-gradient-to-r from-[#D4860B] to-[#F0A830] border-none cursor-pointer hover:from-[#3E2610] hover:to-[#5C3A1E] transition-all shadow-lg shadow-[#D4860B]/25 flex items-center justify-center gap-2">
          <Truck />
          Proceed to Checkout
        </button>
        <p className="text-center text-[10px] text-[#8A9299] mt-2.5">
          🔒 100% Secure & Encrypted Checkout
        </p>

        {/* Trust badges */}
        <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-[#F0E8D4]">
          {[
            ['🚚', 'Free Delivery'],
            ['↩️', 'Easy Returns'],
            ['🛡️', 'Secure Pay'],
          ].map(([ic, lbl]) => (
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
