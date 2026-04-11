import { useEffect, useState } from "react";
import { X } from "lucide-react";
import type { IBannerDocumnt, ICreateBannerPayload } from "@kitchensathi12-arch/ecommerce-types";

type BannerType = "hero" | "category" | "offer" | "popup";

interface Props {
  open: boolean;
  onClose: () => void;
  editTarget: IBannerDocumnt | null;
  isPending?: boolean; // ✅ Added from BannerPage's saveMutation
  onSubmit: (
    data:
      | (Omit<ICreateBannerPayload, "image"> & { image?: File })
      | (Partial<Omit<ICreateBannerPayload, "image">> & {
        image?: string | File;
      })
  ) => void;
}

const BannerModal = ({ open, onClose, editTarget, onSubmit, isPending = false }: Props) => {
  // ✅ Removed internal useMutation — actual submit happens in BannerPage's saveMutation
  // isPending now comes as a prop so the button correctly reflects loading state

  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    buttonText: "",
    redirectUrl: "",
    type: "hero" as BannerType,
    priority: 1,
    isActive: true,
    startDate: "",
    endDate: "",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");

  useEffect(() => {
    if (editTarget) {
      setForm({
        title: editTarget.title || "",
        subtitle: editTarget.subtitle || "",
        buttonText: editTarget.buttonText || "",
        redirectUrl: editTarget.redirectUrl || "",
        type: (editTarget.type as BannerType) || "hero",
        priority: editTarget.priority || 1,
        isActive: editTarget.isActive ?? true,
        startDate: editTarget.startDate
          ? new Date(editTarget.startDate).toISOString().split("T")[0]
          : "",
        endDate: editTarget.endDate
          ? new Date(editTarget.endDate).toISOString().split("T")[0]
          : "",
      });

      if (editTarget.image) {
        setImagePreview(editTarget.image);
      }
    } else {
      // ✅ Reset form when opening for create
      setForm({
        title: "",
        subtitle: "",
        buttonText: "",
        redirectUrl: "",
        type: "hero",
        priority: 1,
        isActive: true,
        startDate: "",
        endDate: "",
      });
      setImageFile(null);
      setImagePreview("");
    }
  }, [editTarget, open]);

  const handleChange = (
    key: keyof Omit<ICreateBannerPayload, "image"> | "image",
    value: string | number | boolean | File | null | undefined
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleImageSelect = (file: File) => {
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview("");
  };

  const handleSubmit = () => {
    if (!imageFile && !editTarget) {
      alert("Image is required");
      return;
    }

    const payload = {
      ...form,
      image: imageFile || editTarget?.image,
      startDate: form.startDate ? new Date(form.startDate).toISOString() : null,
      endDate: form.endDate ? new Date(form.endDate).toISOString() : null,
    };

    onSubmit(payload);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Overlay */}
      <div
        className="flex-1 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div className="w-full sm:w-[480px] bg-white h-full shadow-2xl p-6 overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-gray-300">
          <h2 className="text-xl font-semibold text-gray-800">
            {editTarget ? "Edit Banner" : "Create Banner"}
          </h2>

          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-2 rounded-md hover:bg-gray-100 transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <div className="space-y-5 mt-6">
          {/* Title */}
          <Input
            label="Title"
            value={form.title}
            onChange={(v) => handleChange("title", v)}
          />

          {/* Subtitle */}
          <Input
            label="Subtitle"
            value={form.subtitle}
            onChange={(v) => handleChange("subtitle", v)}
          />

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Banner Image
            </label>

            {!imagePreview ? (
              <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-6 cursor-pointer hover:border-indigo-400 transition">
                <span className="text-sm text-gray-500">
                  Click to upload image
                </span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) =>
                    e.target.files && handleImageSelect(e.target.files[0])
                  }
                />
              </label>
            ) : (
              <div className="relative">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-48 object-cover rounded-xl border border-gray-300"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-2 right-2 bg-white rounded-full p-1 shadow hover:bg-red-50"
                  aria-label="Remove image"
                >
                  <X size={16} className="text-red-500" />
                </button>
              </div>
            )}
          </div>

          {/* Button Text */}
          <Input
            label="Button Text"
            value={form.buttonText}
            onChange={(v) => handleChange("buttonText", v)}
          />

          {/* Redirect URL */}
          <Input
            label="Redirect URL"
            value={form.redirectUrl}
            onChange={(v) => handleChange("redirectUrl", v)}
          />

          {/* Type */}
          <SelectField
            label="Banner Type"
            value={form.type}
            onChange={(v) => handleChange("type", v)}
          />

          {/* Priority */}
          <Input
            label="Priority"
            type="number"
            value={form.priority}
            onChange={(v) => handleChange("priority", Number(v))}
          />

          {/* Active */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={form.isActive}
              onChange={(e) => handleChange("isActive", e.target.checked)}
              className="h-4 w-4"
            />
            <span className="text-sm text-gray-700 font-medium">
              Active Banner
            </span>
          </div>

          {/* Dates */}
          <Input
            label="Start Date"
            type="date"
            value={form.startDate}
            onChange={(v) => handleChange("startDate", v)}
          />

          <Input
            label="End Date"
            type="date"
            value={form.endDate}
            onChange={(v) => handleChange("endDate", v)}
          />

          {/* Submit */}
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isPending}
            className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition shadow-sm disabled:opacity-50"
          >
            {/* ✅ Shows Creating... or Updating... based on editTarget + isPending */}
            {isPending
              ? editTarget
                ? "Updating..."
                : "Creating..."
              : editTarget
                ? "Update Banner"
                : "Create Banner"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BannerModal;

/* ---------------- Reusable Inputs ---------------- */

interface InputProps {
  label: string;
  value: string | number;
  onChange: (value: string) => void;
  type?: string;
}

const Input = ({ label, value, onChange, type = "text" }: InputProps) => (
  <div>
    <label className="block text-sm font-medium mb-1 text-gray-700">
      {label}
    </label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 outline-none transition"
    />
  </div>
);

interface SelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

const SelectField = ({ label, value, onChange }: SelectProps) => (
  <div>
    <label className="block text-sm font-medium mb-1 text-gray-700">
      {label}
    </label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 outline-none transition"
    >
      <option value="hero">Hero</option>
      <option value="category">Category</option>
      <option value="offer">Offer</option>
      <option value="popup">Popup</option>
    </select>
  </div>
);