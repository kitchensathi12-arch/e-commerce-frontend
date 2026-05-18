import BrandSlider from '@/components/products/BrandSection';
import CategoriesCard from '@/components/products/CategoriesCard';
import ProductList from '@/components/products/ProductList';
import PromotionSection from '@/components/products/PromotionSection';
import Button from '@/components/ui/Buttons';

const HomePage = () => {
  return (
    <div>
      {/* HERO */}
      <section className="min-h-[92vh] flex items-center pt-27.5 pb-15 relative overflow-hidden bg-linear-to-br from-brown-dark via-brown to-[#7A4B22]">
        <div className="absolute -top-20 -right-20 w-120 h-120 rounded-full bg-amber/10" />
        <div className="absolute -bottom-24 -left-16 w-95 h-95 rounded-full bg-amber/5" />
        <div className="absolute top-[30%] right-[8%] w-60 h-60 rounded-full border border-amber/20" />

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-15 items-center w-full">
          {/* TEXT */}
          <div>
            <div className="tag mb-6">✨ India's Trusted Kitchen Store</div>

            <h1 className="fade-up delay-1 font-playfair text-[clamp(36px,5vw,62px)] font-bold text-white leading-[1.12] mb-5">
              Cook Better.
              <br />
              <span className="text-amber-light">Live Better.</span>
              <br />
              Every Day.
            </h1>

            <p className="fade-up delay-2 text-[17px] text-white/70 leading-7 tracking-[1px] mb-9 max-w-115">
              Discover premium kitchen appliances that transform your cooking experience. From
              powerful mixer grinders to smart induction cooktops — find everything for the modern
              Indian kitchen.
            </p>

            <div className="fade-up delay-3 flex gap-3.5 flex-wrap">
              <Button size="lg" className="px-8 py-3.5">
                Shop Now →
              </Button>

              <Button variant="outline" size="lg">
                View Offers
              </Button>
            </div>

            <div className="fade-up delay-4 flex gap-5 mt-9 flex-wrap text-white/60 text-[13px]">
              {[
                ['🚚', 'Free Delivery'],
                ['🔒', 'Secure Payment'],
                ['↩️', 'Easy Returns'],
              ].map(([ic, l]) => (
                <div key={l} className="flex items-center gap-1.5">
                  <span className="text-base">{ic}</span>
                  {l}
                </div>
              ))}
            </div>
          </div>

          {/* HERO VISUAL */}
          <div className="fade-up delay-2 flex justify-center items-center">
            <div className="float relative w-85 h-85 rounded-full bg-amber/10 border border-amber/20 flex items-center justify-center">
              <div className="w-65 h-65 rounded-full bg-amber/10 flex items-center justify-center text-[120px]">
                🫕
              </div>

              {[
                { emoji: '🫙', angle: 0 },
                { emoji: '☕', angle: 72 },
                { emoji: '🍟', angle: 144 },
                { emoji: '🔥', angle: 216 },
                { emoji: '🥘', angle: 288 },
              ].map(({ emoji, angle }) => {
                const rad = (angle * Math.PI) / 180;
                const r = 165;

                return (
                  <div
                    key={angle}
                    className="absolute w-12 h-12 rounded-xl bg-white/10 border border-amber/25 flex items-center justify-center text-2xl backdrop-blur-md"
                    style={{
                      left: `calc(50% + ${Math.cos(rad) * r}px - 24px)`,
                      top: `calc(50% + ${Math.sin(rad) * r}px - 24px)`,
                    }}
                  >
                    {emoji}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

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
