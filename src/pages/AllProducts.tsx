/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useCallback } from 'react';
import {
  Search, SlidersHorizontal, X, ChevronDown, ChevronUp,
  Star, Grid3X3, List, ShoppingBag, ChevronLeft, ChevronRight,
} from 'lucide-react';
import { API } from '@/lib/api';

// ─── TYPES ────────────────────────────────────────────────────────────────────

interface Category {
  _id: string;
  name: string;
  slug: string;
  isActive: boolean;
}

interface Brand {
  _id: string;
  brand_name: string;
  brand_logo?: string;
  isActive?: boolean;
}

interface ProductImage {
  image_url: string;
  image_public_id?: string;
  _id?: string;
}

interface Product {
  _id: string;
  product_name: string;
  product_title?: string;
  product_selling_price: number;
  product_mrp_price: number;
  product_discount?: number;
  product_stock: number;
  product_images?: ProductImage[];
  is_featured?: boolean;
  is_new_arrival?: boolean;
  rating?: number;
  reviews?: number;
  badge?: string;
  category?: { _id: string; name: string };
  brand?: { _id: string; brand_name: string };
}

interface SidebarItem {
  id: string;
  name: string;
  count?: number;
}

// ─── API CALLS ────────────────────────────────────────────────────────────────

const getAllCategories = async ({ page = 1, limit = 100 } = {}): Promise<{ data: Category[]; totalData: number }> => {
  const res = await API.get('/category/get-category', { params: { page, limit } });
  return res.data;
};

const getAllBrands = async ({ page = 1, limit = 100 } = {}): Promise<{ data: Brand[]; totalData: number }> => {
  const res = await API.post('/brand/get-brands-list', { page, limit });
  return res.data;
};

interface ProductListParams {
  page?: number;
  limit?: number;
  category?: string;
  brand?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: string;
}

const getProductList = async (params: ProductListParams): Promise<{ data: Product[]; totalProduct: number; totalPage: number }> => {
  const body: Record<string, unknown> = {
    page: params.page ?? 1,
    limit: params.limit ?? 30,
  };
  if (params.category) body.category = params.category;
  if (params.brand) body.brand = params.brand;
  if (params.search) body.search = params.search;
  if (params.minPrice !== undefined) body.minPrice = params.minPrice;
  if (params.maxPrice !== undefined && params.maxPrice < 80000) body.maxPrice = params.maxPrice;
  if (params.sort && params.sort !== 'default') body.sort = params.sort;

  const res = await API.post('/product/get-product-list', body);
  return res.data;
};

// ─── CONSTANTS ────────────────────────────────────────────────────────────────

const PRODUCTS_PER_PAGE = 30;

const SORT_OPTIONS = [
  { value: 'default', label: 'Default' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
  { value: 'newest', label: 'Newest First' },
];

const badgeColors: Record<string, string> = {
  'Best Seller': 'bg-amber-100 text-amber-800',
  Hot: 'bg-red-100 text-red-800',
  New: 'bg-blue-100 text-blue-800',
  Sale: 'bg-green-100 text-green-800',
  Trending: 'bg-purple-100 text-purple-800',
  Premium: 'bg-red-100 text-red-800',
};

// ─── STARS ────────────────────────────────────────────────────────────────────

const Stars = ({ rating }: { rating: number }) => (
  <div className="flex items-center gap-0.5">
    {[1, 2, 3, 4, 5].map((s) => (
      <Star
        key={s}
        size={11}
        className={s <= Math.round(rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-200 fill-gray-200'}
      />
    ))}
  </div>
);

// ─── SIDEBAR SECTION ──────────────────────────────────────────────────────────

interface SidebarSectionProps {
  title: string;
  items: SidebarItem[];
  selected: string;
  onSelect: (id: string) => void;
}

const SidebarSection = ({ title, items, selected, onSelect }: SidebarSectionProps) => {
  const [open, setOpen] = useState(true);
  return (
    <div className="border-b border-gray-100 pb-4 mb-4">
      <button onClick={() => setOpen(!open)} className="flex items-center justify-between w-full mb-3">
        <span className="text-sm font-semibold text-gray-700 uppercase tracking-wide">{title}</span>
        {open ? <ChevronUp size={14} className="text-gray-400" /> : <ChevronDown size={14} className="text-gray-400" />}
      </button>
      {open && (
        <ul className="space-y-1">
          {items.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => onSelect(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all ${
                  selected === item.id ? 'bg-red-600 text-white font-medium' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <span>{item.name}</span>
                {item.count !== undefined && (
                  <span className={`text-xs px-1.5 py-0.5 rounded-full ${selected === item.id ? 'bg-red-500 text-red-100' : 'bg-gray-100 text-gray-500'}`}>
                    {item.count}
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// ─── PRODUCT CARD ─────────────────────────────────────────────────────────────

interface ProductCardProps {
  product: Product;
  view: 'grid' | 'list';
}

const ProductCard = ({ product, view }: ProductCardProps) => {
  const price = product.product_selling_price ?? 0;
  const mrp = product.product_mrp_price ?? price;
  const discount = mrp > price ? Math.round(((mrp - price) / mrp) * 100) : (product.product_discount ?? 0);
  const name = product.product_title ?? product.product_name ?? '';
  const stock = product.product_stock ?? 0;
  const rating = product.rating ?? 4.0;
  const reviews = product.reviews ?? 0;
  const badge = product.badge ?? (product.is_new_arrival ? 'New' : product.is_featured ? 'Best Seller' : '');
  const image = product.product_images?.[0]?.image_url
    ?? 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop';

  if (view === 'list') {
    return (
      <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden flex gap-4 p-4 hover:border-red-200 hover:shadow-md transition-all group">
        <div className="relative w-28 h-28 flex-shrink-0 rounded-xl overflow-hidden bg-gray-50">
          <img src={image} alt={name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
          {badge && (
            <span className={`absolute top-1.5 left-1.5 text-[10px] font-semibold px-1.5 py-0.5 rounded-md ${badgeColors[badge] ?? 'bg-gray-100 text-gray-600'}`}>
              {badge}
            </span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-800 text-sm line-clamp-1">{name}</h3>
          <div className="flex items-center gap-2 mt-1">
            <Stars rating={rating} />
            <span className="text-xs text-gray-400">({reviews})</span>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-red-600 font-bold text-base">₹{price.toLocaleString()}</span>
            {mrp > price && <span className="text-gray-400 text-xs line-through">₹{mrp.toLocaleString()}</span>}
            {discount > 0 && <span className="text-green-600 text-xs font-medium">{discount}% off</span>}
          </div>
          <p className="text-xs text-gray-400 mt-1">Stock: {stock} units</p>
        </div>
        <div className="flex-shrink-0 flex items-center">
          <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm rounded-xl transition-colors">View</button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden flex flex-col hover:border-red-200 hover:shadow-md transition-all group">
      <div className="relative h-48 overflow-hidden bg-gray-50">
        <img src={image} alt={name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        {badge && (
          <span className={`absolute top-3 left-3 text-[10px] font-semibold px-2 py-1 rounded-lg ${badgeColors[badge] ?? 'bg-gray-100 text-gray-600'}`}>
            {badge}
          </span>
        )}
        {discount > 0 && (
          <span className="absolute top-3 right-3 bg-white text-green-600 text-[10px] font-bold px-2 py-1 rounded-lg">{discount}% OFF</span>
        )}
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-semibold text-gray-800 text-sm line-clamp-2 flex-1">{name}</h3>
        <div className="flex items-center gap-1.5 mt-2">
          <Stars rating={rating} />
          <span className="text-xs text-gray-400">({reviews})</span>
        </div>
        <div className="mt-2 flex items-center gap-2">
          <span className="text-red-600 font-bold">₹{price.toLocaleString()}</span>
          {mrp > price && <span className="text-gray-400 text-xs line-through">₹{mrp.toLocaleString()}</span>}
        </div>
        <p className="text-xs text-gray-400 mt-1">Stock: {stock}</p>
        <button className="mt-3 w-full py-2 bg-red-500 hover:bg-red-600 text-white text-sm rounded-xl transition-colors">View Details</button>
      </div>
    </div>
  );
};

// ─── SKELETON ─────────────────────────────────────────────────────────────────

const SkeletonCard = ({ view }: { view: 'grid' | 'list' }) => {
  if (view === 'list') {
    return (
      <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden flex gap-4 p-4 animate-pulse">
        <div className="w-28 h-28 flex-shrink-0 rounded-xl bg-gray-200" />
        <div className="flex-1 space-y-2 pt-1">
          <div className="h-4 bg-gray-200 rounded w-3/4" />
          <div className="h-3 bg-gray-200 rounded w-1/2" />
          <div className="h-4 bg-gray-200 rounded w-1/3" />
        </div>
      </div>
    );
  }
  return (
    <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden flex flex-col animate-pulse">
      <div className="h-48 bg-gray-200" />
      <div className="p-4 space-y-2">
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-3 bg-gray-200 rounded w-1/2" />
        <div className="h-4 bg-gray-200 rounded w-1/3" />
        <div className="h-8 bg-gray-200 rounded-xl mt-3" />
      </div>
    </div>
  );
};

// ─── PAGINATION ───────────────────────────────────────────────────────────────

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  if (totalPages <= 1) return null;

  const delta = 2;
  const pages: number[] = [];
  for (let i = Math.max(1, currentPage - delta); i <= Math.min(totalPages, currentPage + delta); i++) {
    pages.push(i);
  }

  return (
    <div className="flex items-center justify-center gap-1.5 mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-xl border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
      >
        <ChevronLeft size={15} />
      </button>

      {pages[0] > 1 && (
        <>
          <button onClick={() => onPageChange(1)} className="w-9 h-9 rounded-xl border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition">1</button>
          {pages[0] > 2 && <span className="text-gray-400 text-sm px-1">…</span>}
        </>
      )}

      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={`w-9 h-9 rounded-xl border text-sm font-medium transition ${
            p === currentPage ? 'bg-red-600 border-red-600 text-white' : 'border-gray-200 text-gray-600 hover:bg-gray-50'
          }`}
        >
          {p}
        </button>
      ))}

      {pages[pages.length - 1] < totalPages && (
        <>
          {pages[pages.length - 1] < totalPages - 1 && <span className="text-gray-400 text-sm px-1">…</span>}
          <button onClick={() => onPageChange(totalPages)} className="w-9 h-9 rounded-xl border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition">
            {totalPages}
          </button>
        </>
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-xl border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
      >
        <ChevronRight size={15} />
      </button>
    </div>
  );
};

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────

const ProductsListingPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [searchInput, setSearchInput] = useState<string>('');
  const [search, setSearch] = useState<string>('');
  const [sort, setSort] = useState<string>('default');
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 80000]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [totalProducts, setTotalProducts] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loadingMeta, setLoadingMeta] = useState<boolean>(true);
  const [loadingProducts, setLoadingProducts] = useState<boolean>(true);

  // Debounce search
  useEffect(() => {
    const t = setTimeout(() => {
      setSearch(searchInput);
      setCurrentPage(1);
    }, 400);
    return () => clearTimeout(t);
  }, [searchInput]);

  // Fetch categories & brands once on mount
  useEffect(() => {
    setLoadingMeta(true);
    Promise.all([getAllCategories(), getAllBrands()])
      .then(([catRes, brandRes]) => {
        setCategories((catRes?.data ?? []).filter((c) => c.isActive !== false));
        setBrands(brandRes?.data ?? []);
      })
      .catch(console.error)
      .finally(() => setLoadingMeta(false));
  }, []);

  // Fetch products
  const fetchProducts = useCallback(async () => {
    setLoadingProducts(true);
    try {
      const params: ProductListParams = { page: currentPage, limit: PRODUCTS_PER_PAGE };
      if (selectedCategory !== 'all') params.category = selectedCategory;
      if (selectedBrand !== 'all') params.brand = selectedBrand;
      if (search.trim()) params.search = search.trim();
      if (priceRange[0] > 0) params.minPrice = priceRange[0];
      if (priceRange[1] < 80000) params.maxPrice = priceRange[1];
      if (sort !== 'default') params.sort = sort;

      const res = await getProductList(params);
      setProducts(res?.data ?? []);
      const total = res?.totalProduct ?? 0;
      setTotalProducts(total);
      setTotalPages(res?.totalPage ?? Math.ceil(total / PRODUCTS_PER_PAGE) ?? 1);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingProducts(false);
    }
  }, [currentPage, selectedCategory, selectedBrand, search, priceRange, sort]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleCategoryChange = (id: string) => { setSelectedCategory(id); setCurrentPage(1); setSidebarOpen(false); };
  const handleBrandChange = (id: string) => { setSelectedBrand(id); setCurrentPage(1); setSidebarOpen(false); };
  const handleSortChange = (val: string) => { setSort(val); setCurrentPage(1); };
  const handlePageChange = (p: number) => { setCurrentPage(p); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  const clearAll = () => {
    setSelectedCategory('all');
    setSelectedBrand('all');
    setPriceRange([0, 80000]);
    setSearchInput('');
    setSearch('');
    setCurrentPage(1);
  };

  const categoryItems: SidebarItem[] = [
    { id: 'all', name: 'All Categories' },
    ...categories.map((c) => ({ id: c._id, name: c.name })),
  ];

  const brandItems: SidebarItem[] = [
    { id: 'all', name: 'All Brands' },
    ...brands.map((b) => ({ id: b._id, name: b.brand_name })),
  ];

  const activeFiltersCount = [
    selectedCategory !== 'all',
    selectedBrand !== 'all',
    priceRange[0] > 0 || priceRange[1] < 80000,
  ].filter(Boolean).length;

  const selectedCategoryName = categories.find((c) => c._id === selectedCategory)?.name;
  const selectedBrandName = brands.find((b) => b._id === selectedBrand)?.brand_name;

  // ── Sidebar (extracted as inner component to access state) ─────────────────
  const SidebarContent = () => (
    <div className="w-full">
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-bold text-gray-800 text-base">Filters</h2>
        {activeFiltersCount > 0 && (
          <button onClick={clearAll} className="text-xs text-red-600 hover:underline flex items-center gap-1">
            <X size={11} /> Clear all
          </button>
        )}
      </div>

      {loadingMeta ? (
        <div className="space-y-2 animate-pulse">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-8 bg-gray-100 rounded-lg" />
          ))}
        </div>
      ) : (
        <>
          <SidebarSection title="Category" items={categoryItems} selected={selectedCategory} onSelect={handleCategoryChange} />
          <SidebarSection title="Brand" items={brandItems} selected={selectedBrand} onSelect={handleBrandChange} />
        </>
      )}

      <div className="mb-4">
        <p className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">Price Range</p>
        <div className="px-1">
          <input
            type="range"
            min={0}
            max={80000}
            step={500}
            value={priceRange[1]}
            onChange={(e) => { setPriceRange([priceRange[0], Number(e.target.value)]); setCurrentPage(1); }}
            className="w-full accent-red-600"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>₹0</span>
            <span className="font-medium text-red-600">Up to ₹{priceRange[1].toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* TOP BAR */}
      <div className="bg-white border-b border-gray-100 px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-screen-xl mx-auto flex items-center gap-3">
          <div className="flex-1 relative">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition"
            />
            {searchInput && (
              <button onClick={() => { setSearchInput(''); setSearch(''); }} className="absolute right-3 top-1/2 -translate-y-1/2">
                <X size={14} className="text-gray-400 hover:text-gray-600" />
              </button>
            )}
          </div>

          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-600 bg-white hover:bg-gray-50 relative"
          >
            <SlidersHorizontal size={15} />
            Filters
            {activeFiltersCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-red-600 text-white text-[10px] rounded-full flex items-center justify-center">
                {activeFiltersCount}
              </span>
            )}
          </button>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex gap-6">
        {/* DESKTOP SIDEBAR */}
        <aside className="hidden lg:block w-60 flex-shrink-0">
          <div className="bg-white rounded-2xl border border-gray-100 p-5 sticky top-6">
            <SidebarContent />
          </div>
        </aside>

        {/* MOBILE SIDEBAR OVERLAY */}
        {sidebarOpen && (
          <div className="lg:hidden fixed inset-0 z-50 flex">
            <div className="absolute inset-0 bg-black/40" onClick={() => setSidebarOpen(false)} />
            <div className="relative ml-auto w-72 max-w-full bg-white h-full overflow-y-auto p-5">
              <button onClick={() => setSidebarOpen(false)} className="mb-4 flex items-center gap-1 text-sm text-gray-500">
                <X size={14} /> Close
              </button>
              <SidebarContent />
            </div>
          </div>
        )}

        {/* MAIN CONTENT */}
        <main className="flex-1 min-w-0">
          {/* TOOLBAR */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
            <div>
              <h1 className="text-lg font-bold text-gray-800">
                {selectedCategory === 'all' ? 'All Products' : selectedCategoryName}
                {selectedBrand !== 'all' && ` · ${selectedBrandName}`}
              </h1>
              <p className="text-sm text-gray-500 mt-0.5">
                {loadingProducts ? 'Loading…' : `${totalProducts} product${totalProducts !== 1 ? 's' : ''} found`}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <select
                value={sort}
                onChange={(e) => handleSortChange(e.target.value)}
                className="text-sm border border-gray-200 rounded-xl px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-600"
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>

              <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden bg-white">
                <button onClick={() => setView('grid')} className={`p-2.5 transition ${view === 'grid' ? 'bg-red-600 text-white' : 'text-gray-500 hover:bg-gray-50'}`}>
                  <Grid3X3 size={15} />
                </button>
                <button onClick={() => setView('list')} className={`p-2.5 transition ${view === 'list' ? 'bg-red-600 text-white' : 'text-gray-500 hover:bg-gray-50'}`}>
                  <List size={15} />
                </button>
              </div>
            </div>
          </div>

          {/* ACTIVE FILTER CHIPS */}
          {activeFiltersCount > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {selectedCategory !== 'all' && (
                <span className="flex items-center gap-1 text-xs bg-red-50 text-red-700 px-3 py-1 rounded-full border border-red-200">
                  {selectedCategoryName}
                  <button onClick={() => handleCategoryChange('all')}><X size={11} /></button>
                </span>
              )}
              {selectedBrand !== 'all' && (
                <span className="flex items-center gap-1 text-xs bg-red-50 text-red-700 px-3 py-1 rounded-full border border-red-200">
                  {selectedBrandName}
                  <button onClick={() => handleBrandChange('all')}><X size={11} /></button>
                </span>
              )}
              {(priceRange[0] > 0 || priceRange[1] < 80000) && (
                <span className="flex items-center gap-1 text-xs bg-red-50 text-red-700 px-3 py-1 rounded-full border border-red-200">
                  Up to ₹{priceRange[1].toLocaleString()}
                  <button onClick={() => { setPriceRange([0, 80000]); setCurrentPage(1); }}><X size={11} /></button>
                </span>
              )}
            </div>
          )}

          {/* PRODUCTS GRID / LIST */}
          {loadingProducts ? (
            view === 'grid' ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} view="grid" />)}
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {Array.from({ length: 5 }).map((_, i) => <SkeletonCard key={i} view="list" />)}
              </div>
            )
          ) : products.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-gray-400">
              <ShoppingBag size={40} className="mb-3 opacity-30" />
              <p className="text-base font-medium">No products found</p>
              <button onClick={clearAll} className="mt-3 text-sm text-red-600 hover:underline">Clear filters</button>
            </div>
          ) : view === 'grid' ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
              {products.map((p) => <ProductCard key={p._id} product={p} view="grid" />)}
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {products.map((p) => <ProductCard key={p._id} product={p} view="list" />)}
            </div>
          )}

          {/* PAGINATION */}
          {!loadingProducts && products.length > 0 && (
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
          )}
        </main>
      </div>
    </div>
  );
};

export default ProductsListingPage;