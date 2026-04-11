import { useState } from "react";
import {
  Trash2,
  Package,
  Tags,
  FolderTree,
  RotateCcw,
  Search,
  Ribbon,
} from "lucide-react";
import {
  getDeletedCategories,
  restoreCategory,
} from "@/services/CategoryServices";
import type { ICategoryDocument } from "@kitchensathi12-arch/ecommerce-types";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getDeletedProducts, restoreProduct, deleteProduct } from "@/services/ProductServices";
import { getDeletedBrands, restoreBrand } from "@/services/BrandServices";
import type { IProductList, IBrandDocument } from "@kitchensathi12-arch/ecommerce-types";

type TabKey = "products" | "brands" | "categories" | "banners";

const TABS = [
  { key: "products", label: "Products", icon: <Package size={16} /> },
  { key: "brands", label: "Brands", icon: <Tags size={16} /> },
  { key: "categories", label: "Categories", icon: <FolderTree size={16} /> },
  { key: "banners", label: "Banners", icon: <Ribbon size={16} /> },
];

const BinPage = () => {
  const [tab, setTab] = useState<TabKey>("products");
  const [search, setSearch] = useState("");
  const queryClient = useQueryClient();

  // ── Fetch deleted products ──
  const {
    data: productData,
    isLoading: productLoading,
    isError: productError,
  } = useQuery({
    queryKey: ["deleted-products"],
    queryFn: () => getDeletedProducts(),
    enabled: tab === "products",
  });

  // ── Fetch deleted brands ──
  const {
    data: brandData,
    isLoading: brandLoading,
    isError: brandError,
  } = useQuery({
    queryKey: ["deleted-brands"],
    queryFn: () => getDeletedBrands(),
    enabled: tab === "brands",
  });

  const {
    data: categoryData,
    isLoading: categoryLoading,
    isError: categoryError,
  } = useQuery({
    queryKey: ["deleted-categories"],
    queryFn: () => getDeletedCategories({ page: 1, limit: 50 }),
    enabled: tab === "categories",
  });

  const { mutate: handleRestoreCategory, isPending: isRestoringCategory } =
    useMutation({
      mutationFn: restoreCategory,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["deleted-categories"] });
        queryClient.invalidateQueries({ queryKey: ["categories"] });
      },
      onError: (err: any) => {
        alert(err?.response?.data?.message || "Failed to restore category.");
      },
    });
  const categories: ICategoryDocument[] = categoryData?.data ?? [];

  const filteredCategories = categories.filter((c) =>
    (c.name ?? "").toLowerCase().includes(search.toLowerCase())
  );

  // ── Restore product ──
  const { mutate: handleRestoreProduct, isPending: isRestoringProduct } = useMutation({
    mutationFn: restoreProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["deleted-products"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (err: any) => {
      alert(err?.response?.data?.message || "Failed to restore product.");
    },
  });

  // ── Delete product permanently ──
  const { mutate: handleDeleteProduct, isPending: isDeletingProduct } = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["deleted-products"] });
    },
    onError: (err: any) => {
      alert(err?.response?.data?.message || "Failed to delete product.");
    },
  });

  // ── Restore brand ──
  const { mutate: handleRestoreBrand, isPending: isRestoringBrand } = useMutation({
    mutationFn: restoreBrand,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["deleted-brands"] });
      queryClient.invalidateQueries({ queryKey: ["brands"] });
    },
    onError: (err: any) => {
      alert(err?.response?.data?.message || "Failed to restore brand.");
    },
  });

  const confirmDeleteProduct = (id: string) => {
    if (confirm("Permanently delete this product? This cannot be undone.")) {
      handleDeleteProduct(id);
    }
  };

  const products: IProductList[] = productData?.data ?? [];
  const brands: IBrandDocument[] = brandData?.data ?? [];

  const filteredProducts = products.filter((p) =>
    (p.product_name ?? "").toLowerCase().includes(search.toLowerCase())
  );

  const filteredBrands = brands.filter((b) =>
    (b.brand_name ?? "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bin-container">
      <style>{`
        .bin-container {
          padding: 24px;
          background: #f8f9fb;
          min-height: 100vh;
          font-family: Inter, sans-serif;
        }
        .bin-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
          margin-bottom: 20px;
        }
        .bin-title {
          font-size: 20px;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .bin-tabs {
          display: flex;
          gap: 10px;
          margin-bottom: 16px;
          flex-wrap: wrap;
        }
        .bin-tab {
          padding: 8px 14px;
          border-radius: 8px;
          border: 1px solid #e5e7eb;
          background: white;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: background 0.15s, color 0.15s;
        }
        .bin-tab.active {
          background: #4f46e5;
          color: white;
          border-color: #4f46e5;
        }
        .bin-toolbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 12px;
        }
        .bin-search {
          display: flex;
          align-items: center;
          gap: 8px;
          background: white;
          border: 1px solid #e5e7eb;
          padding: 6px 10px;
          border-radius: 8px;
        }
        .bin-search input {
          border: none;
          outline: none;
          font-size: 13px;
        }
        .bin-table {
          width: 100%;
          border-collapse: collapse;
          background: white;
          border-radius: 10px;
          overflow: hidden;
        }
        .bin-table th {
          text-align: left;
          font-size: 12px;
          color: #6b7280;
          padding: 10px 14px;
          border-bottom: 1px solid #eee;
        }
        .bin-table td {
          padding: 12px 14px;
          border-bottom: 1px solid #f1f1f1;
          font-size: 14px;
        }
        .bin-actions {
          display: flex;
          gap: 6px;
        }
        .btn {
          border: none;
          padding: 6px 10px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 12px;
          display: flex;
          align-items: center;
          gap: 4px;
          transition: opacity 0.2s;
        }
        .btn:disabled { opacity: 0.5; cursor: not-allowed; }
        .btn-restore { background: #eef2ff; color: #4f46e5; }
        .btn-delete  { background: #fee2e2; color: #ef4444; }
        .bin-state {
          text-align: center;
          padding: 48px 20px;
          color: #9ca3af;
          font-size: 14px;
        }
        .brand-logo {
          width: 32px;
          height: 32px;
          border-radius: 6px;
          object-fit: cover;
        }
        .brand-cell {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        @media (max-width: 700px) {
          .bin-table th:nth-child(2),
          .bin-table td:nth-child(2) { display: none; }
        }
      `}</style>

      {/* Header */}
      <div className="bin-header">
        <div className="bin-title">
          <Trash2 size={20} /> Recycle Bin
        </div>
      </div>

      {/* Tabs */}
      <div className="bin-tabs">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => { setTab(t.key as TabKey); setSearch(""); }}
            className={`bin-tab ${tab === t.key ? "active" : ""}`}
          >
            {t.icon}
            {t.label}
          </button>
        ))}
      </div>

      {/* Toolbar */}
      <div className="bin-toolbar">
        <div className="bin-search">
          <Search size={14} />
          <input
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <table className="bin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Deleted Date</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {/* ── Products Tab ── */}
          {tab === "products" && (
            <>
              {productLoading && (
                <tr><td colSpan={3} className="bin-state">Loading...</td></tr>
              )}
              {productError && (
                <tr><td colSpan={3} className="bin-state" style={{ color: "#ef4444" }}>Failed to load deleted products.</td></tr>
              )}
              {!productLoading && !productError && filteredProducts.length === 0 && (
                <tr><td colSpan={3} className="bin-state">No deleted products found.</td></tr>
              )}
              {!productLoading && !productError && filteredProducts.map((product) => (
                <tr key={String(product._id)}>
                  <td>{product.product_name ?? "—"}</td>
                  <td>
                    {product.deleted_at
                      ? new Date(product.deleted_at).toLocaleDateString("en-IN")
                      : "—"}
                  </td>
                  <td>
                    <div className="bin-actions">
                      <button
                        className="btn btn-restore"
                        disabled={isRestoringProduct}
                        onClick={() => handleRestoreProduct(String(product._id))}
                      >
                        <RotateCcw size={14} />
                        {isRestoringProduct ? "Restoring..." : "Restore"}
                      </button>
                      <button
                        className="btn btn-delete"
                        disabled={isDeletingProduct}
                        onClick={() => confirmDeleteProduct(String(product._id))}
                      >
                        <Trash2 size={14} />
                        {isDeletingProduct ? "Deleting..." : "Delete"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </>
          )}

          {/* ── Brands Tab ── */}
          {tab === "brands" && (
            <>
              {brandLoading && (
                <tr><td colSpan={3} className="bin-state">Loading...</td></tr>
              )}
              {brandError && (
                <tr><td colSpan={3} className="bin-state" style={{ color: "#ef4444" }}>Failed to load deleted brands.</td></tr>
              )}
              {!brandLoading && !brandError && filteredBrands.length === 0 && (
                <tr><td colSpan={3} className="bin-state">No deleted brands found.</td></tr>
              )}
              {!brandLoading && !brandError && filteredBrands.map((brand) => (
                <tr key={String(brand._id)}>
                  <td>
                    <div className="brand-cell">
                      {(brand as any).brand_logo && (
                        <img
                          src={(brand as any).brand_logo}
                          alt={brand.brand_name}
                          className="brand-logo"
                        />
                      )}
                      {brand.brand_name ?? "—"}
                    </div>
                  </td>
                  <td>
                    {(brand as any).deleted_at
                      ? new Date((brand as any).deleted_at).toLocaleDateString("en-IN")
                      : "—"}
                  </td>
                  <td>
                    <div className="bin-actions">
                      <button
                        className="btn btn-restore"
                        disabled={isRestoringBrand}
                        onClick={() => handleRestoreBrand(String(brand._id))}
                      >
                        <RotateCcw size={14} />
                        {isRestoringBrand ? "Restoring..." : "Restore"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </>
          )}

          {/* ── Categories Tab ── */}
          {tab === "categories" && (
            <>
              {categoryLoading && (
                <tr>
                  <td colSpan={3} className="bin-state">
                    Loading...
                  </td>
                </tr>
              )}

              {categoryError && (
                <tr>
                  <td colSpan={3} className="bin-state" style={{ color: "#ef4444" }}>
                    Failed to load deleted categories.
                  </td>
                </tr>
              )}

              {!categoryLoading && !categoryError && filteredCategories.length === 0 && (
                <tr>
                  <td colSpan={3} className="bin-state">
                    No deleted categories found.
                  </td>
                </tr>
              )}

              {!categoryLoading &&
                !categoryError &&
                filteredCategories.map((category) => (
                  <tr key={String(category._id)}>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        {category.image && (
                          <img
                            src={category.image}
                            alt={category.name}
                            style={{
                              width: "32px",
                              height: "32px",
                              borderRadius: "6px",
                              objectFit: "cover",
                            }}
                          />
                        )}
                        {category.name ?? "—"}
                      </div>
                    </td>

                    <td>
                      {category.deleted_at
                        ? new Date(category.deleted_at).toLocaleDateString("en-IN")
                        : "—"}
                    </td>

                    <td>
                      <div className="bin-actions">
                        <button
                          className="btn btn-restore"
                          disabled={isRestoringCategory}
                          onClick={() =>
                            handleRestoreCategory(String(category._id))
                          }
                        >
                          <RotateCcw size={14} />
                          {isRestoringCategory ? "Restoring..." : "Restore"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </>
          )}

          {/* ── Other Tabs ── */}
          {tab !== "products" && tab !== "brands" && tab !== "categories" && (
            <tr>
              <td colSpan={3} className="bin-state">
                {TABS.find((t) => t.key === tab)?.label} bin coming soon.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BinPage;