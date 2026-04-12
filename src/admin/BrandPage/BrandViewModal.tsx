import { X } from 'lucide-react';
import type { IBrandDocument } from '@kitchensathi12-arch/ecommerce-types';

interface Props {
  open: boolean;
  onClose: () => void;
  brand?: IBrandDocument | null;
}

export default function BrandViewModal({ open, onClose, brand }: Props) {
  if (!open || !brand) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl p-6 space-y-6 max-h-[90vh] overflow-y-auto">
        {/* HEADER */}
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Brand Details</h2>
          <button onClick={onClose}>
            <X />
          </button>
        </div>

        {/* Logo */}
        <div className="flex justify-center">
          {brand.brand_logo ? (
            <img src={brand.brand_logo} className="w-24 h-24 object-cover rounded-xl" />
          ) : (
            <div className="w-24 h-24 bg-gray-100 flex items-center justify-center rounded-xl text-xs text-gray-400">No Logo</div>
          )}
        </div>

        {/* DETAILS */}
        <div className="space-y-3 text-sm">
          <div>
            <p className="text-gray-500">Brand Name</p>
            <p className="font-medium">{brand.brand_name}</p>
          </div>

          <div>
            <p className="text-gray-500">Slug</p>
            <p className="font-medium">{brand.slug}</p>
          </div>

          <div>
            <p className="text-gray-500">Description</p>
            <p className="font-medium">{brand.description || 'No description'}</p>
          </div>

          <div>
            <p className="text-gray-500">Authorized</p>
            <span className={`px-3 py-1 text-xs rounded-full ${brand.authorized ? 'bg-green-100 text-green-600' : 'bg-gray-200 text-gray-500'}`}>{brand.authorized ? 'Authorized' : 'Inactive'}</span>
          </div>

          {/* Certificate */}
          {brand.certificate && (
            <div>
              <p className="text-gray-500 mb-2">Certificate</p>
              <img src={brand.certificate} className="w-full rounded-xl border border-gray-300" />
            </div>
          )}
        </div>

        {/* BUTTON */}
        <div className="flex justify-end">
          <button onClick={onClose} className="px-5 py-2 bg-indigo-600 text-white rounded-lg">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
