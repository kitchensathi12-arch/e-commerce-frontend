import { CheckIcon, MinusIcon, PlusIcon, ShareIcon, ShieldIcon, TruckIcon } from "lucide-react";
import { Stars } from "../Stars";


export function ProductInfo({ product = {} }) {
  


    return (
        <div className="flex flex-col gap-5">
            {/* Category + Badge */}
            <div className="flex items-center gap-2 flex-wrap">
                <span className="bg-[#FFF4E0] text-[#D4860B] border border-[#F0C870] rounded-full text-[11px] font-semibold tracking-widest uppercase px-3 py-1">
                    {product?.category?.name}
                </span>
                
                    <span className="bg-green-600 text-white rounded-full text-[11px] font-bold px-3 py-1">
                        ✓ Best Seller
                    </span>
                
                {!product.in_stock && (
                    <span className="bg-red-100 text-red-600 rounded-full text-[11px] font-bold px-3 py-1">
                        Out of Stock
                    </span>
                )}
            </div>

            {/* Title */}
            <div>
                <h1 className="font-playfair text-[30px] font-bold text-[#5C3A1E] leading-snug">
                    {product?.product_title}
                </h1>
                <p className="text-[#6B5B45] text-sm mt-2 leading-relaxed">{product?.product_description}</p>
            </div>

            {/* Rating Bar */}
            <div className="flex items-center gap-3 pb-4 border-b border-[#F0E8D4]">
                <Stars rating={4} />
                <span className="font-bold text-[#D4860B] text-sm">{4}</span>
                <span className="text-xs text-[#6B5B45]">
                    (1000+ verified reviews)
                </span>
                <span className="text-xs text-[#D4860B] cursor-pointer hover:underline font-medium ml-auto">
                    Write a review
                </span>
            </div>

            {/* Pricing */}
            <div className="bg-[#FFF4E0] rounded-2xl p-4 flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-baseline gap-3">
                    <span className="font-playfair text-[42px] font-bold text-[#5C3A1E] leading-none">
                        ₹{product?.product_selling_price?.toLocaleString()}
                    </span>
                    <div className="flex flex-col">
                        <span className="text-sm text-[#8A9299] line-through">
                            ₹{product?.product_mrp_price?.toLocaleString()}
                        </span>
                        <span className="text-xs text-[#6B5B45]">incl. all taxes</span>
                    </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                    <span className="bg-green-600 text-white rounded-lg px-3 py-1.5 text-sm font-bold">
                        {product?.product_discount}% OFF
                    </span>
                    <span className="text-xs text-green-700 font-semibold">
                        You save ₹{((product?.product_mrp_price * product?.product_discount) / 100).toLocaleString()}
                    </span>
                </div>
            </div>

            {/* Stock status */}
            <div
                className={`flex items-center gap-2.5 rounded-xl px-4 py-3 ${product?.in_stock ? 'bg-green-50 border border-green-100' : 'bg-orange-50 border border-orange-100'}`}
            >
                <div
                    className={`w-2 h-2 rounded-full ${product?.in_stock ? 'bg-green-500' : 'bg-orange-400'} animate-pulse`}
                />
                <span
                    className={`text-sm font-semibold ${product?.in_stock ? 'text-green-700' : 'text-orange-600'}`}
                >
                    {product?.in_stock ? 'In Stock — Ready to Ship Today' : 'Currently Out of Stock'}
                </span>
                {product?.in_stock && (
                    <span className="text-xs text-green-600 ml-auto">🚚 Ships in 24 hrs</span>
                )}
            </div>

            {/* Color Selector */}
            {/* {product?.colors?.length > 0 && (
                <div>
                    <div className="flex items-center justify-between mb-2.5">
                        <span className="text-sm font-semibold text-[#5C3A1E]">Color</span>
                        <span className="text-xs text-[#D4860B] font-medium">{selectedColor}</span>
                    </div>
                    <div className="flex gap-2.5 flex-wrap">
                        {product.colors.map((c) => (
                            <button
                                key={c}
                                onClick={() => setSelectedColor(c)}
                                className={`px-4 py-2 rounded-full text-xs font-semibold cursor-pointer border-none transition-all
                  ${selectedColor === c
                                        ? 'bg-[#D4860B] text-white ring-2 ring-[#D4860B] ring-offset-2 shadow-md'
                                        : 'bg-white text-[#5C3A1E] border border-[#E8DDD0] hover:border-[#D4860B] hover:text-[#D4860B]'
                                    }`}
                            >
                                {c}
                            </button>
                        ))}
                    </div>
                </div>
            )} */}

            {/* Quantity + Add to Cart */}
            <div className="flex gap-3 items-center flex-wrap">
                {/* Qty stepper */}
                <div className="flex items-center border border-[#E8DDD0] rounded-full overflow-hidden bg-white">
                    <button
                        // onClick={() => setQty((q) => Math.max(1, q - 1))}
                        className="w-11 h-11 flex items-center justify-center text-[#5C3A1E] border-none bg-transparent cursor-pointer hover:bg-[#FFF4E0] transition-colors"
                    >
                        <MinusIcon />
                    </button>
                    <span className="w-10 text-center font-bold text-[15px] text-[#5C3A1E]">{1}</span>
                    <button
                        // onClick={() => setQty((q) => q + 1)}
                        className="w-11 h-11 flex items-center justify-center text-[#5C3A1E] border-none bg-transparent cursor-pointer hover:bg-[#FFF4E0] transition-colors"
                    >
                        <PlusIcon />
                    </button>
                </div>

                {/* Add to Cart */}
                {/* <button
                    // onClick={handleAddToCart}
                    disabled={!product.inStock}
                    className={`flex-1 h-11 rounded-full font-semibold text-sm text-white border-none cursor-pointer flex items-center justify-center gap-2 transition-all duration-300
            ${product.inStock
                             && 'bg-linear-to-r from-[#D4860B] to-[#F0A830] hover:from-[#3E2610] hover:to-[#5C3A1E] hover:-translate-y-0.5 shadow-lg shadow-[#D4860B]/30'
                             
                        }`}
                >
                    {added ? (
                        <>
                            <CheckIcon size={16} />
                            Added to Cart!
                        </>
                    ) : (
                        <>
                            <CartIcon />
                            {product.inStock ? 'Add to Cart' : 'Notify Me'}
                        </>
                    )}
                </button> */}

                {/* Wishlist */}
                {/* <button
                    onClick={() => setWishlisted(!wishlisted)}
                    className={`w-11 h-11 rounded-full border-none cursor-pointer flex items-center justify-center transition-all hover:scale-110
            ${wishlisted
                            ? 'bg-red-50 text-red-500 ring-2 ring-red-200'
                            : 'bg-white border border-[#E8DDD0] text-[#8A9299] hover:border-red-300 hover:text-red-400'
                        }`}
                >
                    <HeartIcon filled={wishlisted} />
                </button> */}
            </div>

            {/* Buy Now */}
            <button
                disabled={!product.in_stock}
                className={`w-full py-3.5 rounded-full font-semibold text-[15px] border-2 cursor-pointer transition-all
          ${product.inStock
                        ? 'bg-transparent text-[#D4860B] border-[#D4860B] hover:bg-[#D4860B] hover:text-white hover:-translate-y-0.5'
                        : 'bg-transparent text-[#D4860B]/40 border-[#D4860B]/40 cursor-not-allowed'
                    }`}
            >
                ⚡ Buy Now
            </button>

            {/* Delivery Info Grid */}
            <div className="grid grid-cols-2 gap-3 pt-1">
                {[
                    { icon: <TruckIcon />, title: 'Free Delivery', sub: 'On orders above ₹999' },
                    { icon: <ShieldIcon />, title: '2-Year Warranty', sub: 'Manufacturer warranty' },
                    { icon: <CheckIcon size={18} />, title: 'ISI Certified', sub: 'Quality guaranteed' },
                    { icon: '↩️', title: '10-Day Returns', sub: 'Hassle-free returns' },
                ].map((item, i) => (
                    <div
                        key={i}
                        className="flex gap-2.5 items-start bg-[#FFF4E0] rounded-xl p-3 border border-[#F0E8D4]"
                    >
                        <span className="text-[#D4860B] shrink-0 mt-0.5">
                            {typeof item.icon === 'string' ? item.icon : item.icon}
                        </span>
                        <div>
                            <div className="text-xs font-semibold text-[#5C3A1E]">{item.title}</div>
                            <div className="text-[10px] text-[#6B5B45] mt-0.5">{item.sub}</div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Share */}
            <div className="flex items-center gap-3 pt-1 pb-1">
                <span className="text-xs text-[#6B5B45] font-medium">Share:</span>
                {['📘 Facebook', '📷 Instagram', '🐦 Twitter'].map((s) => (
                    <button
                        key={s}
                        className="text-xs text-[#6B5B45] bg-[#F5ECD7] hover:bg-[#FFF4E0] px-3 py-1.5 rounded-full cursor-pointer border-none transition-colors"
                    >
                        {s}
                    </button>
                ))}
                <button className="ml-auto text-[#6B5B45] bg-[#F5ECD7] hover:bg-[#FFF4E0] w-8 h-8 rounded-full cursor-pointer border-none flex items-center justify-center transition-colors">
                    <ShareIcon />
                </button>
            </div>
        </div>
    );
}