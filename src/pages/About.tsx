import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, HeadphonesIcon, Wrench, PackageCheck, BadgePercent, Truck } from 'lucide-react';

const About = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-white font-sans">
      {/* HERO SECTION */}
      <section className="relative bg-red-700 text-white py-24 px-6 text-center overflow-hidden">
        <div className="absolute top-[-60px] right-[-60px] w-64 h-64 rounded-full bg-white opacity-5" />
        <div className="absolute bottom-[-80px] left-[-40px] w-52 h-52 rounded-full bg-white opacity-5" />
        <div className="max-w-4xl mx-auto relative z-10">
          <p className="text-red-200 text-xs uppercase tracking-widest mb-3 font-medium">Power Tool & Kitchen Appliance Store</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-5 tracking-tight leading-tight">
            Your One-Stop Destination for <br className="hidden md:block" />
            Quality Tools & Appliances
          </h1>
          <p className="text-base md:text-lg text-red-100 max-w-2xl mx-auto leading-relaxed">High-quality tools, appliances, genuine spare parts, and reliable repair services — all under one roof.</p>
        </div>
      </section>

      {/* WHO WE ARE */}
      <section className="py-20 px-6 max-w-6xl mx-auto grid md:grid-cols-2 gap-14 items-center">
        <div>
          <img src="/Bg.jpg" alt="Our Store" className="rounded-2xl shadow-lg w-full object-cover" />
        </div>

        <div>
          <div className="w-12 h-1 bg-red-600 rounded-full mb-5" />
          <h2 className="text-3xl font-bold mb-5">Who We Are</h2>
          <p className="text-gray-500 leading-relaxed mb-4 text-sm">
            Welcome to our Power Tool & Kitchen Appliance Store — your one-stop destination for high-quality tools, appliances, and reliable repair services.
          </p>
          <p className="text-gray-500 leading-relaxed mb-4 text-sm">
            We specialize in offering a <span className="font-semibold text-gray-700">wide range of products</span>, including mixer grinders, hand tools, power tools, cutting machines, drilling
            machines, and genuine spare parts. Whether you're a DIY enthusiast, a professional technician, or simply looking for durable home appliances, we have everything you need.
          </p>
          <p className="text-gray-500 leading-relaxed text-sm">
            We are committed to building long-term relationships with our customers by ensuring <span className="font-semibold text-gray-700">quality, trust, and satisfaction</span> in every purchase.
          </p>
        </div>
      </section>

      {/* MISSION BANNER */}
      <section className="bg-red-700 py-16 px-6">
        <div className="max-w-4xl mx-auto text-center text-white">
          <div className="w-12 h-1 bg-white/40 rounded-full mx-auto mb-6" />
          <h2 className="text-2xl md:text-3xl font-bold mb-5">Our Mission</h2>
          <p className="text-red-100 leading-relaxed text-base max-w-2xl mx-auto">
            To provide <span className="text-white font-semibold">top-quality products at affordable prices</span>, backed by excellent customer service. We understand how important your tools and
            appliances are in daily life, which is why we also offer <span className="text-white font-semibold">expert repair services</span>, especially for mixer grinders and other essential
            equipment.
          </p>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <div className="w-12 h-1 bg-red-600 rounded-full mx-auto mb-4" />
          <h2 className="text-3xl font-bold">Why Choose Us?</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-11 h-11 rounded-xl bg-red-50 flex items-center justify-center mb-5">
              <PackageCheck className="w-5 h-5 text-red-600" />
            </div>
            <h4 className="font-semibold mb-2 text-base">Wide Product Range</h4>
            <p className="text-gray-500 text-sm leading-relaxed">Wide variety of trusted products — from power tools to kitchen appliances and genuine spare parts.</p>
          </div>

          <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-11 h-11 rounded-xl bg-red-50 flex items-center justify-center mb-5">
              <ShieldCheck className="w-5 h-5 text-red-600" />
            </div>
            <h4 className="font-semibold mb-2 text-base">Genuine Spare Parts</h4>
            <p className="text-gray-500 text-sm leading-relaxed">Authentic spare parts and accessories for all major brands, ensuring longevity and performance.</p>
          </div>

          <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-11 h-11 rounded-xl bg-red-50 flex items-center justify-center mb-5">
              <BadgePercent className="w-5 h-5 text-red-600" />
            </div>
            <h4 className="font-semibold mb-2 text-base">Affordable Pricing</h4>
            <p className="text-gray-500 text-sm leading-relaxed">Affordable pricing with great deals — premium quality without breaking the bank.</p>
          </div>

          <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-11 h-11 rounded-xl bg-red-50 flex items-center justify-center mb-5">
              <Wrench className="w-5 h-5 text-red-600" />
            </div>
            <h4 className="font-semibold mb-2 text-base">Expert Repair Services</h4>
            <p className="text-gray-500 text-sm leading-relaxed">Professional repair and maintenance services, especially for mixer grinders and essential equipment.</p>
          </div>

          <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-11 h-11 rounded-xl bg-red-50 flex items-center justify-center mb-5">
              <Truck className="w-5 h-5 text-red-600" />
            </div>
            <h4 className="font-semibold mb-2 text-base">Fast Delivery</h4>
            <p className="text-gray-500 text-sm leading-relaxed">Quick and secure shipping across the country with real-time tracking and reliable support.</p>
          </div>

          <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-11 h-11 rounded-xl bg-red-50 flex items-center justify-center mb-5">
              <HeadphonesIcon className="w-5 h-5 text-red-600" />
            </div>
            <h4 className="font-semibold mb-2 text-base">24/7 Support</h4>
            <p className="text-gray-500 text-sm leading-relaxed">Dedicated customer support for a smooth and hassle-free experience at every step.</p>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="bg-red-700 py-16 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-5">
          <div className="bg-white/10 border border-white/20 rounded-2xl p-7 text-center text-white">
            <div className="w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center mx-auto mb-4">
              <svg className="w-5 h-5" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path strokeLinecap="round" d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <p className="text-2xl font-bold">10.5k</p>
            <p className="text-red-200 text-xs mt-1">Sellers active on site</p>
          </div>

          <div className="bg-white rounded-2xl p-7 text-center shadow-md">
            <div className="w-11 h-11 rounded-xl bg-red-100 flex items-center justify-center mx-auto mb-4">
              <svg className="w-5 h-5" fill="none" stroke="#C0392B" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" />
                <path strokeLinecap="round" d="M12 6v6l4 2" />
              </svg>
            </div>
            <p className="text-2xl font-bold text-red-700">33k</p>
            <p className="text-gray-400 text-xs mt-1">Monthly product sales</p>
          </div>

          <div className="bg-white/10 border border-white/20 rounded-2xl p-7 text-center text-white">
            <div className="w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center mx-auto mb-4">
              <svg className="w-5 h-5" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <p className="text-2xl font-bold">45.5k</p>
            <p className="text-red-200 text-xs mt-1">Customers active on site</p>
          </div>

          <div className="bg-white/10 border border-white/20 rounded-2xl p-7 text-center text-white">
            <div className="w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center mx-auto mb-4">
              <svg className="w-5 h-5" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
                <rect x="2" y="3" width="20" height="14" rx="2" />
                <path strokeLinecap="round" d="M8 21h8M12 17v4" />
              </svg>
            </div>
            <p className="text-2xl font-bold">25k</p>
            <p className="text-red-200 text-xs mt-1">Annual gross sale in site</p>
          </div>
        </div>
      </section>

      {/* MISSION & VISION CARDS */}
      <section className="bg-gray-50 py-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
          <div className="bg-white p-10 rounded-2xl border border-gray-100 shadow-sm">
            <div className="w-8 h-1 bg-red-600 rounded-full mb-4" />
            <h3 className="text-xl font-semibold mb-3">Our Mission</h3>
            <p className="text-gray-500 leading-relaxed text-sm">
              To provide top-quality tools and appliances at affordable prices, backed by expert repair services and excellent customer support that simplifies your daily life.
            </p>
          </div>

          <div className="bg-white p-10 rounded-2xl border border-gray-100 shadow-sm">
            <div className="w-8 h-1 bg-red-600 rounded-full mb-4" />
            <h3 className="text-xl font-semibold mb-3">Our Vision</h3>
            <p className="text-gray-500 leading-relaxed text-sm">
              To become the most trusted destination for power tools, kitchen appliances, and repair services — built on a foundation of quality, trust, and long-term customer relationships.
            </p>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-20 px-6 text-center">
        <div className="w-12 h-1 bg-red-600 rounded-full mx-auto mb-6" />
        <h2 className="text-3xl font-bold mb-4">Ready to Shop or Need a Repair?</h2>
        <p className="text-gray-500 text-sm mb-8 max-w-md mx-auto">Explore our wide range of products or get in touch for expert repair services today.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/" className="inline-block bg-red-700 text-white px-10 py-3 rounded-full hover:bg-red-800 transition text-sm font-medium">
            Shop Now
          </Link>
          <button onClick={() => navigate('/contact')} className="inline-block border border-red-700 text-red-700 px-10 py-3 rounded-full hover:bg-red-50 transition text-sm font-medium">
            Contact Us
          </button>
        </div>
      </section>
    </div>
  );
};

export default About;
