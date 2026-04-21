import { useState } from 'react';

// ─── TYPES ────────────────────────────────────────────────────────────────────

interface Address {
  _id: string;
  firstName: string;
  lastName?: string;
  streetAddress: string;
  apartment?: string;
  townCity: string;
  phoneNumber: string;
  emailAddress: string;
  isDefault?: boolean;
}

interface AddressForm {
  firstName: string;
  lastName: string;
  streetAddress: string;
  apartment: string;
  townCity: string;
  phoneNumber: string;
  emailAddress: string;
  isDefault: boolean;
}

const EMPTY_FORM: AddressForm = {
  firstName: '',
  lastName: '',
  streetAddress: '',
  apartment: '',
  townCity: '',
  phoneNumber: '',
  emailAddress: '',
  isDefault: false,
};

// ─── MOCK DATA (remove when connecting API) ───────────────────────────────────

let mockId = 3;
const MOCK_ADDRESSES: Address[] = [
  {
    _id: '1',
    firstName: 'Rahul',
    lastName: 'Sharma',
    streetAddress: 'Plot 42, Sector 15',
    apartment: 'Tower B, Flat 304',
    townCity: 'Faridabad',
    phoneNumber: '+91 98765 43210',
    emailAddress: 'rahul@example.com',
    isDefault: true,
  },
  {
    _id: '2',
    firstName: 'Priya',
    lastName: 'Singh',
    streetAddress: '12-A, Green Park Extension',
    apartment: '',
    townCity: 'New Delhi',
    phoneNumber: '+91 91234 56789',
    emailAddress: 'priya@example.com',
    isDefault: false,
  },
];

// ─── INPUT FIELD ─────────────────────────────────────────────────────────────

interface InputFieldProps {
  label: string;
  name: keyof AddressForm;
  value: string;
  onChange: (name: keyof AddressForm, value: string) => void;
  required?: boolean;
  type?: string;
  placeholder?: string;
}

const InputField = ({ label, name, value, onChange, required = false, type = 'text', placeholder }: InputFieldProps) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-sm text-gray-700">
      {label}{required && <span className="text-red-500 ml-0.5">*</span>}
    </label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(name, e.target.value)}
      placeholder={placeholder}
      className="w-full h-[50px] px-4 bg-gray-100 rounded-lg border-0 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition-all"
    />
  </div>
);

// ─── CONFIRM DELETE MODAL ─────────────────────────────────────────────────────

interface ConfirmDeleteProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmDeleteModal = ({ onConfirm, onCancel }: ConfirmDeleteProps) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onCancel} />
    <div className="relative bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm z-10">
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
          className="flex-1 h-11 rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="flex-1 h-11 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-semibold transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
);

// ─── ADDRESS CARD ─────────────────────────────────────────────────────────────

interface AddressCardProps {
  address: Address;
  onEdit: (address: Address) => void;
  onDelete: (id: string) => void;
  isSelected: boolean;
  onSelect: () => void;
}

const AddressCard = ({ address, onEdit, onDelete, isSelected, onSelect }: AddressCardProps) => (
  <div
    onClick={onSelect}
    className={`relative rounded-2xl border p-4 sm:p-5 transition-all cursor-pointer ${
      isSelected
        ? 'border-red-500 ring-2 ring-red-500/20 bg-white'
        : address.isDefault
        ? 'border-red-200 bg-red-50/40 hover:border-red-300'
        : 'border-gray-100 bg-white hover:border-gray-300'
    }`}
  >
    {/* Selected checkmark */}
    {isSelected && (
      <div className="absolute top-4 left-4 w-5 h-5 rounded-full bg-red-600 flex items-center justify-center">
        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
    )}

    {address.isDefault && (
      <span className="absolute top-4 right-4 text-[10px] font-bold uppercase tracking-wider text-red-600 bg-red-100 px-2 py-0.5 rounded-full">
        Default
      </span>
    )}

    <div className={`flex items-center gap-3 mb-3 pr-16 ${isSelected ? 'pl-8' : ''}`}>
      <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${isSelected || address.isDefault ? 'bg-red-100' : 'bg-gray-100'}`}>
        <svg className={`w-4 h-4 ${isSelected || address.isDefault ? 'text-red-600' : 'text-gray-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </div>
      <p className="text-sm font-semibold text-gray-900">
        {address.firstName}{address.lastName ? ` ${address.lastName}` : ''}
      </p>
    </div>

    <div className={`space-y-1 mb-4 ${isSelected ? 'pl-20' : 'pl-12'}`}>
      <p className="text-sm text-gray-600 leading-snug">
        {address.streetAddress}{address.apartment && `, ${address.apartment}`}
      </p>
      <p className="text-sm text-gray-600">{address.townCity}</p>
      <div className="flex flex-wrap gap-x-4 gap-y-0.5 pt-0.5">
        <span className="text-xs text-gray-400 flex items-center gap-1">
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          {address.phoneNumber}
        </span>
        <span className="text-xs text-gray-400 flex items-center gap-1">
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          {address.emailAddress}
        </span>
      </div>
    </div>

    <div className={`flex items-center gap-2 ${isSelected ? 'pl-20' : 'pl-12'}`}>
      <button
        onClick={(e) => { e.stopPropagation(); onEdit(address); }}
        className="h-8 px-3.5 rounded-lg border border-gray-200 text-xs font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all flex items-center gap-1.5"
      >
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </svg>
        Edit
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); onDelete(address._id); }}
        className="h-8 px-3.5 rounded-lg border border-red-100 text-xs font-medium text-red-600 hover:bg-red-50 hover:border-red-200 transition-all flex items-center gap-1.5"
      >
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
        Delete
      </button>
    </div>
  </div>
);

// ─── ADDRESS FORM PANEL ───────────────────────────────────────────────────────

interface AddressFormPanelProps {
  form: AddressForm;
  onChange: (name: keyof AddressForm, value: string) => void;
  onToggleDefault: () => void;
  onSubmit: () => void;
  onCancel: () => void;
  isEditing: boolean;
}

const AddressFormPanel = ({ form, onChange, onToggleDefault, onSubmit, onCancel, isEditing }: AddressFormPanelProps) => (
  <div className="bg-gray-50 rounded-2xl border border-gray-100 p-4 sm:p-6">
    <h2 className="text-base font-bold text-gray-900 mb-5 flex items-center gap-2">
      <div className="w-7 h-7 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
        {isEditing ? (
          <svg className="w-3.5 h-3.5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
        ) : (
          <svg className="w-3.5 h-3.5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        )}
      </div>
      {isEditing ? 'Edit Address' : 'Add New Address'}
    </h2>

    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InputField label="First Name" name="firstName" value={form.firstName} onChange={onChange} required placeholder="first name" />
        <InputField label="Last Name" name="lastName" value={form.lastName} onChange={onChange} placeholder="last name" />
      </div>
      <InputField label="Street Address" name="streetAddress" value={form.streetAddress} onChange={onChange} required placeholder="street address" />
      <InputField label="Apartment, floor, etc. (optional)" name="apartment" value={form.apartment} onChange={onChange} placeholder="apartment, floor, etc. (optional)" />
      <InputField label="Town / City" name="townCity" value={form.townCity} onChange={onChange} required placeholder="town / city" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InputField label="Phone Number" name="phoneNumber" value={form.phoneNumber} onChange={onChange} required type="tel" placeholder="1234567890" />
        <InputField label="Email Address" name="emailAddress" value={form.emailAddress} onChange={onChange} required type="email" placeholder="yourmail@gmail.com" />
      </div>

      <label className="flex items-center gap-3 cursor-pointer mt-1">
        <div className="flex-shrink-0" onClick={onToggleDefault}>
          <div className={`w-5 h-5 rounded flex items-center justify-center border transition-colors ${form.isDefault ? 'bg-red-600 border-red-600' : 'border-gray-300 bg-white'}`}>
            {form.isDefault && (
              <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            )}
          </div>
        </div>
        <span className="text-sm text-gray-700">Set as default address</span>
      </label>

      <div className="flex gap-3 pt-1">
        <button
          onClick={onCancel}
          className="flex-1 h-[50px] rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={onSubmit}
          className="flex-1 h-[50px] bg-red-600 hover:bg-red-700 active:bg-red-800 text-white text-sm font-semibold rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm hover:shadow-md"
        >
          {isEditing ? 'Save Changes' : 'Add Address'}
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </button>
      </div>
    </div>
  </div>
);

// ─── MAIN ADDRESS PAGE ────────────────────────────────────────────────────────

const AddressPage = () => {
  const [addresses, setAddresses] = useState<Address[]>(MOCK_ADDRESSES);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<AddressForm>(EMPTY_FORM);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>('1'); // default address pre-selected

  const handleFieldChange = (name: keyof AddressForm, value: string) =>
    setForm((prev) => ({ ...prev, [name]: value }));

  const openAdd = () => {
    setForm(EMPTY_FORM);
    setEditingId(null);
    setShowForm(true);
  };

  const openEdit = (address: Address) => {
    setForm({
      firstName: address.firstName,
      lastName: address.lastName ?? '',
      streetAddress: address.streetAddress,
      apartment: address.apartment ?? '',
      townCity: address.townCity,
      phoneNumber: address.phoneNumber,
      emailAddress: address.emailAddress,
      isDefault: address.isDefault ?? false,
    });
    setEditingId(address._id);
    setShowForm(true);
    setTimeout(() => document.getElementById('address-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setForm(EMPTY_FORM);
  };

  const handleSubmit = () => {
    if (!form.firstName.trim() || !form.streetAddress.trim() || !form.townCity.trim() || !form.phoneNumber.trim() || !form.emailAddress.trim()) {
      alert('Please fill in all required fields.');
      return;
    }
    if (editingId) {
      setAddresses((prev) => prev.map((a) => a._id === editingId ? { ...a, ...form } : a));
    } else {
      const newId = String(mockId++);
      setAddresses((prev) => [...prev, { _id: newId, ...form }]);
    }
    handleCancel();
  };

  const handleDeleteConfirm = () => {
    if (!deleteTargetId) return;
    if (selectedId === deleteTargetId) setSelectedId(null);
    setAddresses((prev) => prev.filter((a) => a._id !== deleteTargetId));
    setDeleteTargetId(null);
  };

  return (
    <div className="min-h-screen bg-white">
      {deleteTargetId && (
        <ConfirmDeleteModal
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeleteTargetId(null)}
        />
      )}

      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-14">

        <div className="flex items-center justify-between mb-6 sm:mb-8 lg:mb-12">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
            My Addresses
          </h1>
        </div>

        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-14 xl:gap-20 items-start">

          {/* ── LEFT: ADDRESS LIST ───────────────────────────────────────── */}
          <div className="flex flex-col gap-4 w-full order-2 lg:order-1">
            {addresses.length === 0 && (
              <div className="text-center py-16 rounded-2xl border border-dashed border-gray-200 bg-gray-50">
                <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-7 h-7 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <p className="text-sm font-medium text-gray-700 mb-1">No addresses saved yet</p>
                <p className="text-xs text-gray-400 mb-5">Add a delivery address to get started</p>
                <button
                  onClick={openAdd}
                  className="h-10 px-5 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-xl transition-all flex items-center gap-2 mx-auto shadow-sm"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                  Add First Address
                </button>
              </div>
            )}

            {addresses.length > 0 && (
              <>
                <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">
                  {addresses.length} address{addresses.length > 1 ? 'es' : ''} saved
                </p>
                {addresses.map((address) => (
                  <AddressCard
                    key={address._id}
                    address={address}
                    onEdit={openEdit}
                    onDelete={(id) => setDeleteTargetId(id)}
                    isSelected={selectedId === address._id}
                    onSelect={() => setSelectedId(address._id)}
                  />
                ))}
              </>
            )}
          </div>

          {/* ── RIGHT: FORM ──────────────────────────────────────────────── */}
          <div id="address-form" className="w-full order-1 lg:order-2">
            {showForm ? (
              <AddressFormPanel
                form={form}
                onChange={handleFieldChange}
                onToggleDefault={() => setForm((p) => ({ ...p, isDefault: !p.isDefault }))}
                onSubmit={handleSubmit}
                onCancel={handleCancel}
                isEditing={!!editingId}
              />
            ) : (
              <div
                onClick={openAdd}
                className="rounded-2xl border-2 border-dashed border-gray-200 hover:border-red-300 hover:bg-red-50/30 transition-all cursor-pointer p-8 sm:p-12 flex flex-col items-center gap-3 group"
              >
                <div className="w-12 h-12 rounded-full bg-gray-100 group-hover:bg-red-100 flex items-center justify-center transition-colors">
                  <svg className="w-6 h-6 text-gray-400 group-hover:text-red-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <p className="text-sm font-semibold text-gray-500 group-hover:text-red-600 transition-colors">Add New Address</p>
                <p className="text-xs text-gray-400 text-center">Click to fill in delivery details</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default AddressPage;