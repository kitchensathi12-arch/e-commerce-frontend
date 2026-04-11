import { getProductById } from "@/services/ProductServices";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


const COLORS = [
  { name: "Royal Brown", hex: "#7C5C2E" },
  { name: "Oat Cream", hex: "#E8E0D0" },
  { name: "Steel Blue", hex: "#3D6B8A" },
  { name: "Midnight Navy", hex: "#1A2336" },
];

const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];

const RELATED = [
  { id: 1, name: "Linen Blend Overshirt", price: "£34.00", was: "£48.00", tag: "SALE", img: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=500&q=80&fit=crop" },
  { id: 2, name: "Cotton Striped Shirt", price: "£28.00", was: null, tag: "NEW", img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80&fit=crop" },
  { id: 3, name: "Utility Cargo Jacket", price: "£65.00", was: "£89.00", tag: "SALE", img: "https://images.unsplash.com/photo-1591213954196-2d0ccb3f8d4c?w=500&q=80&fit=crop" },
  { id: 4, name: "Relaxed Denim Shirt", price: "£42.00", was: null, tag: null, img: "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?w=500&q=80&fit=crop" },
];

function HeartIcon({ filled }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill={filled ? "#c0392b" : "none"} stroke={filled ? "#c0392b" : "currentColor"} strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  );
}

function Stars({ rating }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <svg key={s} className={`w-3.5 h-3.5 ${s <= Math.round(rating) ? "text-amber-400" : "text-gray-200"}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function ProductDetailPage() {

  // ------------ all hooks start here ---------------
  const { id } = useParams();



  // ----------- all use state start here  ---------------
  const [activeImg, setActiveImg] = useState<string>("");
  const [wishlisted, setWishlisted] = useState(false);
  const [qty, setQty] = useState(1);
  const [showMore, setShowMore] = useState(false);
  const [added, setAdded] = useState(false);


  // ------------- all tenstack query use here  ---------------

  const { data: productDetails, isLoading: isExistProductLoading } = useQuery({
    queryKey: ["product-detail", id],
    queryFn: () => getProductById(id as string),
    enabled: !!id,
  });

  console.log("productDetails", productDetails);

  const handleAdd = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  useEffect(()=> {

    if(productDetails?.product_images?.length){
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setActiveImg(productDetails.product_images[0].image_url)
    }

  },[productDetails])

  if (isExistProductLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-gray-900">


      {/* Breadcrumb */}
      <div className="max-w-screen-xl mx-auto px-6 lg:px-10 py-3.5">
      </div>

      {/* Product Section */}
      <main className="max-w-screen-xl mx-auto px-6 lg:px-10 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 xl:gap-14">

          {/* GALLERY */}
          <div className="flex gap-3 lg:gap-4">
            {/* Thumbs */}
            <div className="flex flex-col gap-2.5 w-16 shrink-0">
              {productDetails?.product_images?.map((img) => (
                <button
                  key={img?._id?.toString()}
                  onClick={() => setActiveImg(img?.image_url)}
                  className={`w-16 h-16 rounded-xl overflow-hidden transition-all duration-200 ${activeImg === img?.image_url
                      ? "ring-2 ring-zinc-900 ring-offset-1"
                      : "ring-1 ring-stone-200 hover:ring-zinc-400 opacity-60 hover:opacity-100"
                    }`}
                >
                  <img src={img.image_url} alt="" className="w-full h-full object-cover" loading="lazy" />
                </button>
              ))}
            </div>

            {/* Main image */}
            <div className="relative flex-1 rounded-2xl overflow-hidden bg-stone-100 group cursor-zoom-in" style={{ minHeight: 560 }}>
              <img
                src={activeImg}
                alt="Product"
                className="w-full object-cover transition-opacity duration-300"
                style={{ minHeight: 560, maxHeight: 700 }}
              />

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                <span className="bg-green-600 text-white text-xs font-bold tracking-widest uppercase px-2.5 py-1 rounded-sm">{productDetails?.product_discount}% OFF</span>
                <span className="bg-zinc-900 text-white text-xs font-bold tracking-widest uppercase px-2.5 py-1 rounded-sm">BESTSELLER</span>
              </div>

              {/* Top-right actions */}
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                <button className="w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-sm hover:bg-stone-50 transition-colors text-zinc-500">
                  <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path strokeLinecap="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
                </button>
                <button onClick={() => setWishlisted(!wishlisted)} className="w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-sm hover:bg-stone-50 transition-colors">
                  <HeartIcon filled={wishlisted} />
                </button>
              </div>
            </div>
          </div>

          {/* PRODUCT INFO */}
          <div className="flex flex-col gap-5 lg:pt-2">
            {/* Brand pill + wishlist row */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold tracking-widest uppercase text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full">{productDetails?.brand?.brand_name}</span>
              <div className="flex items-center gap-1.5 text-xs text-zinc-400">
                <span className={`w-1.5 h-1.5 rounded-full ${productDetails?.in_stock ? "bg-emerald-400" : "bg-rose-400"} inline-block`} />
                {productDetails?.in_stock ? "In stock" : "Out of stock"}
              </div>
            </div>

            {/* Title */}
            <div>
              <h1 className="text-2xl xl:text-3xl font-bold text-zinc-900 leading-tight tracking-tight">{productDetails?.product_name}</h1>
              <p className="text-sm text-zinc-400 mt-1 font-medium">{productDetails?.product_title}</p>
            </div>

            {/* Rating row */}
            <div className="flex items-center gap-2.5 flex-wrap">
              <Stars rating={4.5} />
              <span className="text-sm font-bold text-zinc-800">4.5</span>
              <span className="text-stone-300 text-sm">|</span>
              <a href="#" className="text-xs text-zinc-400 hover:text-zinc-700 underline underline-offset-2 transition-colors">312 reviews</a>
              <span className="text-stone-300 text-sm">|</span>
              <span className="text-xs text-zinc-400 font-medium">1,238 sold</span>
            </div>

            {/* Price block */}
            <div className="flex items-center gap-3 bg-stone-100 rounded-2xl px-5 py-4">
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black text-zinc-900">₹{productDetails?.product_selling_price}</span>
                  <span className="text-sm text-zinc-400 line-through font-medium">₹{productDetails?.product_mrp_price}</span>
                </div>
                <p className="text-xs text-zinc-500 mt-0.5">Price includes VAT</p>
              </div>
              <div className="ml-auto text-center">
                <span className="bg-green-600 text-white text-xs font-bold px-2.5 py-1 rounded-lg block">SAVE ₹{productDetails?.product_mrp_price && productDetails?.product_selling_price ? (parseFloat(productDetails.product_mrp_price) - parseFloat(productDetails.product_selling_price)).toFixed(2) : '0.00'}</span>
                <span className="text-xs text-zinc-400 mt-0.5 block">{productDetails?.product_discount}% off</span>
              </div>
            </div>

            <div className="h-px bg-stone-200" />

            {/* Description */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-2">About this product</p>
              <p className="text-sm text-zinc-600 leading-relaxed">
                {productDetails?.product_description}
                {showMore && " The fabric has a natural slubbed texture for an effortlessly undone look. Machine washable for everyday ease. Cut in a generous, oversized silhouette for that coveted borrowed-from-the-boys aesthetic. 100% responsibly sourced cotton blend."}
              </p>
              <h3>Additional details</h3>
              <div>
               {productDetails?.product_details?.map((detail) => (
                  <p className="flex justify-between" key={detail?._id?.toString()}>
                    <span className="text-xs text-zinc-400 mt-0.5 block">{detail.key}: </span>
                    <span className="text-sm text-zinc-600 font-medium">{detail.value}</span>
                  </p>
                ))}
              </div>
              <button onClick={() => setShowMore(!showMore)} className="mt-2 text-xs font-bold text-zinc-900 underline underline-offset-4 hover:no-underline transition-all">
                {showMore ? "Read less" : "Read more"}
              </button>
            </div>


            {/* Qty row + Add to bag */}
            <div className="flex gap-3 items-stretch">
              <div className="flex items-center rounded-xl border-2 border-stone-200 overflow-hidden bg-white">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="w-11 h-full flex items-center justify-center text-zinc-400 hover:bg-stone-100 transition-colors text-xl font-light select-none">−</button>
                <span className="w-10 text-center text-sm font-bold text-zinc-800 select-none">{qty}</span>
                <button onClick={() => setQty((q) => q + 1)} className="w-11 h-full flex items-center justify-center text-zinc-400 hover:bg-stone-100 transition-colors text-xl font-light select-none">+</button>
              </div>

              <button
                onClick={handleAdd}
                className={`flex-1 py-3.5 rounded-xl text-sm font-bold tracking-wide transition-all duration-300 ${added ? "bg-emerald-600 text-white" : "bg-zinc-900 text-white hover:bg-zinc-700 active:scale-95"
                  }`}
              >
                {added ? "✓  Added to Bag" : "Add to Bag"}
              </button>
            </div>

            {/* Buy now */}
            <button className="w-full py-3.5 rounded-xl border-2 border-zinc-900 bg-white text-zinc-900 text-sm font-bold tracking-wide hover:bg-zinc-900 hover:text-white transition-all duration-200 active:scale-95">
              Buy Now — ₹{(productDetails?.product_selling_price as number * qty).toFixed(2)}
            </button>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-2">
              {[
                { icon: "🚚", title: "Free delivery", sub: "orders over £50" },
                { icon: "↩", title: "Free returns", sub: "within 30 days" },
                { icon: "🔒", title: "Secure pay", sub: "SSL encrypted" },
              ].map((b) => (
                <div key={b.title} className="flex flex-col items-center text-center bg-stone-100 rounded-xl py-3 px-2 gap-0.5">
                  <span className="text-sm mb-0.5">{b.icon}</span>
                  <span className="text-xs font-bold text-zinc-700 leading-tight">{b.title}</span>
                  <span className="text-xs text-zinc-400 leading-tight">{b.sub}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-20">
          <div className="flex items-center gap-4 mb-8">
            <div className="flex-1 h-px bg-stone-200" />
            <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-400">You May Also Like</h2>
            <div className="flex-1 h-px bg-stone-200" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 lg:gap-6">
            {RELATED.map((item) => (
              <div key={item.id} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-2xl bg-stone-100 aspect-[3/4] mb-3">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {item.tag && (
                    <span className={`absolute top-3 left-3 text-xs font-bold tracking-widest px-2 py-0.5 rounded-sm ${item.tag === "SALE" ? "bg-red-600 text-white" : "bg-zinc-900 text-white"}`}>
                      {item.tag}
                    </span>
                  )}
                  <button className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow opacity-0 group-hover:opacity-100 transition-all hover:scale-110">
                    <HeartIcon filled={false} />
                  </button>
                  <div className="absolute bottom-3 left-3 right-3 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-200">
                    <button className="w-full bg-zinc-900/90 text-white text-xs font-bold tracking-wide py-2 rounded-lg">
                      Quick Add
                    </button>
                  </div>
                </div>
                <p className="text-sm font-semibold text-zinc-800 leading-tight mb-1 group-hover:text-zinc-500 transition-colors">{item.name}</p>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-zinc-900">{item.price}</span>
                  {item.was && <span className="text-xs text-zinc-400 line-through">{item.was}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-stone-200 bg-white py-8 mt-4">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            <div className="text-xs font-black tracking-widest text-zinc-900 uppercase">John Lewis &amp; Partners</div>
            <p className="text-xs text-zinc-400 mt-0.5">Quality. Honesty. Service. Since 1864.</p>
          </div>
          <p className="text-xs text-zinc-400">© 2026 John Lewis plc. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}