import { Check, Tag } from 'lucide-react';
import { useState } from 'react';

export function CouponBox() {
  const [code, setCode] = useState('');
  const [applied, setApplied] = useState(false);
  const [error, setError] = useState(false);

  const handleApply = () => {
    if (code.toUpperCase() === 'SAATHI10') {
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
        <span className="text-[#D4860B]">
          <Tag />
        </span>
        <span className="font-semibold text-sm text-[#5C3A1E]">Apply Coupon</span>
      </div>

      <div className="flex gap-2">
        <input
          value={code}
          onChange={(e) => {
            setCode(e.target.value.toUpperCase());
            setError(false);
            setApplied(false);
          }}
          placeholder="Enter coupon code"
          className={`flex-1 border rounded-xl px-4 py-2.5 text-sm font-medium tracking-wider placeholder:font-normal placeholder:tracking-normal focus:ring-2 transition-all
            ${
              applied
                ? 'border-green-400 bg-green-50 focus:ring-green-200 text-green-700'
                : error
                  ? 'border-red-300 bg-red-50 focus:ring-red-100 text-red-600'
                  : 'border-[#E8DDD0] bg-[#FAFAF7] focus:border-[#D4860B] focus:ring-[#D4860B]/20 text-[#5C3A1E]'
            }`}
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
          <Check /> "SAATHI10" applied! You save ₹500 extra.
        </p>
      )}
      {error && (
        <p className="text-xs text-red-500 mt-2 animate-fade-in">
          Invalid coupon. Try{' '}
          <span className="font-bold cursor-pointer" onClick={() => setCode('SAATHI10')}>
            SAATHI10
          </span>
        </p>
      )}

      {/* Available coupons */}
      <div className="mt-3 pt-3 border-t border-[#F0E8D4]">
        <p className="text-[11px] text-[#8A9299] mb-2 font-medium uppercase tracking-wide">
          Available offers
        </p>
        <div className="flex flex-col gap-1.5">
          {[
            { code: 'SAATHI10', desc: '₹500 off on orders above ₹5,000' },
            { code: 'FIRST15', desc: '15% off on your first order' },
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
