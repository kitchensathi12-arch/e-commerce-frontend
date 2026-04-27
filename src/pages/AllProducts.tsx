/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import {
  Search, SlidersHorizontal, X, Grid3X3, List, ShoppingBag,
} from 'lucide-react';
import type { Product, SidebarItem, } from '@/types/productsTypes';
import { ProductCard } from '@/components/productUI/productDetails';
import { SidebarSection } from '@/components/productUI/SideBardSection';
import { SkeletonCard } from '@/components/productUI/SekeltonLoading';
import { Pagination } from '@/components/productUI/productPagePagination';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getActiveCategories } from '@/services/CategoryServices';
import { getActiveBrands } from '@/services/BrandServices';
import { getAllProducts } from '@/services/ProductServices';


const SORT_OPTIONS = [
  { value: 'default', label: 'Default' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
  { value: 'newest', label: 'Newest First' },
];



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

  const [filter, setFilter] = useState<any>({
    category: [],
    brand: [],
    sort: "z-a",
    start_range: 1,
    end_range: 100000
  })
  const [categories, setCategories] = useState<SidebarItem[]>([]);
  const [brands, setBrands] = useState<SidebarItem[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [totalProducts, setTotalProducts] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loadingMeta, setLoadingMeta] = useState<boolean>(false);





  // --------- here i am using all the tanstack queries --------------

  const { data: allActiveCategories, isLoading: isCategoriesLoading } = useQuery({
    queryKey: ['active-categories'],
    queryFn: getActiveCategories,
  });

  const { data: allActiveBrands, isLoading: isBrandLoading } = useQuery({
    queryKey: ['active-brands'],
    queryFn: getActiveBrands,
  });

  const { mutate: GetAllProductData, isPending: isAllProductLoading } = useMutation({
    mutationFn: ({ params, body }: any) => getAllProducts(params, body),
    onSuccess: (data: any) => {
      setProducts(data?.data);
      setTotalProducts(data?.totalProduct);
      setTotalPages(data?.totalPage);

    }
  })


  useEffect(() => {
    if (allActiveCategories) {
      const formateCategories = allActiveCategories.map((c) => ({ id: c._id.toString(), name: c.name }));
      setCategories(formateCategories);
    }

    if (allActiveBrands) {
      const formateBrands = allActiveBrands.map((b) => ({ id: b._id.toString(), name: b.brand_name }));
      setBrands(formateBrands);
    }
  }, [allActiveCategories, allActiveBrands]);


  useEffect(() => {
    GetAllProductData({
      params: { page: 1, limit: 12 }, body: filter
    })
  }, []);


  // Debounce search
  useEffect(() => {
    const t = setTimeout(() => {
      GetAllProductData({
        params: { page: 1, limit: 12 }, body: filter
      })
    }, 500);
    return () => clearTimeout(t);
  }, [filter]);


  const handleCategoryChange = (id: string[]) => { setFilter({ ...filter, category: id }); setCurrentPage(1); };
  const handleBrandChange = (id: string[]) => { setFilter({ ...filter, brand: id }); setCurrentPage(1); };
  const handleSortChange = (val: string) => { setFilter({ ...filter, sort: val }); };
  const handlePageChange = (p: number) => { setCurrentPage(p); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  const clearAll = () => {
    setFilter({
      category: [],
      brand: [],
      sort: "z-a",
      start_range: 1,
      end_range: 100000
    })
  };



  const activeFiltersCount = [
    selectedCategory !== 'all',
    selectedBrand !== 'all',
    priceRange[0] > 0 || priceRange[1] < 80000,
  ].filter(Boolean).length;


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
          <SidebarSection title="Category" options={categories} selected={filter.category} onChange={handleCategoryChange} />
          <SidebarSection title="Brand" options={brands} selected={filter.brand} onChange={handleBrandChange} />
        </>
      )}

      <div className="mb-4">
        <p className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">Price Range</p>
        <div className="px-1">
          <input
            type="range"
            min={500}
            max={100000}
            value={filter.end_range}
            onChange={(e) => { setFilter({ ...filter, end_range: Number(e.target.value) }); }}
            className="w-full accent-red-600"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>₹500</span>
            <span className="font-medium text-red-600">Up to ₹{filter.end_range}</span>
          </div>
        </div>
      </div>
    </div>
  );

  if (isCategoriesLoading || isBrandLoading || isAllProductLoading) {
    return (
      <div>loading...</div>
    );
  }

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
                {'All Products'}
              </h1>
              <p className="text-sm text-gray-500 mt-0.5">
                {isAllProductLoading ? 'Loading…' : `${totalProducts} product${totalProducts !== 1 ? 's' : ''} found`}
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

          {/* ACTIVE FILTER CHIPS
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
          )} */}

          {/* PRODUCTS GRID / LIST */}
          {isAllProductLoading ? (
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
          {!isAllProductLoading && products.length > 0 && (
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
          )}
        </main>
      </div>
    </div>
  );
};

export default ProductsListingPage;