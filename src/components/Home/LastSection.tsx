import { Headphones, ShieldCheck, Truck } from 'lucide-react';

const NewArrivals = () => {
  return (
    <section className="w-full py-12 md:py-16 bg-gradient-to-br from-rose-50 via-white to-red-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">

          {/* Card 1 */}
          <div className="group flex items-center gap-5 bg-white border border-rose-100 rounded-2xl px-6 py-5 shadow-[0_2px_12px_rgba(192,57,43,0.06)] hover:shadow-[0_8px_28px_rgba(192,57,43,0.12)] hover:-translate-y-1 transition-all duration-300">
            <div className="flex-shrink-0 w-14 h-14 bg-red-50 border border-red-100 rounded-2xl flex items-center justify-center group-hover:bg-red-600 transition-colors duration-300">
              <Truck className="w-7 h-7 text-red-500 group-hover:text-white transition-colors duration-300" />
            </div>
            <div>
              <h4 className="font-semibold text-rose-950 text-sm sm:text-base leading-tight mb-1">
                Free & Fast Delivery
              </h4>
              <p className="text-rose-400 text-xs sm:text-sm leading-relaxed">
                Free delivery on all orders above ₹999
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="group flex items-center gap-5 bg-white border border-rose-100 rounded-2xl px-6 py-5 shadow-[0_2px_12px_rgba(192,57,43,0.06)] hover:shadow-[0_8px_28px_rgba(192,57,43,0.12)] hover:-translate-y-1 transition-all duration-300">
            <div className="flex-shrink-0 w-14 h-14 bg-red-50 border border-red-100 rounded-2xl flex items-center justify-center group-hover:bg-red-600 transition-colors duration-300">
              <Headphones className="w-7 h-7 text-red-500 group-hover:text-white transition-colors duration-300" />
            </div>
            <div>
              <h4 className="font-semibold text-rose-950 text-sm sm:text-base leading-tight mb-1">
                24/7 Customer Support
              </h4>
              <p className="text-rose-400 text-xs sm:text-sm leading-relaxed">
                AI-powered help for your kitchen needs
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="group flex items-center gap-5 bg-white border border-rose-100 rounded-2xl px-6 py-5 shadow-[0_2px_12px_rgba(192,57,43,0.06)] hover:shadow-[0_8px_28px_rgba(192,57,43,0.12)] hover:-translate-y-1 transition-all duration-300">
            <div className="flex-shrink-0 w-14 h-14 bg-red-50 border border-red-100 rounded-2xl flex items-center justify-center group-hover:bg-red-600 transition-colors duration-300">
              <ShieldCheck className="w-7 h-7 text-red-500 group-hover:text-white transition-colors duration-300" />
            </div>
            <div>
              <h4 className="font-semibold text-rose-950 text-sm sm:text-base leading-tight mb-1">
                Money Back Guarantee
              </h4>
              <p className="text-rose-400 text-xs sm:text-sm leading-relaxed">
                10 days easy return policy
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default NewArrivals;