import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

// ---------------------- local imports -------------------------
import { getProductById } from '@/service/product.service';
import { ImageGallery } from '@/components/ProductDetails/ImageGallery';
import { ProductInfo } from '@/components/ProductDetails/ProductInfo';
import { ProductCard } from '@/components/products/ProductCards';
import { ProductTabs } from '@/components/ProductDetails/ProductTabs';

// ── Sample Product Data ───────────────────────────────────────────────────────
const sampleProduct = {
    id: 1,
    name: 'ProBlend 750W Mixer Grinder',
    category: 'Mixer Grinders',
    price: 3299,
    mrp: 4999,
    rating: 4.6,
    reviews: 1248,
    badge: 'Best Seller',
    emoji: '🫙',
    desc: 'Powerful 750W motor with 3 stainless steel jars. Perfect for grinding spices, making chutneys, and preparing smooth batters. The powerful copper motor ensures smooth grinding every time.',
    colors: ['Silver', 'White', 'Black'],
    features: [
        '750W Motor',
        '3 SS Jars',
        '5-Year Warranty',
        'Overload Protection',
        'ISI Certified',
        'Anti-Skid Base',
    ],
    inStock: true,
    images: ['🫙', '⚙️', '🔩'],
};






const ArrowIcon = () => (
    <svg width={14} height={14} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6" />
    </svg>
);




// ── Breadcrumb ────────────────────────────────────────────────────────────────
function Breadcrumb({ product }) {
    return (
        <nav className="flex items-center gap-1.5 text-xs text-[#6B5B45] py-4">
            <span className="text-[#D4860B] cursor-pointer hover:underline font-medium">Home</span>
            <ArrowIcon />
            <span className="text-[#D4860B] cursor-pointer hover:underline font-medium">Products</span>
            <ArrowIcon />
            <span className="text-[#D4860B] cursor-pointer hover:underline font-medium">
                {product.category}
            </span>
            <ArrowIcon />
            <span className="text-[#6B5B45] truncate max-w-[200px]">{product.name}</span>
        </nav>
    );
}





// ── Main Product Detail Page ──────────────────────────────────────────────────
export default function ProductDetailPage() {

    // -------------- all hooks start here ------------
    const { id } = useParams();
    console.log(id)



    // ------------- all tanstack query start here --------------
    const { data: productDetail, isPending: isProductDetailPending } = useQuery({
        queryKey: ["product-details", [id]],
        queryFn: () => getProductById(id),
        enabled: !!id
    })


    const product = sampleProduct;


    if (!id && isProductDetailPending) {
        return <div>loading....</div>
    }

    return (
        <div className="min-h-screen bg-[#FAFAF7]">
            {/* Page Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-20">
                {/* Breadcrumb */}
                <Breadcrumb product={product} />

                {/* Main Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-14">
                    <ImageGallery images={productDetail?.product_images} />
                    <ProductInfo product={productDetail} />
                </div>

                {/* Tabs */}
                <div className="mb-14">
                    <ProductTabs product={productDetail} />
                </div>

                {/* Related Products */}
                <div>
                    <div className="flex items-end justify-between mb-6">
                        <div>
                            <div className="inline-block bg-[#FFF4E0] text-[#D4860B] border border-[#F0C870] rounded-full text-[11px] font-semibold tracking-widest uppercase px-3 py-1 mb-2">
                                You May Also Like
                            </div>
                            <h2 className="font-playfair text-2xl font-bold text-[#5C3A1E]">Related Products</h2>
                        </div>
                        <button className="text-sm text-[#D4860B] font-semibold cursor-pointer hover:underline bg-transparent border-none">
                            View All →
                        </button>
                    </div>

                      <ProductCard />
                </div>
            </div>
        </div>
    );
}
