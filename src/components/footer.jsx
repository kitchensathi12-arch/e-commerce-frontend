import { Mail, MapPin, Phone } from "lucide-react";


const CATEGORIES = [
  { id: 1, name: "Mixer Grinders", emoji: "🫙", count: 48 },
  { id: 2, name: "Pressure Cookers", emoji: "🥘", count: 32 },
  { id: 3, name: "Induction Cooktops", emoji: "🔥", count: 27 },
  { id: 4, name: "Air Fryers", emoji: "🍟", count: 19 },
  { id: 5, name: "Cookware Sets", emoji: "🍲", count: 56 },
  { id: 6, name: "Coffee Makers", emoji: "☕", count: 23 },
];


export function Footer() {
  return (
    <footer className="bg-brown-dark text-[#D4C4A8]">

      {/* Newsletter */}
      <div className="bg-gradient-to-br from-brown to-amber py-12 px-6 text-center">
        <div className="max-w-[560px] mx-auto">

          <div className="font-playfair text-[28px] font-bold text-white mb-2">
            Stay in the Loop!
          </div>

          <p className="text-[15px] text-white/80 mb-6">
            Get exclusive deals, new arrivals & kitchen tips delivered to your inbox.
          </p>

          <div className="flex gap-2 max-w-[420px] mx-auto">
            <input
              placeholder="Enter your email…"
              className="flex-1 border-0 rounded-full px-5 py-3 text-sm outline-none font-dm-sans"
            />

            <button className="btn-primary px-6 py-3 text-sm bg-brown-dark whitespace-nowrap">
              Subscribe
            </button>
          </div>

        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-screen-xl mx-auto px-6 pt-14 pb-8">

        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-10 mb-12">

          {/* Brand */}
          <div>
            <div className="font-playfair text-[22px] font-bold text-white mb-3">
              Kitchen<span className="text-amber-light">Saathi</span>
            </div>

            <p className="text-[14px] leading-7 text-[#A0907A] mb-5">
              Your trusted companion for premium kitchen appliances. Bringing quality and convenience to every Indian kitchen.
            </p>

            <div className="flex gap-2.5">
              {["📘", "📷", "🐦", "▶️"].map((icon, i) => (
                <div
                  key={i}
                  className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center cursor-pointer text-base transition-colors"
                  onMouseEnter={e => e.currentTarget.style.background = "#F0A830"}
                  onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,.08)"}
                >
                  {icon}
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <div className="text-[13px] font-bold tracking-widest uppercase text-amber-light mb-4">
              Quick Links
            </div>

            {["Home", "Products", "Offers", "About Us", "Contact Us", "Blog"].map(l => (
              <div
                key={l}
                className="text-[14px] text-[#A0907A] py-[5px] cursor-pointer transition-colors"
                onMouseEnter={e => e.currentTarget.style.color = "#F0A830"}
                onMouseLeave={e => e.currentTarget.style.color = "#A0907A"}
              >
                → {l}
              </div>
            ))}
          </div>

          {/* Categories */}
          <div>
            <div className="text-[13px] font-bold tracking-widest uppercase text-amber-light mb-4">
              Categories
            </div>

            {CATEGORIES.map(c => (
              <div
                key={c.id}
                className="text-[14px] text-[#A0907A] py-[5px] cursor-pointer transition-colors"
                onMouseEnter={e => e.currentTarget.style.color = "#F0A830"}
                onMouseLeave={e => e.currentTarget.style.color = "#A0907A"}
              >
                {c.emoji} {c.name}
              </div>
            ))}
          </div>

          {/* Contact */}
          <div>
            <div className="text-[13px] font-bold tracking-widest uppercase text-amber-light mb-4">
              Contact Us
            </div>

            {[
              [<Phone className="w-4 h-4" />, "1800-XXX-XXXX (Toll Free)"],
              [<Mail className="w-4 h-4" />, "support@kitchensaathi.in"],
              [<MapPin className="w-4 h-4"/>, "New Delhi, India 110001"],
            ].map(([ic, text], i) => (
              <div
                key={i}
                className="flex gap-2.5 items-start mb-3 text-[14px] text-[#A0907A]"
              >
                <span className="text-amber mt-[2px]">{ic}</span>
                {text}
              </div>
            ))}

            <div className="mt-5">
              <div className="text-[12px] text-[#A0907A] mb-2">
                We accept:
              </div>

              <div className="flex gap-1.5 flex-wrap">
                {["💳 Visa", "💳 MC", "🏦 UPI", "💸 EMI", "🔒 COD"].map(p => (
                  <span
                    key={p}
                    className="bg-white/10 border border-white/10 rounded px-2 py-[3px] text-[11px]"
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 pt-6 flex justify-between items-center flex-wrap gap-3">

          <div className="text-[13px] text-[#6B5B45]">
            © 2025 KitchenSaathi. All rights reserved. Made with ❤️ in India.
          </div>

          <div className="flex gap-5">
            {["Privacy Policy", "Terms of Service", "Refund Policy"].map(l => (
              <span
                key={l}
                className="text-[12px] text-[#6B5B45] cursor-pointer"
              >
                {l}
              </span>
            ))}
          </div>

        </div>

      </div>
    </footer>
  );
}