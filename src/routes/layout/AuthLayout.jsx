

const FEATURES = [
    { icon: '🍳', label: 'Best Appliances' },
    { icon: '💰', label: 'Exclusive Deals' },
    { icon: '📦', label: 'Order Tracking' },
    { icon: '❤️', label: 'Wishlist' },
];

const MobileBanner = () => (
    <div className="lg:hidden w-full px-6 pt-10 pb-8 text-center" style={{ background: 'linear-gradient(160deg, #7a4a22 0%, #3e2610 100%)' }}>
        <span className="inline-block text-[11px] font-semibold px-3 py-1 rounded-full mb-4" style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.85)', letterSpacing: '0.04em' }}>
            ✨ India's Trusted Kitchen Store
        </span>
        <h1 className="font-playfair text-[28px] sm:text-[32px] font-bold text-white mb-2" style={{ lineHeight: 1.2 }}>
            Your Kitchen. <span style={{ color: '#f0a830' }}>Your Style.</span>
        </h1>
        <p className="text-[13px]" style={{ color: 'rgba(255,255,255,0.55)' }}>
            Join KitchenSaathi and unlock exclusive deals &amp; more.
        </p>
    </div>
);

const AuthLayout = ({ children }) => {

    return (
        <div
            className="min-h-screen flex flex-col lg:flex-row lg:items-center lg:justify-center lg:p-6 relative overflow-hidden"
            style={{ background: 'radial-gradient(ellipse 70% 70% at 30% 40%, #7a4a22 0%, #5c3a1e 40%, #3e2610 100%)' }}
        >
            <div className="fixed inset-0 pointer-events-none opacity-30 z-0" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E")` }} />

            <div className="relative z-10 w-full lg:hidden"><MobileBanner /></div>

            <div
                className="relative z-10 w-full lg:max-w-290 lg:grid lg:rounded-[28px] overflow-hidden animate-scale-in"
                style={{ gridTemplateColumns: '1fr 1.1fr', boxShadow: '0 40px 100px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.07)' }}
            >
                {/* LEFT PANEL */}
                <div className="relative flex-col justify-between p-12 overflow-hidden hidden lg:flex" style={{ background: 'linear-gradient(145deg, #7a4a22 0%, #5c3a1e 50%, #3e2610 100%)' }}>
                    <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(212,134,11,0.15) 0%, transparent 70%)' }} />
                    <div className="absolute -bottom-16 -left-16 w-60 h-60 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(240,168,48,0.10) 0%, transparent 70%)' }} />
                    <div className="relative z-10">
                        <span className="tag mb-7 inline-block">✨ India's Trusted Kitchen Store</span>
                        <h1 className="font-playfair text-[40px] font-bold text-white mb-5" style={{ lineHeight: 1.18 }}>
                            Your Kitchen.<br />Your Style.<br />
                            <span className="text-amber-light">Join Us Today.</span>
                        </h1>
                        <p className="text-sm leading-7 max-w-xs mb-9" style={{ color: 'rgba(255,255,255,0.60)' }}>
                            Create your free account and unlock exclusive deals, order tracking, wishlists and personalised recommendations just for you.
                        </p>
                        <div className="grid grid-cols-2 gap-3">
                            {FEATURES?.map(({ icon, label }) => (
                                <div key={label} className="flex items-center gap-2 text-[13px] rounded-2xl px-4 py-3 transition-colors hover:bg-white/12" style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.10)', color: 'rgba(255,255,255,0.80)' }}>
                                    <span>{icon}</span> {label}
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

                {/* ---------------------- here child components mapping ----------- */}
                {children}
            </div>
        </div>
    );
}

export default AuthLayout