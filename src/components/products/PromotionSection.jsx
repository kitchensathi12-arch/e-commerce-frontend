const PromotionSection = () => {
  const banners = [
    {
      title: 'Up to 40% Off on Cookware',
      sub: 'Limited time deal • Shop now',
      icon: '🍳',
      // Light theme: warm cream bg with brown text
      bg: 'bg-amber-pale',
      border: 'border-amber/40',
      titleColor: 'text-brown-dark',
      subColor: 'text-brown/70',
      btnClass: 'bg-brown text-amber-pale hover:bg-brown-dark border-transparent',
      accentBar: 'bg-amber',
    },
    {
      title: 'Free Delivery on First Order',
      sub: 'Use code: SAATHI1 at checkout',
      icon: '🚚',
      // Light theme: soft amber tint bg with amber-dark text
      bg: 'bg-amber/10',
      border: 'border-amber/50',
      titleColor: 'text-brown-dark',
      subColor: 'text-text-muted',
      btnClass: 'bg-amber text-brown-dark hover:bg-amber-light border-transparent',
      accentBar: 'bg-brown',
    },
  ];

  return (
    <section className="py-16 px-6 bg-off-white">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-5">
        {banners.map((b, i) => (
          <div
            key={i}
            className={`
              group relative overflow-hidden
              ${b.bg} ${b.border}
              border rounded-[20px]
              p-9 flex justify-between items-center
              cursor-pointer
              card-hover
              transition-all duration-300
            `}
          >
            {/* Top accent bar */}
            <div className={`absolute top-0 left-0 right-0 h-[3px] ${b.accentBar} opacity-60 group-hover:opacity-100 transition-opacity duration-300`} />

            {/* Subtle inner glow on hover */}
            <div className="absolute inset-0 rounded-[20px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-[inset_0_0_60px_rgba(212,134,11,0.06)]" />

            <div className="relative z-10">
              <h3 className={`font-playfair text-[22px] font-bold mb-1.5 ${b.titleColor}`}>
                {b.title}
              </h3>
              <p className={`text-[13px] font-dm-sans ${b.subColor}`}>
                {b.sub}
              </p>
              <button
                className={`
                  mt-5 px-5 py-2 rounded-full
                  text-sm font-semibold font-dm-sans
                  border
                  ${b.btnClass}
                  transition-all duration-200
                  hover:-translate-y-0.5
                  hover:shadow-md
                `}
              >
                Shop Now
              </button>
            </div>

            {/* Emoji with subtle scale on hover */}
            <div className="text-[64px] relative z-10 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6 select-none">
              {b.icon}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PromotionSection;