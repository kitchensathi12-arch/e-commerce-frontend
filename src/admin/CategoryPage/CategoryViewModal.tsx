import { X } from 'lucide-react';
import { useEffect } from 'react';
import type { ICategoryDocument } from '@kitchensathi12-arch/ecommerce-types';

interface Props {
  open: boolean;
  onClose: () => void;
  category?: ICategoryDocument;
}

const CategoryViewModal = ({ open, onClose, category }: Props) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!open || !category) return null;

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm 
                 flex justify-center items-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-lg rounded-2xl 
                   shadow-2xl animate-fadeIn 
                   max-h-[90vh] overflow-y-auto relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold">Category Details</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-black transition">
            <X size={20} />
          </button>
        </div>

        {/* BODY */}
        <div className="p-6 space-y-4 text-sm break-words">
          {category.image && <img src={category.image} alt={category.name} className="w-full h-48 object-cover rounded-lg" />}

          <div>
            <span className="font-semibold">Name:</span>
            <p className="text-gray-700 mt-1 break-words">{category.name}</p>
          </div>

          <div>
            <span className="font-semibold">Slug:</span>
            <p className="text-gray-700 mt-1 break-all">{category.slug}</p>
          </div>

          <div>
            <span className="font-semibold">Description:</span>
            <p className="text-gray-700 mt-1 whitespace-pre-line break-words">{category.description || 'N/A'}</p>
          </div>

          <div>
            <span className="font-semibold">Status:</span>{' '}
            <span className={category.isActive ? 'text-green-600 font-medium' : 'text-gray-500 font-medium'}>{category.isActive ? 'Active' : 'Inactive'}</span>
          </div>

          <div>
            <span className="font-semibold">Meta Title:</span>
            <p className="text-gray-700 mt-1 break-words">{category.metaTitle || 'N/A'}</p>
          </div>

          <div>
            <span className="font-semibold">Meta Description:</span>
            <p className="text-gray-700 mt-1 break-words">{category.metaDescription || 'N/A'}</p>
          </div>

          <div>
            <span className="font-semibold">Keywords:</span>
            <p className="text-gray-700 mt-1 break-words">{category.metaKeywords?.length ? category.metaKeywords.join(', ') : 'N/A'}</p>
          </div>

          <div className="text-xs text-gray-400 pt-4 border-t">
            <p>Created: {new Date(category.createdAt).toLocaleString()}</p>
            <p>Updated: {new Date(category.updatedAt).toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryViewModal;
