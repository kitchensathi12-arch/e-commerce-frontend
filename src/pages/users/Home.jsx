import CategoriesCard from '@/components/products/CategoriesCard';
import { ProductCard } from '@/components/products/ProductCards';
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
              <h2 className="font-playfair text-[36px] font-bold text-brown">Best Sellers</h2>
            </div>

            <button className="btn-outline px-6 py-2.5 text-sm">View All</button>
          </div>
          <ProductCard />
        </div>
      </section>

      {/* --------------------------PROMO --------------------------*/}
      <PromotionSection />

      {/* ------------------------------WHY US-------------------------------- */}
      <section className="py-20 px-6 bg-linear-to-br from-brown-dark to-brown text-white">
        <div className="max-w-7xl  text-start">
          <div className="tag mb-3 bg-amber/15 border border-amber/30 text-amber-light">
            Why Choose Us
          </div>

          <h2 className="font-playfair text-[36px] font-bold mb-12">Why KitchenSaathi?</h2>

          <div className="grid md:grid-cols-4 gap-7">
            {[
              {
                emoji: '🏆',
                title: 'Premium Quality',
                desc: 'Only ISI-certified appliances from trusted brands',
              },
              {
                emoji: '💰',
                title: 'Best Prices',
                desc: 'Lowest prices guaranteed with no hidden charges',
              },
              {
                emoji: '🔧',
                title: 'After-Sales Service',
                desc: 'Dedicated support team & free installation',
              },
              { emoji: '📦', title: 'Fast Delivery', desc: 'Same-day dispatch for metro cities' },
            ].map((f, i) => (
              <div
                key={i}
                className="rounded-[20px] p-8 bg-white/5 border border-white/10 hover:bg-amber/10 transition"
              >
                <div className="text-[44px] mb-4">{f.emoji}</div>

                <div className="font-playfair text-[18px] font-semibold mb-2">{f.title}</div>

                <div className="text-sm text-white/70 leading-6">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
