/* eslint-disable react-hooks/static-components */
import { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, X, ChevronDown, ChevronUp, Star, Grid3X3, List, ShoppingBag } from 'lucide-react';

const CATEGORIES = [
  { id: 'all', name: 'All Products', count: 48 },
  { id: 'electronics', name: 'Electronics', count: 12 },
  { id: 'audio', name: 'Audio & Headphones', count: 8 },
  { id: 'kitchen', name: 'Kitchen Appliances', count: 10 },
  { id: 'clothing', name: 'Clothing', count: 9 },
  { id: 'fitness', name: 'Fitness & Sports', count: 9 },
];

const BRANDS = [
  { id: 'all', name: 'All Brands', count: 48 },
  { id: 'phillips', name: 'Phillips', count: 14 },
  { id: 'noise', name: 'Noise', count: 8 },
  { id: 'samsung', name: 'Samsung', count: 11 },
  { id: 'nike', name: 'Nike', count: 7 },
  { id: 'bosch', name: 'Bosch', count: 8 },
];

const MOCK_PRODUCTS = [
  {
    id: '1',
    name: 'Noise Airwave Max 4',
    price: 1699,
    mrp: 5999,
    category: 'audio',
    brand: 'noise',
    stock: 10,
    rating: 4.5,
    reviews: 128,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop',
    badge: 'Best Seller',
  },
  {
    id: '2',
    name: 'Phillips Air Fryer XL',
    price: 6499,
    mrp: 9999,
    category: 'kitchen',
    brand: 'phillips',
    stock: 5,
    rating: 4.3,
    reviews: 89,
    image: 'https://images.unsplash.com/photo-1585515320310-259814833e62?w=300&h=300&fit=crop',
    badge: 'Hot',
  },
  {
    id: '3',
    name: 'Samsung Galaxy Buds 2',
    price: 3999,
    mrp: 7999,
    category: 'electronics',
    brand: 'samsung',
    stock: 20,
    rating: 4.6,
    reviews: 245,
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=300&h=300&fit=crop',
    badge: 'New',
  },
  {
    id: '4',
    name: 'Nike Pro Training Shorts',
    price: 1299,
    mrp: 2499,
    category: 'fitness',
    brand: 'nike',
    stock: 15,
    rating: 4.2,
    reviews: 67,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop',
    badge: '',
  },
  {
    id: '5',
    name: 'Phillips Smart LED TV 43"',
    price: 28999,
    mrp: 42000,
    category: 'electronics',
    brand: 'phillips',
    stock: 3,
    rating: 4.7,
    reviews: 312,
    image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=300&h=300&fit=crop',
    badge: 'Sale',
  },
  {
    id: '6',
    name: 'Bosch Hand Blender',
    price: 2199,
    mrp: 3500,
    category: 'kitchen',
    brand: 'bosch',
    stock: 8,
    rating: 4.1,
    reviews: 43,
    image: 'https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=300&h=300&fit=crop',
    badge: '',
  },
  {
    id: '7',
    name: 'Nike Air Max 270',
    price: 7999,
    mrp: 12000,
    category: 'fitness',
    brand: 'nike',
    stock: 12,
    rating: 4.8,
    reviews: 521,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop',
    badge: 'Trending',
  },
  {
    id: '8',
    name: 'Samsung 65W Charger',
    price: 1499,
    mrp: 2999,
    category: 'electronics',
    brand: 'samsung',
    stock: 25,
    rating: 4.0,
    reviews: 88,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop',
    badge: '',
  },
  {
    id: '9',
    name: 'Noise ColorFit Ultra',
    price: 2999,
    mrp: 5999,
    category: 'fitness',
    brand: 'noise',
    stock: 18,
    rating: 4.4,
    reviews: 176,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop',
    badge: 'New',
  },
  {
    id: '10',
    name: 'Phillips Mixer Grinder',
    price: 3499,
    mrp: 5500,
    category: 'kitchen',
    brand: 'phillips',
    stock: 7,
    rating: 4.3,
    reviews: 95,
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=300&fit=crop',
    badge: '',
  },
  {
    id: '11',
    name: 'Bosch Cordless Drill',
    price: 5999,
    mrp: 8999,
    category: 'electronics',
    brand: 'bosch',
    stock: 6,
    rating: 4.5,
    reviews: 134,
    image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=300&h=300&fit=crop',
    badge: '',
  },
  {
    id: '12',
    name: 'Samsung QLED 55"',
    price: 52999,
    mrp: 75000,
    category: 'electronics',
    brand: 'samsung',
    stock: 2,
    rating: 4.9,
    reviews: 423,
    image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=300&h=300&fit=crop',
    badge: 'Premium',
  },
];

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

const Stars = ({ rating }: { rating: number }) => (
  <div className="flex items-center gap-0.5">
    {[1, 2, 3, 4, 5].map((s) => (
      <Star key={s} size={11} className={s <= Math.round(rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-200 fill-gray-200'} />
    ))}
  </div>
);

const SidebarSection = ({ title, items, selected, onSelect }: { title: string; items: { id: string; name: string; count: number }[]; selected: string; onSelect: (id: string) => void }) => {
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
                <span className={`text-xs px-1.5 py-0.5 rounded-full ${selected === item.id ? 'bg-red-500 text-red-100' : 'bg-gray-100 text-gray-500'}`}>{item.count}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const ProductCard = ({ product, view }: { product: (typeof MOCK_PRODUCTS)[0]; view: 'grid' | 'list' }) => {
  const discount = Math.round(((product.mrp - product.price) / product.mrp) * 100);

  if (view === 'list') {
    return (
      <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden flex gap-4 p-4 hover:border-red-200 hover:shadow-md transition-all group">
        <div className="relative w-28 h-28 flex-shrink-0 rounded-xl overflow-hidden bg-gray-50">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
          {product.badge && (
            <span className={`absolute top-1.5 left-1.5 text-[10px] font-semibold px-1.5 py-0.5 rounded-md ${badgeColors[product.badge] || 'bg-gray-100 text-gray-600'}`}>{product.badge}</span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-800 text-sm line-clamp-1">{product.name}</h3>
          <div className="flex items-center gap-2 mt-1">
            <Stars rating={product.rating} />
            <span className="text-xs text-gray-400">({product.reviews})</span>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-red-600 font-bold text-base">₹{product.price.toLocaleString()}</span>
            <span className="text-gray-400 text-xs line-through">₹{product.mrp.toLocaleString()}</span>
            <span className="text-green-600 text-xs font-medium">{discount}% off</span>
          </div>
          <p className="text-xs text-gray-400 mt-1">Stock: {product.stock} units</p>
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
        <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        {product.badge && <span className={`absolute top-3 left-3 text-[10px] font-semibold px-2 py-1 rounded-lg ${badgeColors[product.badge] || 'bg-gray-100 text-gray-600'}`}>{product.badge}</span>}
        <span className="absolute top-3 right-3 bg-white text-green-600 text-[10px] font-bold px-2 py-1 rounded-lg">{discount}% OFF</span>
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-semibold text-gray-800 text-sm line-clamp-2 flex-1">{product.name}</h3>
        <div className="flex items-center gap-1.5 mt-2">
          <Stars rating={product.rating} />
          <span className="text-xs text-gray-400">({product.reviews})</span>
        </div>
        <div className="mt-2 flex items-center gap-2">
          <span className="text-red-600 font-bold">₹{product.price.toLocaleString()}</span>
          <span className="text-gray-400 text-xs line-through">₹{product.mrp.toLocaleString()}</span>
        </div>
        <p className="text-xs text-gray-400 mt-1">Stock: {product.stock}</p>
        <button className="mt-3 w-full py-2 bg-red-500 hover:bg-red-600 text-white text-sm rounded-xl transition-colors">View Details</button>
      </div>
    </div>
  );
};

const ProductsListingPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('default');
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 80000]);

  const filtered = useMemo(() => {
    let result = [...MOCK_PRODUCTS];
    if (selectedCategory !== 'all') result = result.filter((p) => p.category === selectedCategory);
    if (selectedBrand !== 'all') result = result.filter((p) => p.brand === selectedBrand);
    if (search.trim()) result = result.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));
    result = result.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);
    if (sort === 'price_asc') result.sort((a, b) => a.price - b.price);
    if (sort === 'price_desc') result.sort((a, b) => b.price - a.price);
    if (sort === 'rating') result.sort((a, b) => b.rating - a.rating);
    return result;
  }, [selectedCategory, selectedBrand, search, sort, priceRange]);

  const activeFiltersCount = [selectedCategory !== 'all', selectedBrand !== 'all', priceRange[0] > 0 || priceRange[1] < 80000].filter(Boolean).length;

  const clearAll = () => {
    setSelectedCategory('all');
    setSelectedBrand('all');
    setPriceRange([0, 80000]);
    setSearch('');
  };

  const Sidebar = () => (
    <div className="w-full">
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-bold text-gray-800 text-base">Filters</h2>
        {activeFiltersCount > 0 && (
          <button onClick={clearAll} className="text-xs text-red-600 hover:underline flex items-center gap-1">
            <X size={11} /> Clear all
          </button>
        )}
      </div>

      <SidebarSection
        title="Category"
        items={CATEGORIES}
        selected={selectedCategory}
        onSelect={(id) => {
          setSelectedCategory(id);
          setSidebarOpen(false);
        }}
      />
      <SidebarSection
        title="Brand"
        items={BRANDS}
        selected={selectedBrand}
        onSelect={(id) => {
          setSelectedBrand(id);
          setSidebarOpen(false);
        }}
      />

      <div className="mb-4">
        <p className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">Price Range</p>
        <div className="px-1">
          <input type="range" min={0} max={80000} step={500} value={priceRange[1]} onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])} className="w-full accent-red-600" />
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
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition"
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2">
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
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-red-600 text-white text-[10px] rounded-full flex items-center justify-center">{activeFiltersCount}</span>
            )}
          </button>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex gap-6">
        {/* DESKTOP SIDEBAR */}
        <aside className="hidden lg:block w-60 flex-shrink-0">
          <div className="bg-white rounded-2xl border border-gray-100 p-5 sticky top-6">
            <Sidebar />
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
              <Sidebar />
            </div>
          </div>
        )}

        {/* MAIN CONTENT */}
        <main className="flex-1 min-w-0">
          {/* TOOLBAR */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
            <div>
              <h1 className="text-lg font-bold text-gray-800">
                {selectedCategory === 'all' ? 'All Products' : CATEGORIES.find((c) => c.id === selectedCategory)?.name}
                {selectedBrand !== 'all' && ` · ${BRANDS.find((b) => b.id === selectedBrand)?.name}`}
              </h1>
              <p className="text-sm text-gray-500 mt-0.5">
                {filtered.length} product{filtered.length !== 1 ? 's' : ''} found
              </p>
            </div>

            <div className="flex items-center gap-2">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="text-sm border border-gray-200 rounded-xl px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-600"
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
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

          {/* ACTIVE FILTERS CHIPS */}
          {activeFiltersCount > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {selectedCategory !== 'all' && (
                <span className="flex items-center gap-1 text-xs bg-red-50 text-red-700 px-3 py-1 rounded-full border border-red-200">
                  {CATEGORIES.find((c) => c.id === selectedCategory)?.name}
                  <button onClick={() => setSelectedCategory('all')}>
                    <X size={11} />
                  </button>
                </span>
              )}
              {selectedBrand !== 'all' && (
                <span className="flex items-center gap-1 text-xs bg-red-50 text-red-700 px-3 py-1 rounded-full border border-red-200">
                  {BRANDS.find((b) => b.id === selectedBrand)?.name}
                  <button onClick={() => setSelectedBrand('all')}>
                    <X size={11} />
                  </button>
                </span>
              )}
              {(priceRange[0] > 0 || priceRange[1] < 80000) && (
                <span className="flex items-center gap-1 text-xs bg-red-50 text-red-700 px-3 py-1 rounded-full border border-red-200">
                  Up to ₹{priceRange[1].toLocaleString()}
                  <button onClick={() => setPriceRange([0, 80000])}>
                    <X size={11} />
                  </button>
                </span>
              )}
            </div>
          )}

          {/* PRODUCTS */}
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-gray-400">
              <ShoppingBag size={40} className="mb-3 opacity-30" />
              <p className="text-base font-medium">No products found</p>
              <button onClick={clearAll} className="mt-3 text-sm text-red-600 hover:underline">
                Clear filters
              </button>
            </div>
          ) : view === 'grid' ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} view="grid" />
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} view="list" />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ProductsListingPage;
