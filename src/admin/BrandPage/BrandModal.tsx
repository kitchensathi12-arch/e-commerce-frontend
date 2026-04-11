import { useState, useEffect } from "react";
import { X, UploadCloud } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBrand } from "@/services/BrandServices";
import {
  convertToBase64,
  type IBrandDocument,
} from "@kitchensathi12-arch/ecommerce-types";
import toast from "react-hot-toast";

interface Props {
  open: boolean;
  onClose: () => void;
  brand?: IBrandDocument;
  mode: "add" | "edit";
  onSubmit: (payload: any) => void;
  isLoading?: boolean;
}

interface LocalForm {
  brand_name: string;
  slug: string;
  description: string;
  authorized: boolean;
  brand_logo: string;
  certificate: string;
}

const initialState: LocalForm = {
  brand_name: "",
  slug: "",
  description: "",
  authorized: true,
  brand_logo: "",
  certificate: "",
};

const BrandModal = ({ open, onClose, brand, mode, onSubmit }: Props) => {
  const [form, setForm] = useState<LocalForm>(initialState);
  const [logoPreview, setLogoPreview] = useState("");
  const [certificatePreview, setCertificatePreview] = useState("");

  const queryClient = useQueryClient();

  // ================= Populate Edit Mode =================
  useEffect(() => {
    if (mode === "edit" && brand) {
      setForm({
        brand_name: brand.brand_name || "",
        slug: brand.slug || "",
        description: brand.description || "",
        authorized: brand.authorized ?? true,
        brand_logo: brand.brand_logo || "",
        certificate: brand.certificate || "",
      });

      setLogoPreview(brand.brand_logo || "");
      setCertificatePreview(brand.certificate || "");
    } else {
      setForm(initialState);
      setLogoPreview("");
      setCertificatePreview("");
    }
  }, [brand, mode, open]);

  // ================= Slug Generator =================
  const generateSlug = (value: string) =>
    value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");

  // ================= Logo Upload =================
  const handleLogo = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const base64 = await convertToBase64(file);
    setForm((prev) => ({ ...prev, brand_logo: base64 }));
    setLogoPreview(base64);
  };

  // ================= Certificate Upload =================
  const handleCertificate = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const base64 = await convertToBase64(file);
    setForm((prev) => ({ ...prev, certificate: base64 }));
    setCertificatePreview(base64);
  };

  // ================= Create Mutation =================
  const createMutation = useMutation({
    mutationFn: createBrand,

    onMutate: () => {
      toast.loading("Creating brand...", { id: "createBrand" });
    },

    onSuccess: () => {
      toast.success("Brand created successfully", { id: "createBrand" });

      queryClient.invalidateQueries({ queryKey: ["all-brands"] });
      queryClient.invalidateQueries({ queryKey: ["active-brands"] });

      setForm(initialState);
      setLogoPreview("");
      setCertificatePreview("");
      onClose();
    },

    onError: () => {
      toast.error("Failed to create brand", { id: "createBrand" });
    },
  });

  // ================= Submit =================
  const handleSubmit = () => {
    if (!form.brand_name || !form.slug) {
      alert("Brand name and slug required");
      return;
    }

    if (mode === "edit") {
      onSubmit(form);
    } else {
      createMutation.mutate(form);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl p-6 space-y-5 max-h-[90vh] overflow-y-auto">

        {/* HEADER */}
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">
            {mode === "edit" ? "Edit Brand" : "Add Brand"}
          </h2>
          <button onClick={onClose}>
            <X />
          </button>
        </div>

        {/* Brand Name */}
        <input
          value={form.brand_name}
          onChange={(e) => {
            const value = e.target.value;
            setForm((prev) => ({
              ...prev,
              brand_name: value,
              slug: mode === "add" ? generateSlug(value) : prev.slug,
            }));
          }}
          placeholder="Brand Name"
          className="w-full border rounded-xl px-4 py-2"
        />

        {/* Slug */}
        <input
          value={form.slug}
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,
              slug: generateSlug(e.target.value),
            }))
          }
          placeholder="Slug"
          className="w-full border rounded-xl px-4 py-2"
        />

        {/* Description */}
        <textarea
          value={form.description}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, description: e.target.value }))
          }
          placeholder="Description"
          className="w-full border rounded-xl px-4 py-2"
        />

        {/* Authorized */}
        <div className="flex justify-between items-center">
          <span>Authorized Brand</span>
          <input
            type="checkbox"
            checked={form.authorized}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                authorized: e.target.checked,
              }))
            }
          />
        </div>

        {/* ================= Logo Upload ================= */}
        <div>
          <p className="text-sm mb-2">Brand Logo</p>
          <label className="relative border-2 border-dashed rounded-xl p-4 flex justify-center cursor-pointer">
            {logoPreview ? (
              <div className="relative">
                <img
                  src={logoPreview}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setLogoPreview("");
                    setForm((prev) => ({ ...prev, brand_logo: "" }));
                  }}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600 transition"
                >
                  <X size={14} />
                </button>
              </div>
            ) : (
              <UploadCloud />
            )}

            <input
              type="file"
              className="hidden"
              onChange={handleLogo}
            />
          </label>
        </div>

        {/* ================= Certificate Upload ================= */}
        <div>
          <p className="text-sm mb-2">Certificate</p>
          <label className="relative border-2 border-dashed rounded-xl p-4 flex justify-center cursor-pointer">
            {certificatePreview ? (
              <div className="relative">
                <img
                  src={certificatePreview}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setCertificatePreview("");
                    setForm((prev) => ({ ...prev, certificate: "" }));
                  }}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600 transition"
                >
                  <X size={14} />
                </button>
              </div>
            ) : (
              <UploadCloud />
            )}

            <input
              type="file"
              className="hidden"
              onChange={handleCertificate}
            />
          </label>
        </div>

        {/* BUTTONS */}
        <div className="flex justify-end gap-3 pt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-lg"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={createMutation.isPending}
            className="px-5 py-2 bg-indigo-600 text-white rounded-lg"
          >
            {createMutation.isPending
              ? "Saving..."
              : mode === "edit"
                ? "Update Brand"
                : "Save Brand"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BrandModal;