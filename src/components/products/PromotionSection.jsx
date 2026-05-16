const PromotionSection = () => {
  return (
    <section className="py-16 px-6 bg-amber-pale">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-6">
        {[
          {
            title: 'Up to 40% Off on Cookware',
            sub: 'Limited time deal • Shop now',
            emoji: '🍳',
            bg: 'linear-gradient(135deg,#5C3A1E,#8B5E35)',
          },
          {
            title: 'Free Delivery on First Order',
            sub: 'Use code: SAATHI1 at checkout',
            emoji: '🚚',
            bg: 'linear-gradient(135deg,#F0A830,#C47800)',
          },
        ].map((b, i) => (
          <div
            key={i}
            className="card-lift rounded-[20px] p-9 text-white flex justify-between items-center cursor-pointer"
            style={{ background: b.bg }}
          >
            <div>
              <div className="font-playfair text-[22px] font-bold mb-1">{b.title}</div>
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
  );
};

export default PromotionSection;
