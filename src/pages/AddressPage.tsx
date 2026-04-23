import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { IAddressDocument } from '@kitchensathi12-arch/ecommerce-types';
import { addAddress, getAddress, updateAddress, deleteAddress } from '../services/AddressServices';

// ─── CONSTANTS ────────────────────────────────────────────────────────────────

const EMPTY_FORM: Partial<IAddressDocument> = {
  name: '',
  phone: '',
  alternate_phone: '',
  address_line_1: '',
  address_line_2: '',
  country: 'India',
  state: '',
  city: '',
  landmark: '',
  pin_code: '',
  address_type: 'home',
};

// ─── INPUT COMPONENTS ─────────────────────────────────────────────────────────

interface InputFieldProps {
  label: string;
  name: keyof IAddressDocument;
  value: string | undefined;
  onChange: (name: keyof IAddressDocument, value: string) => void;
  required?: boolean;
  type?: string;
  placeholder?: string;
}

const InputField = ({ label, name, value, onChange, required = false, type = 'text', placeholder }: InputFieldProps) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-sm font-medium text-gray-700">
      {label}{required && <span className="text-red-500 ml-0.5">*</span>}
    </label>
    <input
      type={type}
      value={value || ''}
      onChange={(e) => onChange(name, e.target.value)}
      placeholder={placeholder}
      className="w-full h-[50px] px-4 bg-gray-50/50 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all"
    />
  </div>
);

interface SelectFieldProps {
  label: string;
  name: keyof IAddressDocument;
  value: string | undefined;
  options: { label: string; value: string }[];
  onChange: (name: keyof IAddressDocument, value: string) => void;
  required?: boolean;
}

const SelectField = ({ label, name, value, options, onChange, required }: SelectFieldProps) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-sm font-medium text-gray-700">
      {label}{required && <span className="text-red-500 ml-0.5">*</span>}
    </label>
    <div className="relative">
      <select
        value={value || ''}
        onChange={(e) => onChange(name, e.target.value)}
        className="w-full h-[50px] px-4 bg-gray-50/50 rounded-xl border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all appearance-none cursor-pointer"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  </div>
);

// ─── CONFIRM DELETE MODAL ─────────────────────────────────────────────────────

interface ConfirmDeleteProps {
  onConfirm: () => void;
  onCancel: () => void;
  isDeleting: boolean;
}

const ConfirmDeleteModal = ({ onConfirm, onCancel, isDeleting }: ConfirmDeleteProps) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onCancel} />
    <div className="relative bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm z-10 animate-in fade-in zoom-in-95 duration-200">
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 mx-auto mb-4">
        <svg className="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </div>
      <h3 className="text-base font-bold text-gray-900 text-center mb-1">Delete Address?</h3>
      <p className="text-sm text-gray-500 text-center mb-6">This action cannot be undone.</p>
      <div className="flex gap-3">
        <button
          onClick={onCancel}
          disabled={isDeleting}
          className="flex-1 h-11 rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          disabled={isDeleting}
          className="flex-1 h-11 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-semibold transition-colors disabled:opacity-70 flex items-center justify-center"
        >
          {isDeleting ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : 'Delete'}
        </button>
      </div>
    </div>
  </div>
);

// ─── ADDRESS CARD ─────────────────────────────────────────────────────────────

interface AddressCardProps {
  address: IAddressDocument;
  onEdit: (address: IAddressDocument) => void;
  onDelete: (id: string) => void;
  isSelected: boolean;
  onSelect: () => void;
}

const AddressCard = ({ address, onEdit, onDelete, isSelected, onSelect }: AddressCardProps) => {
  const addressId = (address as any)._id as string;
  
  return (
  <div
    onClick={onSelect}
    className={`relative rounded-2xl border p-5 transition-all cursor-pointer ${
      isSelected
        ? 'border-red-500 ring-4 ring-red-500/10 bg-white shadow-sm'
        : 'border-gray-100 bg-white hover:border-gray-300 hover:shadow-sm'
    }`}
  >
    {isSelected && (
      <div className="absolute top-5 left-5 w-5 h-5 rounded-full bg-red-600 flex items-center justify-center shadow-sm">
        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
    )}

    <span className="absolute top-5 right-5 text-[10px] font-bold uppercase tracking-wider text-red-600 bg-red-50 px-2.5 py-1 rounded-full border border-red-100">
      {address.address_type || 'home'}
    </span>

    <div className={`flex items-center gap-3 mb-4 pr-20 ${isSelected ? 'pl-8' : ''}`}>
      <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${isSelected ? 'bg-red-50' : 'bg-gray-50'}`}>
        <svg className={`w-5 h-5 ${isSelected ? 'text-red-600' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </div>
      <div>
        <p className="text-sm font-semibold text-gray-900 leading-none mb-1">
          {address.name}
        </p>
        <p className="text-xs text-gray-500 flex items-center gap-1">
           <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
           </svg>
           {address.phone}
        </p>
      </div>
    </div>

    <div className={`space-y-1.5 mb-5 ${isSelected ? 'pl-[52px]' : 'pl-[52px]'}`}>
      <p className="text-sm text-gray-600 leading-relaxed">
        {address.address_line_1}{address.address_line_2 ? `, ${address.address_line_2}` : ''}
      </p>
      <p className="text-sm text-gray-600">
        {address.landmark ? `${address.landmark}, ` : ''}{address.city}, {address.state} {address.pin_code}
      </p>
      <p className="text-sm text-gray-600">{address.country}</p>

      {address.alternate_phone && (
        <p className="text-xs text-gray-400 mt-2 flex items-center gap-1.5">
          <span className="font-medium text-gray-500">Alt:</span> {address.alternate_phone}
        </p>
      )}
    </div>

    <div className={`flex items-center gap-2.5 ${isSelected ? 'pl-[52px]' : 'pl-[52px]'}`}>
      <button
        onClick={(e) => { e.stopPropagation(); onEdit(address); }}
        className="h-8 px-4 rounded-lg bg-gray-50 text-xs font-medium text-gray-700 hover:bg-gray-100 transition-all flex items-center gap-1.5"
      >
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
        Edit
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); onDelete(addressId); }}
        className="h-8 px-4 rounded-lg bg-red-50 text-xs font-medium text-red-600 hover:bg-red-100 transition-all flex items-center gap-1.5"
      >
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
        Delete
      </button>
    </div>
  </div>
)};

// ─── ADDRESS FORM PANEL ───────────────────────────────────────────────────────

interface AddressFormPanelProps {
  form: Partial<IAddressDocument>;
  onChange: (name: keyof IAddressDocument, value: string) => void;
  onSubmit: () => void;
  onCancel: () => void;
  isEditing: boolean;
  isLoading: boolean;
}

const AddressFormPanel = ({ form, onChange, onSubmit, onCancel, isEditing, isLoading }: AddressFormPanelProps) => (
  <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 sm:p-7">
    <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-3">
      <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0">
        {isEditing ? (
          <svg className="w-4 h-4 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        ) : (
          <svg className="w-4 h-4 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        )}
      </div>
      {isEditing ? 'Edit Address' : 'Add New Address'}
    </h2>

    <div className="flex flex-col gap-5">
      <InputField label="Full Name" name="name" value={form.name} onChange={onChange} required placeholder="John Doe" />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <InputField label="Phone Number" name="phone" value={form.phone} onChange={onChange} required type="tel" placeholder="1234567890" />
        <InputField label="Alternate Phone" name="alternate_phone" value={form.alternate_phone} onChange={onChange} type="tel" placeholder="0987654321" />
      </div>

      <InputField label="Address Line 1" name="address_line_1" value={form.address_line_1} onChange={onChange} required placeholder="Street address, P.O. box, etc." />
      <InputField label="Address Line 2 (Optional)" name="address_line_2" value={form.address_line_2} onChange={onChange} placeholder="Apartment, suite, unit, building, etc." />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <InputField label="Landmark (Optional)" name="landmark" value={form.landmark} onChange={onChange} placeholder="Near City Mall" />
        <InputField label="Pincode" name="pin_code" value={form.pin_code} onChange={onChange} required placeholder="123456" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <InputField label="City" name="city" value={form.city} onChange={onChange} required placeholder="New Delhi" />
        <InputField label="State" name="state" value={form.state} onChange={onChange} required placeholder="Delhi" />
        <InputField label="Country" name="country" value={form.country} onChange={onChange} required placeholder="India" />
      </div>

      <SelectField
        label="Address Type"
        name="address_type"
        value={form.address_type}
        options={[
          { label: 'Home', value: 'home' },
          { label: 'Work', value: 'work' },
          { label: 'Farm / Other', value: 'farm' }
        ]}
        onChange={onChange}
        required
      />

      <div className="flex gap-3 pt-4 border-t border-gray-100 mt-2">
        <button
          onClick={onCancel}
          type="button"
          disabled={isLoading}
          className="flex-1 h-[50px] rounded-xl bg-gray-50 text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          onClick={onSubmit}
          disabled={isLoading}
          className="flex-1 h-[50px] bg-red-600 hover:bg-red-700 active:bg-red-800 text-white text-sm font-semibold rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm hover:shadow-md disabled:opacity-70"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              {isEditing ? 'Save Changes' : 'Save Address'}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </>
          )}
        </button>
      </div>
    </div>
  </div>
);

// ─── MAIN ADDRESS PAGE ────────────────────────────────────────────────────────

const AddressPage = () => {
  const queryClient = useQueryClient();

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Partial<IAddressDocument>>(EMPTY_FORM);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Tanstack Query - Fetching
  const { data, isLoading: isPageLoading, isError } = useQuery({
    queryKey: ['addresses'],
    queryFn: getAddress,
  });

  // Automatically map standard dynamic response objects to the array
  const addresses: IAddressDocument[] = (() => {
    if (Array.isArray(data)) return data;
    if (data?.result && Array.isArray(data.result)) return data.result;
    if (data?.data && Array.isArray(data.data)) return data.data;
    if (data?.addresses && Array.isArray(data.addresses)) return data.addresses;
    if (data?.data?.result && Array.isArray(data.data.result)) return data.data.result;
    return [];
  })();

  // Tanstack Query - Mutations
  const addMutation = useMutation({
    mutationFn: addAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['addresses'] });
      handleCancel();
    },
    onError: (error) => {
      console.error('Error adding address:', error);
      alert('Failed to save the address!');
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }: { id: string, payload: Partial<IAddressDocument> }) => updateAddress(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['addresses'] });
      handleCancel();
    },
    onError: (error) => {
      console.error('Error updating address:', error);
      alert('Failed to update the address!');
    }
  });

  const deleteMutation = useMutation({
    mutationFn: deleteAddress,
    onSuccess: (_, deletedId) => {
      queryClient.invalidateQueries({ queryKey: ['addresses'] });
      if (selectedId === deletedId) setSelectedId(null);
      setDeleteTargetId(null);
    },
    onError: (error) => {
      console.error('Error deleting address:', error);
      alert('Failed to delete the address!');
      setDeleteTargetId(null);
    }
  });

  // Calculate loading status (handles Tanstack v4 vs v5 compatability by checking both keys)
  const isSaving = (addMutation as any).isPending || (addMutation as any).isLoading || 
                   (updateMutation as any).isPending || (updateMutation as any).isLoading;
  const isDeleting = (deleteMutation as any).isPending || (deleteMutation as any).isLoading;

  const handleFieldChange = (name: keyof IAddressDocument, value: string) =>
    setForm((prev) => ({ ...prev, [name]: value }));

  const openAdd = () => {
    setForm(EMPTY_FORM);
    setEditingId(null);
    setShowForm(true);
    setTimeout(() => document.getElementById('address-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
  };

  const openEdit = (address: IAddressDocument) => {
    setForm({
      name: address.name || '',
      phone: address.phone || '',
      alternate_phone: address.alternate_phone || '',
      address_line_1: address.address_line_1 || '',
      address_line_2: address.address_line_2 || '',
      country: address.country || 'India',
      state: address.state || '',
      city: address.city || '',
      landmark: address.landmark || '',
      pin_code: address.pin_code || '',
      address_type: address.address_type || 'home',
    });
    setEditingId((address as any)._id as string);
    setShowForm(true);
    setTimeout(() => document.getElementById('address-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setForm(EMPTY_FORM);
  };

  const handleSubmit = () => {
    if (!form.name?.trim() || !form.address_line_1?.trim() || !form.city?.trim() || !form.state?.trim() || !form.phone?.trim() || !form.pin_code?.trim()) {
      alert('Please fill in all required fields (Name, Phone, Address, Pincode, City, State).');
      return;
    }

    if (editingId) {
      updateMutation.mutate({ id: editingId, payload: form });
    } else {
      addMutation.mutate(form);
    }
  };

  const handleDeleteConfirm = () => {
    if (!deleteTargetId) return;
    deleteMutation.mutate(deleteTargetId);
  };

  return (
    <div className="min-h-screen bg-gray-50/30">
      {deleteTargetId && (
        <ConfirmDeleteModal
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeleteTargetId(null)}
          isDeleting={!!isDeleting}
        />
      )}

      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="flex items-center justify-between mb-8 sm:mb-10">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
              My Addresses
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Manage your saved delivery addresses
            </p>
          </div>
        </div>

        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* ── LEFT: ADDRESS LIST ───────────────────────────────────────── */}
          <div className="flex flex-col gap-5 w-full order-2 lg:order-1 lg:col-span-7 xl:col-span-6">
            
            {isPageLoading ? (
              <div className="flex flex-col gap-4">
                {[1, 2].map((i) => (
                  <div key={i} className="h-48 rounded-2xl bg-gray-100 animate-pulse border border-gray-100" />
                ))}
              </div>
            ) : isError ? (
              <div className="text-center py-16 rounded-3xl border border-red-200 bg-red-50 shadow-sm text-red-600">
                <p>Failed to load addresses.</p>
              </div>
            ) : addresses.length === 0 ? (
              <div className="text-center py-16 rounded-3xl border border-dashed border-gray-200 bg-white shadow-sm">
                <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center mx-auto mb-5">
                  <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <p className="text-base font-semibold text-gray-900 mb-1">No addresses saved yet</p>
                <p className="text-sm text-gray-500 mb-6">Add a delivery address to get started</p>
                <button
                  onClick={openAdd}
                  className="h-11 px-6 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-xl transition-all flex items-center gap-2 mx-auto shadow-sm"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                  Add First Address
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                    {addresses.length} Saved Address{addresses.length > 1 ? 'es' : ''}
                  </p>
                  {!showForm && (
                    <button
                      onClick={openAdd}
                      className="text-sm font-semibold text-red-600 hover:text-red-700 flex items-center gap-1.5"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                      </svg>
                      Add New
                    </button>
                  )}
                </div>
                
                <div className="space-y-4">
                  {addresses.map((address) => (
                    <AddressCard
                      key={(address as any)._id as string}
                      address={address}
                      onEdit={openEdit}
                      onDelete={(id) => setDeleteTargetId(id)}
                      isSelected={selectedId === ((address as any)._id as string)}
                      onSelect={() => setSelectedId((address as any)._id as string)}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* ── RIGHT: FORM ──────────────────────────────────────────────── */}
          <div id="address-form" className="w-full order-1 lg:order-2 lg:col-span-5 xl:col-span-6 lg:sticky lg:top-8">
            {showForm ? (
              <AddressFormPanel
                form={form}
                onChange={handleFieldChange}
                onSubmit={handleSubmit}
                onCancel={handleCancel}
                isEditing={!!editingId}
                isLoading={!!isSaving}
              />
            ) : (
              <div
                onClick={openAdd}
                className="hidden lg:flex rounded-3xl border-2 border-dashed border-gray-200 hover:border-red-300 hover:bg-red-50/50 transition-all cursor-pointer p-12 flex-col items-center justify-center gap-4 group min-h-[400px]"
              >
                <div className="w-14 h-14 rounded-full bg-gray-50 group-hover:bg-red-100 flex items-center justify-center transition-colors">
                  <svg className="w-7 h-7 text-gray-400 group-hover:text-red-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <div className="text-center">
                  <p className="text-base font-semibold text-gray-600 group-hover:text-red-600 transition-colors mb-1">Add New Address</p>
                  <p className="text-sm text-gray-400">Click to fill in new delivery details</p>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default AddressPage;