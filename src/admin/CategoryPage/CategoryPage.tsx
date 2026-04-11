import { useState } from "react";
import { Pencil, Trash2, Eye } from "lucide-react";
import CategoryModal from "./CategoryModal";
import CategoryViewModal from "./CategoryViewModal";
import {
  getAllCategories,
  updateCategory,
  deleteCategory,
} from "@/services/CategoryServices";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { ICategoryDocument } from "@kitchensathi12-arch/ecommerce-types";
import type { CategoryListResponse } from "node_modules/@kitchensathi12-arch/ecommerce-types/src/interface/category.interface";
import toast from "react-hot-toast";

const CategoryPage = () => {
  const [openModal, setOpenModal] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] =
    useState<ICategoryDocument | undefined>();
  const [search, setSearch] = useState("");

  const queryClient = useQueryClient();

  // ================= FETCH =================
  const { data, isLoading } = useQuery<CategoryListResponse>({
    queryKey: ["all-categories"],
    queryFn: () => getAllCategories({ page: 1, limit: 20 }),
  });

  // ================= TOGGLE =================
  const toggleMutation = useMutation({
    mutationFn: updateCategory,
    onSuccess: () => {
      toast.success("Category status updated");
      queryClient.invalidateQueries({ queryKey: ["all-categories"] });
    },
    onError: () => {
      toast.error("Failed to update category status");
    },
  });

  const handleToggle = (cat: ICategoryDocument) => {
    toggleMutation.mutate({
      id: cat._id.toString(),
      payload: { isActive: !cat.isActive } as any,
    });
  };

  const categories = data?.data ?? [];

  const filteredCategories = categories.filter((cat) =>
    cat.name?.toLowerCase().includes(search.toLowerCase())
  );

  // ================= DELETE =================
  const deleteMutation = useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      toast.success("Category deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["all-categories"] });
    },
    onError: () => {
      toast.error("Failed to delete category");
    },
  });

  const handleDelete = (id: string) => {
    const confirmDelete = window.confirm("Delete this category?");
    if (!confirmDelete) return;
    deleteMutation.mutate(id);
  };

  // ================= UPDATE =================
  const updateMutation = useMutation({
    mutationFn: updateCategory,
    onSuccess: (res) => {
      toast.success(res.message || "Category updated successfully");
      queryClient.invalidateQueries({ queryKey: ["all-categories"] });
      setOpenModal(false);
      setSelectedCategory(undefined);
    },
    onError: () => {
      toast.error("Failed to update category");
    },
  });

  return (
    <div className="flex flex-col gap-6 mb-10">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Category Management
          </h1>
          <p className="text-sm text-gray-500">
            Organize and control your product categories
          </p>
        </div>

        <button
          onClick={() => {
            setSelectedCategory(undefined);
            setOpenModal(true);
          }}
          className="px-6 py-3 bg-indigo-600 text-white rounded-xl shadow hover:bg-indigo-700 transition"
        >
          Add Category
        </button>
      </div>

      {/* SEARCH */}
      <div className="w-full md:w-1/2">
        <input
          type="text"
          placeholder="Search category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-white shadow-sm 
          focus:ring-2 focus:ring-indigo-500 outline-none"
        />
      </div>

      {/* GRID / EMPTY / LOADING */}
      {isLoading ? (
        <p className="text-gray-400 text-center mt-10">Loading...</p>
      ) : filteredCategories.length === 0 ? (
        <div className="flex justify-center items-center mt-20">
          <p className="text-gray-500 text-lg">
            No categories found
          </p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredCategories.map((category) => (
            <div
              key={category._id.toString()}
              className="group relative bg-white p-6 rounded-2xl border border-gray-100 
              shadow-sm hover:shadow-xl hover:-translate-y-1 
              transition-all duration-300 min-h-[180px] flex flex-col justify-between"
            >
              <div className="flex flex-col min-w-0">
                <h3 className="text-lg font-semibold text-gray-800 truncate">
                  {category.name}
                </h3>

                <p className="text-xs text-gray-400 mt-1 truncate">
                  Slug: {category.slug}
                </p>

                <span
                  className={`mt-4 inline-flex w-fit text-xs px-4 py-1 rounded-full ${category.isActive
                      ? "bg-green-100 text-green-600"
                      : "bg-gray-200 text-gray-500"
                    }`}
                >
                  {category.isActive ? "Active" : "Inactive"}
                </span>
              </div>

              {/* ACTIONS */}
              <div className="absolute top-4 right-4 flex gap-3 
              opacity-0 group-hover:opacity-100 
              transition-all duration-300">

                <Eye
                  size={18}
                  className="cursor-pointer text-gray-400 hover:text-indigo-600 hover:scale-110 transition"
                  onClick={() => {
                    setSelectedCategory(category);
                    setViewModalOpen(true);
                  }}
                />

                <Pencil
                  size={18}
                  className="cursor-pointer text-indigo-500 hover:scale-110 transition"
                  onClick={() => {
                    setSelectedCategory(category);
                    setOpenModal(true);
                  }}
                />

                <Trash2
                  size={18}
                  className="cursor-pointer text-red-500 hover:scale-110 transition"
                  onClick={() =>
                    handleDelete(category._id.toString())
                  }
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ADD / EDIT */}
      <CategoryModal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          setSelectedCategory(undefined);
        }}
        category={selectedCategory}
        mode={selectedCategory ? "edit" : "add"}
        onSubmit={(payload) => {
          if (selectedCategory) {
            updateMutation.mutate({
              id: selectedCategory._id.toString(),
              payload,
            });
          }
        }}
      />

      {/* VIEW */}
      <CategoryViewModal
        open={viewModalOpen}
        onClose={() => {
          setViewModalOpen(false);
          setSelectedCategory(undefined);
        }}
        category={selectedCategory}
      />
    </div>
  );
};

export default CategoryPage;