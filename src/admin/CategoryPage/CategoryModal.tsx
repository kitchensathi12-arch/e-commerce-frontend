import { useState, useEffect } from "react";
import { X, UploadCloud } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCategory } from "../../services/CategoryServices";
import {
  convertToBase64,
  type ICategoryDocument,
  type ICategoryPayload,
} from "@kitchensathi12-arch/ecommerce-types";
import toast from "react-hot-toast";

interface Props {
  open: boolean;
  onClose: () => void;
  category?: ICategoryDocument;
  mode: "add" | "edit";
  onSubmit: (payload: any) => void; // ✅ use `any` to avoid ICategoryPayload type conflicts
}

// ✅ Fully local type — no dependency on ICategoryPayload structure
interface LocalForm {
  name: string;
  slug: string;
  description: string;
  image: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string[];
  isActive: boolean;
}

const initialState: LocalForm = {
  name: "",
  slug: "",
  description: "",
  image: "",
  metaTitle: "",
  metaDescription: "",
  metaKeywords: [],
  isActive: true,
};

const CategoryModal = ({ open, onClose, category, mode, onSubmit }: Props) => {
  const [form, setForm] = useState<LocalForm>(initialState);
  const [imagePreview, setImagePreview] = useState<string>("");
  const queryClient = useQueryClient();

  // ── Populate form when editing ──────────────────────────────────
  useEffect(() => {
    if (mode === "edit" && category) {
      setForm({
        name: category.name || "",
        slug: category.slug || "",
        description: category.description || "",
        image: category.image || "",
        metaTitle: category.metaTitle || "",
        metaDescription: category.metaDescription || "",
        metaKeywords: category.metaKeywords || [],
        isActive: category.isActive ?? true,
      });
      setImagePreview(category.image || "");
    } else {
      setForm(initialState);
      setImagePreview("");
    }
  }, [mode, category, open]);

  // ── Slug generator ───────────────────────────────────────────────
  const generateSlug = (value: string) =>
    value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");

  // ── Image upload ─────────────────────────────────────────────────
  const handleImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const base64 = await convertToBase64(file);
      setForm((prev) => ({ ...prev, image: base64 }));
      setImagePreview(base64);
    } catch (error) {
      console.error("Image conversion failed:", error);
    }
  };

  // ── Create mutation ──────────────────────────────────────────────
  const createMutation = useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      toast.success("Category created");

      queryClient.invalidateQueries({ queryKey: ["all-categories"] });
      queryClient.invalidateQueries({ queryKey: ["active-categories"] });

      setForm(initialState);
      setImagePreview("");
      onClose();
    },
    onError: () => {
      toast.error("Failed to create category");
    },
  });

  // ── Submit — branches on mode ────────────────────────────────────
  const handleSubmit = () => {
    if (!form.name || !form.slug) {
      alert("Name and Slug are required");
      return;
    }
    if (mode === "edit") {
      onSubmit(form);
    } else {
      createMutation.mutate(form as any);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl p-6 space-y-5 animate-fadeIn max-h-[90vh] overflow-y-auto sm:max-w-md md:max-w-lg lg:max-w-xl">

        {/* Header */}
        <div className="flex justify-between items-center sticky top-0 bg-white z-10 pt-2 pb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            {mode === "edit" ? "Edit Category" : "Add Category"}
          </h2>
          <button onClick={onClose}>
            <X className="text-gray-400 hover:text-gray-600" />
          </button>
        </div>

        {/* Form */}
        <div className="space-y-4">
          {/* Name */}
          <input
            value={form.name}
            onChange={(e) => {
              const value = e.target.value;
              setForm((prev) => ({
                ...prev,
                name: value,
                slug: mode === "add" ? generateSlug(value) : prev.slug,
              }));
            }}
            placeholder="Category Name"
            className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
          />

          {/* Slug */}
          <input
            value={form.slug}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, slug: generateSlug(e.target.value) }))
            }
            placeholder="SEO Slug"
            className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
          />

          {/* Description */}
          <textarea
            value={form.description}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, description: e.target.value }))
            }
            placeholder="Description"
            className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
          />

          {/* Active Toggle */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Active</span>
            <input
              type="checkbox"
              checked={form.isActive}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, isActive: e.target.checked }))
              }
            />
          </div>

          {/* Image Upload */}
          <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-4 cursor-pointer hover:border-indigo-400 transition">
            {imagePreview ? (
              <img
                src={imagePreview}
                className="w-28 h-28 object-cover rounded-lg"
                alt="preview"
              />
            ) : (
              <>
                <UploadCloud className="text-gray-400 mb-2" />
                <span className="text-sm text-gray-500">Upload Image</span>
              </>
            )}
            <input type="file" accept="image/*" onChange={handleImage} className="hidden" />
          </label>

          {/* SEO Fields */}
          <input
            value={form.metaTitle}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, metaTitle: e.target.value }))
            }
            placeholder="Meta Title"
            className="w-full border border-gray-300 rounded-xl px-4 py-2"
          />
          <textarea
            value={form.metaDescription}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, metaDescription: e.target.value }))
            }
            placeholder="Meta Description"
            className="w-full border border-gray-300 rounded-xl px-4 py-2"
          />
          <input
            value={form.metaKeywords.join(", ")}
            placeholder="Meta Keywords (comma separated)"
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                metaKeywords: e.target.value
                  .split(",")
                  .map((k) => k.trim())
                  .filter(Boolean),
              }))
            }
            className="w-full border border-gray-300 rounded-xl px-4 py-2"
          />
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row justify-end gap-3 pt-3 sticky bottom-0 bg-white z-10 p-2">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-lg text-gray-500 hover:bg-gray-100 w-full sm:w-auto"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={createMutation.isPending}
            className="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition disabled:opacity-50 w-full sm:w-auto"
          >
            {createMutation.isPending
              ? "Saving..."
              : mode === "edit"
                ? "Update Category"
                : "Save Category"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryModal;