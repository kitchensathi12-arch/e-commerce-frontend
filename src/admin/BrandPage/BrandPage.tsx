/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { Plus, Eye, Pencil, Trash2 } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { IBrandDocument } from '@kitchensathi12-arch/ecommerce-types';
import BrandModal from './BrandModal';

import { getAllBrands, deleteBrand, updateBrand, createBrand, type BrandListResponse } from '@/services/BrandServices';
import toast from 'react-hot-toast';
import BrandViewModal from './BrandViewModal';

export default function BrandPage() {
  const queryClient = useQueryClient();

  const [openModal, setOpenModal] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState<IBrandDocument | null>(null);
  const [mode, setMode] = useState<'add' | 'edit'>('add');

  const [page, setPage] = useState(1);
  const limit = 8;

  const [viewModal, setViewModal] = useState(false);
  const [search, setSearch] = useState('');
  const [viewBrand, setViewBrand] = useState<IBrandDocument | null>(null);

  // ================= GET BRANDS =================
  const { data, isLoading, isFetching } = useQuery<BrandListResponse>({
    queryKey: ['brands', page],
    queryFn: () => getAllBrands({ page, limit }),
  });

  const brands = data?.data ?? [];
  const totalPage = data?.totalPage ?? 1;

  const filteredBrands = brands.filter((brand) => brand.brand_name?.toLowerCase().includes(search.toLowerCase()));

  // ================= CREATE =================
  const createMutation = useMutation({
    mutationFn: createBrand,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['brands'] });
      setOpenModal(false);
    },
  });

  // ================= UPDATE =================
  const updateMutation = useMutation({
    mutationFn: updateBrand,
    onMutate: () => {
      toast.loading('Updating brand...', { id: 'brandUpdate' });
    },
    onSuccess: () => {
      toast.success('Brand updated successfully', { id: 'brandUpdate' });
      queryClient.invalidateQueries({ queryKey: ['brands'] });
      setOpenModal(false);
    },
    onError: () => {
      toast.error('Failed to update brand', { id: 'brandUpdate' });
    },
  });

  // ================= DELETE =================
  const deleteMutation = useMutation({
    mutationFn: deleteBrand,
    onMutate: () => {
      toast.loading('Deleting brand...', { id: 'brandDelete' });
    },
    onSuccess: () => {
      toast.success('Brand deleted successfully', { id: 'brandDelete' });
      queryClient.invalidateQueries({ queryKey: ['brands'] });
    },
    onError: () => {
      toast.error('Failed to delete brand', { id: 'brandDelete' });
    },
  });

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this brand?')) {
      deleteMutation.mutate(id);
    }
  };

  const handleAdd = () => {
    setSelectedBrand(null);
    setMode('add');
    setOpenModal(true);
  };

  const handleEdit = (brand: IBrandDocument) => {
    setSelectedBrand(brand);
    setMode('edit');
    setOpenModal(true);
  };

  // ================= SUBMIT =================
  const handleSubmit = (formData: FormData) => {
    if (mode === 'add') {
      createMutation.mutate(formData as any);
    } else if (mode === 'edit' && selectedBrand?._id) {
      updateMutation.mutate({
        id: selectedBrand._id.toString(),
        payload: formData,
      });
    }
  };

  return (
    <div>
      {/* ================= HEADER + SEARCH ================= */}
      <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Brand Management</h1>
            <p className="text-gray-500 text-sm">Organize and manage your brands</p>
          </div>

          <button onClick={handleAdd} className="flex items-center justify-center gap-2 bg-indigo-600 text-white px-5 py-2 rounded-xl shadow hover:bg-indigo-700 transition">
            <Plus size={18} />
            Add Brand
          </button>
        </div>

        {/* SEARCH */}
        <div className="w-full md:w-1/2">
          <input
            type="text"
            placeholder="Search brand..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white shadow-sm 
            focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>
      </div>

      {/* ================= LOADING ================= */}
      {isLoading ? (
        <p className="mt-10 text-center text-gray-500">Loading brands...</p>
      ) : (
        <>
          {/* ================= EMPTY STATE ================= */}
          {filteredBrands.length === 0 ? (
            <div className="flex justify-center items-center mt-20">
              <p className="text-gray-500 text-lg">No brands found</p>
            </div>
          ) : (
            <>
              {/* ================= GRID ================= */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-10">
                {filteredBrands.map((brand) => (
                  <div key={brand._id.toString()} className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-5 flex flex-col">
                    <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition duration-300 mb-4">
                      <Eye
                        size={18}
                        className="cursor-pointer text-gray-500 hover:text-black"
                        onClick={() => {
                          setViewBrand(brand);
                          setViewModal(true);
                        }}
                      />

                      <Pencil size={18} onClick={() => handleEdit(brand)} className="cursor-pointer text-blue-500" />

                      <Trash2 size={18} onClick={() => handleDelete(brand._id.toString())} className="cursor-pointer text-red-500" />
                    </div>

                    <div className="flex justify-center mb-4">
                      {brand.brand_logo ? (
                        <img src={brand.brand_logo} alt="logo" className="w-20 h-20 object-cover rounded-xl" />
                      ) : (
                        <div className="w-20 h-20 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400 text-xs">No Logo</div>
                      )}
                    </div>

                    <div className="text-center space-y-2 mt-auto">
                      <h3 className="font-semibold text-lg">{brand.brand_name}</h3>

                      <p className="text-xs text-gray-500">Slug: {brand.slug}</p>

                      <span className={`inline-block px-3 py-1 text-xs rounded-full ${brand.authorized ? 'bg-green-100 text-green-600' : 'bg-gray-200 text-gray-500'}`}>
                        {brand.authorized ? 'Authorized' : 'Inactive'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* ================= PAGINATION ================= */}
              {totalPage > 1 && (
                <div className="flex justify-center items-center gap-4 mt-10">
                  <button disabled={page === 1} onClick={() => setPage((prev) => prev - 1)} className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50">
                    Prev
                  </button>

                  <span className="font-medium">
                    Page {page} of {totalPage}
                  </span>

                  <button disabled={page >= totalPage} onClick={() => setPage((prev) => prev + 1)} className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50">
                    Next
                  </button>
                </div>
              )}
            </>
          )}

          {isFetching && <p className="text-center text-xs text-gray-400 mt-2">Updating...</p>}
        </>
      )}

      {/* ================= MODAL ================= */}
      <BrandModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        brand={selectedBrand || undefined}
        mode={mode}
        onSubmit={handleSubmit}
        isLoading={createMutation.isPending || updateMutation.isPending}
      />

      <BrandViewModal open={viewModal} onClose={() => setViewModal(false)} brand={viewBrand} />
    </div>
  );
}
