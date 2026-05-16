import { useState } from "react";
import { Stars } from "../Stars";
import { StarIcon } from "lucide-react";


const TESTIMONIALS = [
    {
        name: 'Priya Sharma',
        city: 'Delhi',
        text: 'The ProBlend mixer is fantastic! Grinds coconut chutney in seconds. The 5-year warranty gives great peace of mind.',
        rating: 5,
        initial: 'P',
    },
    {
        name: 'Rahul Verma',
        city: 'Mumbai',
        text: 'Got the pressure cooker for my mom. She loves how quickly it cooks dal and rice. Build quality is excellent.',
        rating: 5,
        initial: 'R',
    },
    {
        name: 'Anita Reddy',
        city: 'Hyderabad',
        text: 'Air fryer changed our eating habits! The kids now love healthy snacks. Delivery was super fast too.',
        rating: 4,
        initial: 'A',
    },
];

export function ProductTabs({ product }) {
    const [tab, setTab] = useState('description');

    const tabs = [
        { key: 'description', label: 'Description' },
        { key: 'features', label: 'Features & Specs' },
        { key: 'reviews', label: `Reviews (${0})` },
    ];

    return (
        <div className="bg-white rounded-3xl border border-[#F0E8D4] overflow-hidden">
            {/* Tab Header */}
            <div className="flex border-b border-[#F0E8D4] overflow-x-auto">
                {tabs.map((t) => (
                    <button
                        key={t.key}
                        onClick={() => setTab(t.key)}
                        className={`px-6 py-4 text-sm font-semibold whitespace-nowrap border-none cursor-pointer transition-all border-b-2 -mb-px
              ${tab === t.key
                                ? 'text-[#D4860B] border-b-[#D4860B] bg-[#FFF4E0]/50'
                                : 'text-[#6B5B45] border-b-transparent bg-transparent hover:text-[#5C3A1E] hover:bg-[#FAFAF7]'
                            }`}
                    >
                        {t.label}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div className="p-8">
                {/* Description */}
                {tab === 'description' && (
                    <div className="max-w-3xl">
                        <h3 className="font-playfair text-xl font-bold text-[#5C3A1E] mb-4">
                            Product Description
                        </h3>
                        <p className="text-[15px] leading-[1.85] text-[#6B5B45] mb-5">{product?.product_description}</p>
                        {/* <p className="text-[15px] leading-[1.85] text-[#6B5B45] mb-5">
                            Designed for the modern Indian kitchen, this appliance combines powerful performance
                            with elegant design. The stainless steel build ensures durability while the smart
                            motor protection prevents overheating.
                        </p>
                        <div className="bg-[#FFF4E0] rounded-2xl p-5 border-l-4 border-[#D4860B]">
                            <p className="text-sm text-[#5C3A1E] font-medium leading-relaxed">
                                💡 <strong>Pro Tip:</strong> Add a little water before grinding dry spices to get
                                the smoothest consistency and extend the life of your jars.
                            </p>
                        </div> */}
                    </div>
                )}

                {/* Features */}
                {tab === 'features' && (
                    <div>
                        {/* Spec Table */}
                        <h3 className="font-semibold text-[#5C3A1E] mb-3 text-sm uppercase tracking-wide">
                            Specifications
                        </h3>
                        <div className="rounded-2xl overflow-hidden border border-[#F0E8D4]">
                            {product?.product_details?.map((item, i) => (
                                <div
                                    key={item._id}
                                    className={`flex items-center px-5 py-3.5 text-sm ${i % 2 === 0 ? 'bg-[#FAFAF7]' : 'bg-white'}`}
                                >
                                    <span className="w-1/2 font-medium text-[#5C3A1E]">{item?.key}</span>
                                    <span className="w-1/2 text-[#6B5B45]">{item?.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Reviews */}
                {tab === 'reviews' && (
                    <div>
                        {/* Rating Summary */}
                        <div className="flex flex-col sm:flex-row gap-8 mb-8 pb-8 border-b border-[#F0E8D4]">
                            <div className="text-center shrink-0">
                                <div className="font-playfair text-[64px] font-bold text-[#5C3A1E] leading-none">
                                    {product?.rating}
                                </div>
                                <div className="flex justify-center mt-2 mb-1">
                                    <Stars rating={product?.rating} />
                                </div>
                                <div className="text-xs text-[#6B5B45]">
                                    {product?.reviews?.toLocaleString()} reviews
                                </div>
                            </div>
                            <div className="flex-1 flex flex-col gap-2">
                                {[5, 4, 3, 2, 1].map((star) => {
                                    const pct =
                                        star === 5 ? 68 : star === 4 ? 20 : star === 3 ? 7 : star === 2 ? 3 : 2;
                                    return (
                                        <div key={star} className="flex items-center gap-2.5 text-xs text-[#6B5B45]">
                                            <span className="w-3 text-right shrink-0">{star}</span>
                                            <StarIcon filled />
                                            <div className="flex-1 h-2 bg-[#F0E8D4] rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-linear-to-r from-[#D4860B] to-[#F0A830] rounded-full"
                                                    style={{ width: `${pct}%` }}
                                                />
                                            </div>
                                            <span className="w-7 shrink-0">{pct}%</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Review Cards */}
                        <div className="flex flex-col gap-5">
                            {TESTIMONIALS.map((t, i) => (
                                <div key={i} className="bg-[#FAFAF7] rounded-2xl p-5 border border-[#F0E8D4]">
                                    <div className="flex items-start gap-3 mb-3">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D4860B] to-[#F0A830] flex items-center justify-center text-white font-bold text-sm shrink-0">
                                            {t.initial}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 flex-wrap">
                                                <span className="font-semibold text-sm text-[#5C3A1E]">{t.name}</span>
                                                <span className="text-xs text-[#8A9299]">·</span>
                                                <span className="text-xs text-[#6B5B45]">{t.city}</span>
                                                <span className="ml-auto text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
                                                    ✓ Verified Purchase
                                                </span>
                                            </div>
                                            <div className="flex gap-0.5 mt-1">
                                                {[1, 2, 3, 4, 5].map((s) => (
                                                    <StarIcon key={s} filled={s <= t.rating} />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-sm text-[#6B5B45] leading-relaxed">"{t.text}"</p>
                                </div>
                            ))}
                        </div>

                        {/* Write Review CTA */}
                        <div className="mt-6 text-center">
                            <button className="bg-gradient-to-r from-[#D4860B] to-[#F0A830] text-white border-none rounded-full px-8 py-3 text-sm font-semibold cursor-pointer hover:from-[#3E2610] hover:to-[#5C3A1E] transition-all">
                                ✏️ Write a Review
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}