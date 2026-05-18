import { UtensilsCrossed, Tag, Truck, ArrowRight } from 'lucide-react';

const PromotionSection = () => {
  const banners = [
    {
      title: 'Up to 40% Off on Cookware',
      sub: 'Limited time deal • Shop now',
      Icon: UtensilsCrossed,
      BtnIcon: Tag,
      bg: 'bg-[#F5ECD8]',
      border: 'border-[#D9C4A0]',
      titleColor: 'text-[#3D2608]',
      subColor: 'text-[#8C6A3A]',
      btnClass: 'bg-[#4A2C0A] text-[#F5ECD8] hover:opacity-90',
      accentBar: 'bg-[#B8860B]',
      iconBg: 'bg-[rgba(160,110,40,0.10)]',
      iconColor: '#8C6030',
    },
    {
      title: 'Free Delivery on First Order',
      sub: 'Use code: SAATHI1 at checkout',
      Icon: Truck,
      BtnIcon: ArrowRight,
      bg: 'bg-[#EDE0CC]',
      border: 'border-[#C9B48A]',
      titleColor: 'text-[#3D2608]',
      subColor: 'text-[#8C6A3A]',
      btnClass: 'bg-[#A8720F] text-white hover:opacity-90',
      accentBar: 'bg-[#8C6030]',
      iconBg: 'bg-[rgba(140,90,30,0.12)]',
      iconColor: '#8C6030',
    },
  ];

  return (
    <section className="py-16 px-6 bg-[#FAF5EE]">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-5">
        {banners.map((b, i) => {
          const IconComp = b.Icon;
          const BtnIconComp = b.BtnIcon;
          return (
            <div
              key={i}
              className={`
                group relative overflow-hidden
                ${b.bg} border ${b.border}
                rounded-[20px] p-9
                flex items-center justify-between
                cursor-pointer transition-all duration-300
                hover:-translate-y-0.5
              `}
            >
              {/* Accent bar */}
              <div className={`absolute top-0 left-0 right-0 h-[3px] ${b.accentBar} opacity-50 group-hover:opacity-85 transition-opacity duration-300`} />

              {/* Content */}
              <div className="relative z-10 flex-1 pr-6">
                <h3 className={`font-serif text-[19px] font-bold mb-1.5 ${b.titleColor}`}>
                  {b.title}
                </h3>
                <p className={`text-[12.5px] ${b.subColor} mb-5`}>
                  {b.sub}
                </p>
                <button
                  className={`
                    inline-flex items-center gap-1.5
                    px-5 py-2 rounded-full text-sm font-semibold
                    ${b.btnClass}
                    transition-all duration-200 hover:-translate-y-0.5
                  `}
                >
                  <BtnIconComp size={13} strokeWidth={2.5} />
                  Shop Now
                </button>
              </div>

              {/* Icon */}
              <div
                className="w-[60px] h-[60px] rounded-[14px] flex items-center justify-center flex-shrink-0"
                style={{ background: b.iconBg }}
              >
                <IconComp size={28} color={b.iconColor} strokeWidth={1.5} />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default PromotionSection;