import { Headphones, ShieldCheck, Truck } from 'lucide-react';

const NewArrivals = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      {/* Trust Badges */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-12 pt-16">
        <div className="flex flex-col items-center text-center">
          <div className="w-20 h-20 bg-orange-100 rounded-3xl flex items-center justify-center mb-6">
            <Truck className="w-10 h-10 text-[#e63939]" />
          </div>
          <h4 className="font-semibold text-xl mb-2">FREE & FAST DELIVERY</h4>
          <p className="text-gray-500">Free delivery on all orders above ₹999</p>
        </div>

        <div className="flex flex-col items-center text-center">
          <div className="w-20 h-20 bg-orange-100 rounded-3xl flex items-center justify-center mb-6">
            <Headphones className="w-10 h-10 text-[#e63939]" />
          </div>
          <h4 className="font-semibold text-xl mb-2">24/7 CUSTOMER SUPPORT (AI Chatbot)</h4>
          <p className="text-gray-500">Expert help for your kitchen needs</p>
        </div>

        <div className="flex flex-col items-center text-center">
          <div className="w-20 h-20 bg-orange-100 rounded-3xl flex items-center justify-center mb-6">
            <ShieldCheck className="w-10 h-10 text-[#e63939]" />
          </div>
          <h4 className="font-semibold text-xl mb-2">MONEY BACK GUARANTEE</h4>
          <p className="text-gray-500">10 days easy return policy</p>
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;
