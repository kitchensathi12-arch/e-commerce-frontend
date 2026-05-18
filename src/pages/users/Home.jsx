import EcommerceBannerSlider from '@/components/Banner';
import BrandSlider from '@/components/products/BrandSection';
import CategoriesCard from '@/components/products/CategoriesCard';
import ProductList from '@/components/products/ProductList';
import PromotionSection from '@/components/products/PromotionSection';

const HomePage = () => {
  return (
    <div>
      {/* ----------------- banner section -----------------  */}
      <EcommerceBannerSlider/>
    

      {/* ----------------- CATEGORIES ---------------- */}
      <CategoriesCard />

      {/*----------------------- FEATURED PRODUCTS ------------------------ */}
      <section className=" px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <div className="tag mb-3">Featured</div>
              <h2 className="font-playfair text-[36px] font-bold text-brown">Featured Products</h2>
            </div>

            <button className="btn-outline px-6 py-2.5 text-sm">View All</button>
          </div>
          <ProductList />
        </div>
      </section>

      {/* --------------------------PROMO --------------------------*/}
      <PromotionSection />

      {/*------------------------- BRAND SECTION -------------------*/}
      <BrandSlider />

      {/* ------------------------------WHY US-------------------------------- */}
      <section
        className="py-16 sm:py-20 px-4 sm:px-6 bg-off-white"
        style={{ background: 'linear-gradient(to bottom, #e8d8b8 0%, #fafaf7 120px)' }}
      >
        <div className="max-w-7xl mx-auto text-center">
          <span className="tag mb-3 sm:mb-4 text-xs sm:text-sm">✦ Why Choose Us</span>

          <h2 className="font-playfair text-3xl sm:text-4xl md:text-[42px] font-bold text-text tracking-tight mb-3 sm:mb-4">
            Why <span className="text-amber">KitchenSaathi?</span>
          </h2>

          <p className="text-text-muted text-sm sm:text-[15px] max-w-md mx-auto leading-relaxed font-dm-sans mb-10 sm:mb-14">
            Everything you need for your kitchen — quality, price, and service all in one place.
          </p>

          <div className="w-14 h-px bg-amber/40 mx-auto mb-10 sm:mb-14" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
            {[
              {
                icon: '🏆',
                title: 'Premium Quality',
                desc: 'Only ISI-certified appliances from trusted brands',
              },
              {
                icon: '💰',
                title: 'Best Prices',
                desc: 'Lowest prices guaranteed with no hidden charges',
              },
              {
                icon: '🔧',
                title: 'After-Sales Service',
                desc: 'Dedicated support team & free installation',
              },
              { icon: '📦', title: 'Fast Delivery', desc: 'Same-day dispatch for metro cities' },
            ].map((f, i) => (
              <div
                key={i}
                className="
            group relative text-left overflow-hidden
            rounded-[20px] p-6 sm:p-7 md:p-8
            bg-white border border-border
            hover:border-amber/50
            hover:shadow-[0_8px_32px_rgba(212,134,11,0.12)]
            hover:-translate-y-1
            transition-all duration-300 ease-out
          "
              >
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-amber/30 group-hover:bg-amber transition-colors duration-300" />

                <div
                  className="
            w-12 h-12 sm:w-14 sm:h-14 mb-5 sm:mb-6
            rounded-2xl bg-amber-pale border border-amber/20
            flex items-center justify-center
            text-2xl sm:text-[28px]
            group-hover:scale-110 group-hover:-rotate-3
            transition-transform duration-300
          "
                >
                  {f.icon}
                </div>

                <h3 className="font-playfair text-[16px] sm:text-[17px] md:text-[18px] font-bold text-text mb-2">
                  {f.title}
                </h3>

                <p className="text-sm text-text-muted leading-relaxed font-dm-sans">{f.desc}</p>

                <div className="h-px w-6 bg-amber/30 mt-4 sm:mt-5 transition-all duration-300 group-hover:w-12 group-hover:bg-amber" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
