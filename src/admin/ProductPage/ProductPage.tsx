import { useState } from "react";
import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { Pencil, Trash2, Eye, Plus } from "lucide-react";
import toast from "react-hot-toast";

import type { IProductList } from "@kitchensathi12-arch/ecommerce-types";

import {
  getProductList,
  deleteProduct,
} from "@/services/ProductServices";
import { useNavigate } from "react-router-dom";



const ProductPage = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate()

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [viewProduct, setViewProduct] = useState<IProductList | null>(null);

  const limit = 8;

  /* ================= PRODUCTS ================= */

  const { data, isLoading, isError } = useQuery({
    queryKey: ["products", page],
    queryFn: () => getProductList({ page, limit }),
    placeholderData: (prev) => prev,
  });

  /* ================= DELETE ================= */

  const deleteMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      toast.success("Product deleted 🗑️");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: () => toast.error("Delete failed ❌"),
  });

  const handleDelete = (id: string) => {
    if (!window.confirm("Are you sure to delete this product?")) return;
    deleteMutation.mutate(id);
  };

  return (
    <div className="space-y-6">

      {/* ================= HEADER ================= */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">

        {/* LEFT */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">
            Product Management
          </h1>
          <p className="text-gray-500 text-sm mt-1 max-w-md">
            Organize and manage your products efficiently
          </p>
        </div>

        {/* RIGHT */}
        <button
          onClick={() => navigate("/product/new")}
          className="flex items-center justify-center gap-2 px-5 py-2.5 
        bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow hover:scale-105 transition"
        >
          <Plus size={18} />
          Add Product
        </button>
      </div>

      {/* ================= SEARCH ================= */}
      <div>
        <input
          type="text"
          placeholder="Search product..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="w-full md:w-1/3 px-4 py-3 rounded-xl bg-white shadow-sm 
        focus:ring-2 focus:ring-indigo-500 outline-none"
        />
      </div>

      {/* ================= STATES ================= */}
      {isLoading && (
        <p className="text-center text-gray-500 mt-10">
          Loading products...
        </p>
      )}

      {isError && (
        <p className="text-center text-red-500 mt-10">
          Error loading products
        </p>
      )}

      {/* ================= GRID ================= */}
      {!isLoading && !isError && (
        <div className="
        grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 
        lg:grid-cols-4 xl:grid-cols-5 gap-6
      ">
          {data?.data.map((product) => (
            <div
              key={product._id?.toString()}
              className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition overflow-hidden flex flex-col"
            >

              {/* IMAGE */}
              <div className="relative h-44 overflow-hidden">
                <img
                  src={
                    product.product_images?.find((img) => img?.image_url)?.image_url ||
                    "https://via.placeholder.com/300"
                  }
                  className="h-full w-full object-cover group-hover:scale-110 transition duration-300"
                />

                {/* ACTIONS */}
                <div className="absolute top-3 right-3 flex gap-2 
              opacity-100 md:opacity-0 md:group-hover:opacity-100 transition">

                  <button
                    onClick={() => setViewProduct(product)}
                    className="p-2 bg-white rounded-full shadow hover:scale-110"
                  >
                    <Eye size={16} className="text-blue-600" />
                  </button>

                  <button
                    onClick={() => navigate(`/product/${product._id?.toString()}`)}
                    className="p-2 bg-white rounded-full shadow hover:scale-110"
                  >
                    <Pencil size={16} className="text-green-600" />
                  </button>

                  <button
                    onClick={() =>
                      product._id && handleDelete(product._id.toString())
                    }
                    className="p-2 bg-white rounded-full shadow hover:scale-110"
                  >
                    <Trash2 size={16} className="text-red-500" />
                  </button>
                </div>
              </div>

              {/* CONTENT */}
              <div className="p-4 flex-1">
                <h2 className="font-semibold text-gray-800 line-clamp-1">
                  {product.product_name}
                </h2>

                <p className="text-indigo-600 font-bold mt-1">
                  ₹{product.product_selling_price}
                </p>

                <p className="text-xs text-gray-400 mt-1">
                  Stock: {product.product_stock}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ================= EMPTY ================= */}
      {!isLoading && data?.data.length === 0 && (
        <p className="text-center mt-10 text-gray-500">
          No products found
        </p>
      )}

      {/* ================= VIEW MODAL ================= */}
      {viewProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

          {/* BACKDROP */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setViewProduct(null)}
          />

          {/* MODAL — flex column with max height so it scrolls */}
          <div className="relative bg-white w-full max-w-2xl rounded-2xl shadow-xl flex flex-col max-h-[90vh]">

            {/* SCROLLABLE CONTENT */}
            <div className="overflow-y-auto flex-1">

              {/* IMAGE */}
              <div className="grid grid-cols-2 gap-2 p-4">
                {viewProduct.product_images?.length ? (
                  viewProduct.product_images.map((img, i) => (
                    <img
                      key={i}
                      src={img?.image_url}
                      className="w-full h-40 object-cover rounded-lg"
                    />
                  ))
                ) : (
                  <img
                    src="https://via.placeholder.com/400"
                    className="w-full h-56 object-cover rounded-lg col-span-2"
                  />
                )}
              </div>

              {/* CONTENT */}
              <div className="px-5 pb-5 space-y-3">

                <h2 className="text-2xl font-bold">
                  {viewProduct.product_name}
                </h2>

                <p className="text-gray-500 text-sm">
                  {viewProduct.product_title}
                </p>

                {/* PRICE */}
                <div className="flex items-center gap-4">
                  <span className="text-indigo-600 font-bold text-lg">
                    ₹{viewProduct.product_selling_price}
                  </span>

                  <span className="line-through text-gray-400">
                    ₹{viewProduct.product_mrp_price}
                  </span>
                </div>

                {/* DETAILS */}
                <div className="grid grid-cols-2 gap-4 text-sm mt-4">

                  <p>
                    <span className="font-semibold">SKU:</span>{" "}
                    {viewProduct.product_sku || "-"}
                  </p>

                  <p>
                    <span className="font-semibold">Slug:</span>{" "}
                    {viewProduct.product_slug || "-"}
                  </p>

                  <p>
                    <span className="font-semibold">Stock:</span>{" "}
                    {viewProduct.product_stock}
                  </p>

                  <p>
                    <span className="font-semibold">Status:</span>{" "}
                    {viewProduct.active ? "Active" : "Inactive"}
                  </p>

                  <p>
                    <span className="font-semibold">Category:</span>{" "}
                    {viewProduct.category?.name || "-"}
                  </p>

                  <p>
                    <span className="font-semibold">Brand:</span>{" "}
                    {viewProduct.brand?.brand_name || "-"}
                  </p>
                </div>
              </div>
            </div>

            {/* CLOSE BUTTON — always visible at bottom */}
            <div className="p-4 border-t border-gray-100 bg-white rounded-b-2xl">
              <button
                onClick={() => setViewProduct(null)}
                className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default ProductPage;