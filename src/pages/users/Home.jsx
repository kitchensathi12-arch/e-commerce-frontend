import CategoriesCard from "@/components/products/categoriesCard";
import { ProductCard } from "@/components/products/ProductCards";
import { Stars } from "@/components/Stars";
import Button from "@/components/ui/Buttons";

const TESTIMONIALS = [
  { name: "Priya Sharma", city: "Delhi", text: "The ProBlend mixer is fantastic! Grinds coconut chutney in seconds. The 5-year warranty gives great peace of mind.", rating: 5, initial: "P" },
  { name: "Rahul Verma", city: "Mumbai", text: "Got the pressure cooker for my mom. She loves how quickly it cooks dal and rice. Build quality is excellent.", rating: 5, initial: "R" },
  { name: "Anita Reddy", city: "Hyderabad", text: "Air fryer changed our eating habits! The kids now love healthy snacks. Delivery was super fast too.", rating: 4, initial: "A" },
];


const CATEGORIES = [
  { id: 1, name: "Mixer Grinders", emoji: "🫙", count: 48 },
  { id: 2, name: "Pressure Cookers", emoji: "🥘", count: 32 },
  { id: 3, name: "Induction Cooktops", emoji: "🔥", count: 27 },
  { id: 4, name: "Air Fryers", emoji: "🍟", count: 19 },
  { id: 5, name: "Cookware Sets", emoji: "🍲", count: 56 },
  { id: 6, name: "Coffee Makers", emoji: "☕", count: 23 },
];


const PRODUCTS = [
  {
    id: 1,
    name: "ProBlend 750W Mixer Grinder",
    category: "Mixer Grinders",
    price: 3299,
    mrp: 4999,
    rating: 4.6,
    reviews: 1248,
    badge: "Best Seller",
    emoji: "🫙",
    desc: "Powerful 750W motor with 3 stainless steel jars. Perfect for grinding spices, making chutneys, and preparing smooth batters.",
    colors: ["Silver", "White", "Black"],
    features: ["750W Motor", "3 SS Jars", "5-Year Warranty", "Overload Protection", "ISI Certified"],
    inStock: true,
    images: ["🫙", "⚙️", "🔩"],
  },
  {
    id: 2,
    name: "SteelMaster 5L Pressure Cooker",
    category: "Pressure Cookers",
    price: 1899,
    mrp: 2599,
    rating: 4.8,
    reviews: 892,
    badge: "Top Rated",
    emoji: "🥘",
    desc: "ISI-marked hard anodized pressure cooker with inner lid design. Suitable for gas, induction, and electric cooktops.",
    colors: ["Anodized Silver"],
    features: ["Hard Anodized", "5 Litre", "Induction Compatible", "ISI Marked", "2-Year Warranty"],
    inStock: true,
    images: ["🥘", "🫕", "🍲"],
  },
  {
    id: 3,
    name: "CrispAir 4.5L Digital Air Fryer",
    category: "Air Fryers",
    price: 5499,
    mrp: 7999,
    rating: 4.5,
    reviews: 634,
    badge: "31% Off",
    emoji: "🍟",
    desc: "Digital touchscreen air fryer with 8 preset cooking modes. Enjoy guilt-free crispy food with 85% less oil.",
    colors: ["Black", "White"],
    features: ["4.5L Capacity", "1400W", "8 Presets", "Auto Shutoff", "BPA-Free Basket"],
    inStock: true,
    images: ["🍟", "🍗", "🥕"],
  },
  {
    id: 4,
    name: "FlameTouch 2000W Induction",
    category: "Induction Cooktops",
    price: 2199,
    mrp: 2999,
    rating: 4.4,
    reviews: 478,
    badge: "New",
    emoji: "🔥",
    desc: "Smart induction cooktop with 10 power levels and auto-detect pan technology. Crystal glass surface for easy cleaning.",
    colors: ["Black"],
    features: ["2000W", "10 Power Levels", "Auto Detect", "Timer", "Crystal Glass"],
    inStock: true,
    images: ["🔥", "⚡", "🫕"],
  },
  {
    id: 5,
    name: "BrewMate Drip Coffee Maker",
    category: "Coffee Makers",
    price: 3799,
    mrp: 4999,
    rating: 4.3,
    reviews: 312,
    badge: "",
    emoji: "☕",
    desc: "12-cup programmable coffee maker with keep-warm plate. Brew fresh aromatic coffee at your preferred strength.",
    colors: ["Black", "Silver"],
    features: ["12 Cup", "Keep Warm", "Programmable", "Anti-Drip", "Brew Strength Control"],
    inStock: false,
    images: ["☕", "🫖", "☕"],
  },
  {
    id: 6,
    name: "ChefPro 10-Piece Cookware Set",
    category: "Cookware Sets",
    price: 8499,
    mrp: 12999,
    rating: 4.7,
    reviews: 203,
    badge: "Hot Deal",
    emoji: "🍲",
    desc: "Premium non-stick cookware set with titanium coating. PFOA-free, scratch-resistant, compatible with all cooktops.",
    colors: ["Granite Grey", "Maroon"],
    features: ["10 Pieces", "Titanium Non-Stick", "PFOA-Free", "All Cooktops", "Glass Lids"],
    inStock: true,
    images: ["🍲", "🥘", "🫕"],
  },
];

const HomePage = () => {


  return (
    <div>

      {/* HERO */}
      <section className="min-h-[92vh] flex items-center pt-27.5 pb-15 relative overflow-hidden bg-gradient-to-br from-brown-dark via-brown to-[#7A4B22]">

        <div className="absolute -top-20 -right-20 w-120 h-120 rounded-full bg-amber/10" />
        <div className="absolute -bottom-24 -left-16 w-95 h-95 rounded-full bg-amber/5" />
        <div className="absolute top-[30%] right-[8%] w-60 h-60 rounded-full border border-amber/20" />

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-15 items-center w-full">

          {/* TEXT */}
          <div>

            <div className="tag mb-6">
              ✨ India's Trusted Kitchen Store
            </div>

            <h1 className="fade-up delay-1 font-playfair text-[clamp(36px,5vw,62px)] font-bold text-white leading-[1.12] mb-5">
              Cook Better.<br />
              <span className="text-amber-light">Live Better.</span><br />
              Every Day.
            </h1>

            <p className="fade-up delay-2 text-[17px] text-white/70 leading-7 tracking-[1px] mb-9 max-w-115">
              Discover premium kitchen appliances that transform your cooking experience. From powerful mixer grinders to smart induction cooktops — find everything for the modern Indian kitchen.
            </p>

            <div className="fade-up delay-3 flex gap-3.5 flex-wrap">

              <Button size="lg" className="px-8 py-3.5" >
                Shop Now →
              </Button>

              <Button variant="outline" size="lg">
                View Offers
              </Button>

            </div>

            <div className="fade-up delay-4 flex gap-5 mt-9 flex-wrap text-white/60 text-[13px]">
              {[
                ["🚚", "Free Delivery"],
                ["🔒", "Secure Payment"],
                ["↩️", "Easy Returns"],
              ].map(([ic, l]) => (
                <div key={l} className="flex items-center gap-1.5">
                  <span className="text-base">{ic}</span>{l}
                </div>
              ))}
            </div>

          </div>

          {/* HERO VISUAL */}
          <div className="fade-up delay-2 flex justify-center items-center">

            <div className="float relative w-[340px] h-[340px] rounded-full bg-amber/10 border border-amber/20 flex items-center justify-center">

              <div className="w-[260px] h-[260px] rounded-full bg-amber/10 flex items-center justify-center text-[120px]">
                🫕
              </div>

              {[
                { emoji: "🫙", angle: 0 },
                { emoji: "☕", angle: 72 },
                { emoji: "🍟", angle: 144 },
                { emoji: "🔥", angle: 216 },
                { emoji: "🥘", angle: 288 },
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

      {/* FEATURED PRODUCTS */}
      <section className="py-20 px-6 bg-white">

        <div className="max-w-screen-xl mx-auto">

          <div className="flex justify-between items-end mb-12">

            <div>
              <div className="tag mb-3">Featured</div>
              <h2 className="font-playfair text-[36px] font-bold text-brown">
                Best Sellers
              </h2>
            </div>

            <button
              className="btn-outline px-6 py-2.5 text-sm"
            // onClick={() => setPage("products")}
            >
              View All
            </button>

          </div>

          <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-6">
            {PRODUCTS.slice(0, 4).map((p, i) => (
              <ProductCard
                key={p.id}
                product={p}
                i={i}
              // setPage={setPage}
              // setSelectedProduct={setSelectedProduct}
              // addToCart={addToCart}
              />
            ))}
          </div>

        </div>
      </section>

      {/* PROMO */}
      <section className="py-16 px-6 bg-amber-pale">

        <div className="max-w-screen-xl mx-auto grid md:grid-cols-2 gap-6">

          {[
            {
              title: "Up to 40% Off on Cookware",
              sub: "Limited time deal • Shop now",
              emoji: "🍳",
              bg: "linear-gradient(135deg,#5C3A1E,#8B5E35)"
            },
            {
              title: "Free Delivery on First Order",
              sub: "Use code: SAATHI1 at checkout",
              emoji: "🚚",
              bg: "linear-gradient(135deg,#F0A830,#C47800)"
            }
          ].map((b, i) => (
            <div
              key={i}
              className="card-lift rounded-[20px] p-9 text-white flex justify-between items-center cursor-pointer"
              style={{ background: b.bg }}
            >
              <div>
                <div className="font-playfair text-[22px] font-bold mb-1">
                  {b.title}
                </div>
                <div className="text-[13px] opacity-80">{b.sub}</div>

                <button className="mt-4 px-5 py-2 rounded-full text-sm font-semibold bg-white/20 border border-white/40">
                  Shop Now
                </button>
              </div>

              <div className="text-[64px]">{b.emoji}</div>
            </div>
          ))}

        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 px-6 bg-off-white">

        <div className="max-w-screen-xl mx-auto text-center mb-12">
          <div className="tag mb-3">Testimonials</div>
          <h2 className="font-playfair text-[36px] font-bold text-brown">
            What Our Customers Say
          </h2>
        </div>

        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-6">

          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              className="card-lift bg-white rounded-[20px] p-7 border border-[#F0E8D4]"
            >
              <div className="mb-4">
                <Stars rating={t.rating} />
              </div>

              <p className="text-[15px] leading-7 text-text-muted mb-5">
                "{t.text}"
              </p>

              <div className="flex items-center gap-3">

                <div className="w-11 h-11 rounded-full flex items-center justify-center text-white font-bold text-base bg-gradient-to-br from-amber to-amber-light">
                  {t.initial}
                </div>

                <div>
                  <div className="font-semibold text-brown text-sm">
                    {t.name}
                  </div>
                  <div className="text-xs text-text-muted">
                    {t.city}
                  </div>
                </div>

              </div>
            </div>
          ))}

        </div>
      </section>

      {/* WHY US */}
      <section className="py-20 px-6 bg-gradient-to-br from-brown-dark to-brown text-white">

        <div className="max-w-screen-xl mx-auto text-center">

          <div className="tag mb-3 bg-amber/15 border border-amber/30 text-amber-light">
            Why Choose Us
          </div>

          <h2 className="font-playfair text-[36px] font-bold mb-12">
            Why KitchenSaathi?
          </h2>

          <div className="grid md:grid-cols-4 gap-7">

            {[
              { emoji: "🏆", title: "Premium Quality", desc: "Only ISI-certified appliances from trusted brands" },
              { emoji: "💰", title: "Best Prices", desc: "Lowest prices guaranteed with no hidden charges" },
              { emoji: "🔧", title: "After-Sales Service", desc: "Dedicated support team & free installation" },
              { emoji: "📦", title: "Fast Delivery", desc: "Same-day dispatch for metro cities" },
            ].map((f, i) => (
              <div
                key={i}
                className="rounded-[20px] p-8 bg-white/5 border border-white/10 hover:bg-amber/10 transition"
              >
                <div className="text-[44px] mb-4">{f.emoji}</div>

                <div className="font-playfair text-[18px] font-semibold mb-2">
                  {f.title}
                </div>

                <div className="text-sm text-white/70 leading-6">
                  {f.desc}
                </div>
              </div>
            ))}

          </div>

        </div>

      </section>

    </div>
  );
};


export default HomePage;