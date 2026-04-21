/* eslint-disable @typescript-eslint/no-explicit-any */
import { API } from '@/lib/api';
import { useState, useEffect, useCallback } from 'react';

// ─── TYPES ────────────────────────────────────────────────────────────────────

interface ProductImage {
  image_url: string;
  image_public_id?: string;
  _id?: string;
}

interface CartProduct {
  _id: string;
  product_name: string;
  product_title?: string;
  product_selling_price: number;
  product_mrp_price: number;
  product_discount?: number;
  product_images?: ProductImage | ProductImage[];
  brand?: { brand_name: string };
  category?: { name: string };
}

interface CartItem {
  _id: string;
  product_id: CartProduct;
  qty: number;
  currency?: string;
}

interface BillingForm {
  firstName: string;
  companyName: string;
  streetAddress: string;
  apartment: string;
  townCity: string;
  phoneNumber: string;
  emailAddress: string;
  saveInfo: boolean;
}

interface CardForm {
  cardNumber: string;
  cardHolder: string;
  expiry: string;
  cvv: string;
}

type PaymentMethod = 'card' | 'upi';
type UpiApp = 'phonepe' | 'gpay' | 'paytm' | 'other';

// ─── API ──────────────────────────────────────────────────────────────────────

const getCartItems = async (): Promise<{ data: CartItem[] }> => {
  const res = await API.get('/cart/cart-items');
  return res.data;
};

// ─── HELPERS ──────────────────────────────────────────────────────────────────

const getImageUrl = (images?: ProductImage | ProductImage[]): string => {
  if (!images) return '';
  if (Array.isArray(images)) return images[0]?.image_url ?? '';
  return (images as ProductImage).image_url ?? '';
};

const formatCardNumber = (val: string) =>
  val.replace(/\D/g, '').slice(0, 16).replace(/(\d{4})(?=\d)/g, '$1 ').trim();

const formatExpiry = (val: string) => {
  const d = val.replace(/\D/g, '').slice(0, 4);
  return d.length >= 3 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
};

// ─── SVG BRAND ICONS ─────────────────────────────────────────────────────────

const VisaIcon = () => (
  <svg viewBox="0 0 48 20" width="40" height="20" xmlns="http://www.w3.org/2000/svg">
    <rect width="48" height="20" rx="3" fill="#1A1F71" />
    <text x="24" y="14.5" textAnchor="middle" fill="#F7B600" fontSize="11" fontWeight="bold" fontFamily="Arial,sans-serif" letterSpacing="1">VISA</text>
  </svg>
);

const MastercardIcon = () => (
  <svg viewBox="0 0 36 24" width="36" height="24" xmlns="http://www.w3.org/2000/svg">
    <rect width="36" height="24" rx="4" fill="#fff" stroke="#e5e7eb" strokeWidth="1" />
    <circle cx="14" cy="12" r="7" fill="#EB001B" />
    <circle cx="22" cy="12" r="7" fill="#F79E1B" />
    <path d="M18 6.8a7 7 0 0 1 0 10.4A7 7 0 0 1 18 6.8z" fill="#FF5F00" />
  </svg>
);

const RupayIcon = () => (
  <svg viewBox="0 0 50 24" width="50" height="24" xmlns="http://www.w3.org/2000/svg">
    <rect width="50" height="24" rx="4" fill="#fff" stroke="#e5e7eb" strokeWidth="1" />
    <rect x="5" y="9" width="13" height="2.5" rx="1.2" fill="#F26522" />
    <rect x="5" y="13" width="9" height="2.5" rx="1.2" fill="#1A6BBF" />
    <text x="34" y="16" textAnchor="middle" fill="#1A6BBF" fontSize="8.5" fontWeight="bold" fontFamily="Arial,sans-serif">RuPay</text>
  </svg>
);

const AmexIcon = () => (
  <svg viewBox="0 0 46 24" width="46" height="24" xmlns="http://www.w3.org/2000/svg">
    <rect width="46" height="24" rx="4" fill="#2E77BC" />
    <text x="23" y="10.5" textAnchor="middle" fill="#fff" fontSize="5.5" fontFamily="Arial,sans-serif" letterSpacing="1.5">AMERICAN</text>
    <text x="23" y="17.5" textAnchor="middle" fill="#fff" fontSize="7.5" fontWeight="bold" fontFamily="Arial,sans-serif" letterSpacing="0.5">EXPRESS</text>
  </svg>
);

const PhonePeIcon = ({ size = 24 }: { size?: number }) => (
  <svg viewBox="0 0 62 24" width={size * 2.6} height={size} xmlns="http://www.w3.org/2000/svg">
    <rect width="62" height="24" rx="4" fill="#5F259F" />
    <text x="9" y="16" fill="#fff" fontSize="12" fontWeight="bold" fontFamily="Arial,sans-serif">P</text>
    <text x="20" y="15.5" fill="#fff" fontSize="8" fontWeight="600" fontFamily="Arial,sans-serif">PhonePe</text>
  </svg>
);

const GPayIcon = ({ size = 24 }: { size?: number }) => (
  <svg viewBox="0 0 50 24" width={size * 2.1} height={size} xmlns="http://www.w3.org/2000/svg">
    <rect width="50" height="24" rx="4" fill="#fff" stroke="#e5e7eb" strokeWidth="1" />
    <text x="5" y="17" fill="#4285F4" fontSize="13" fontWeight="bold" fontFamily="Arial,sans-serif">G</text>
    <text x="18" y="17" fill="#34A853" fontSize="13" fontWeight="bold" fontFamily="Arial,sans-serif">P</text>
    <text x="29" y="17" fill="#FBBC04" fontSize="13" fontWeight="bold" fontFamily="Arial,sans-serif">a</text>
    <text x="38" y="17" fill="#EA4335" fontSize="13" fontWeight="bold" fontFamily="Arial,sans-serif">y</text>
  </svg>
);

const PaytmIcon = ({ size = 24 }: { size?: number }) => (
  <svg viewBox="0 0 50 24" width={size * 2.1} height={size} xmlns="http://www.w3.org/2000/svg">
    <rect width="50" height="24" rx="4" fill="#00B9F1" />
    <text x="25" y="16" textAnchor="middle" fill="#fff" fontSize="9.5" fontWeight="bold" fontFamily="Arial,sans-serif" letterSpacing="0.3">Paytm</text>
  </svg>
);

const CardNetworkIcons = () => (
  <div className="flex items-center gap-1.5 ml-auto flex-wrap justify-end">
    <VisaIcon /><MastercardIcon /><RupayIcon /><AmexIcon />
  </div>
);

const UpiSmallIcons = () => (
  <div className="flex items-center gap-1.5 ml-auto flex-wrap justify-end">
    <PhonePeIcon size={20} /><GPayIcon size={20} /><PaytmIcon size={20} />
  </div>
);

// ─── RADIO OPTION ─────────────────────────────────────────────────────────────

interface RadioOptionProps {
  value: PaymentMethod;
  selected: PaymentMethod;
  onChange: (v: PaymentMethod) => void;
  label: string;
  icons?: React.ReactNode;
}

const RadioOption = ({ value, selected, onChange, label, icons }: RadioOptionProps) => (
  <label className="flex items-center gap-3 cursor-pointer w-full">
    <div className="flex-shrink-0">
      <input type="radio" name="payment" value={value} checked={selected === value} onChange={() => onChange(value)} className="sr-only" />
      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${selected === value ? 'border-gray-900' : 'border-gray-300'}`}>
        {selected === value && <div className="w-2.5 h-2.5 rounded-full bg-gray-900" />}
      </div>
    </div>
    <span className="text-sm text-gray-800 font-medium">{label}</span>
    {icons}
  </label>
);

// ─── BILLING INPUT ────────────────────────────────────────────────────────────

interface InputFieldProps {
  label: string;
  name: keyof BillingForm;
  value: string;
  onChange: (name: keyof BillingForm, value: string) => void;
  required?: boolean;
  type?: string;
}

const InputField = ({ label, name, value, onChange, required = false, type = 'text' }: InputFieldProps) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-sm text-gray-700">
      {label}{required && <span className="text-red-500 ml-0.5">*</span>}
    </label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(name, e.target.value)}
      className="w-full h-[50px] px-4 bg-gray-100 rounded-lg border-0 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition-all"
    />
  </div>
);

// ─── PLAIN INPUT ──────────────────────────────────────────────────────────────

interface PlainInputProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  maxLength?: number;
}

const PlainInput = ({ label, value, onChange, placeholder, type = 'text', maxLength }: PlainInputProps) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-[11px] text-gray-500 font-semibold uppercase tracking-wider">{label}</label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      maxLength={maxLength}
      className="w-full h-[44px] px-3 bg-white rounded-lg border border-gray-200 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
    />
  </div>
);

// ─── SKELETON ─────────────────────────────────────────────────────────────────

const CartSkeleton = () => (
  <div className="flex flex-col gap-4 animate-pulse">
    {[1, 2].map((i) => (
      <div key={i} className="flex items-center gap-3">
        <div className="w-14 h-14 rounded-xl bg-gray-200 flex-shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="h-3.5 bg-gray-200 rounded w-3/4" />
          <div className="h-3 bg-gray-200 rounded w-1/3" />
        </div>
        <div className="h-4 w-16 bg-gray-200 rounded" />
      </div>
    ))}
  </div>
);

// ─── UPI APP SELECTOR ─────────────────────────────────────────────────────────

interface UpiAppOption {
  id: UpiApp;
  label: string;
  description: string;
  icon: React.ReactNode;
  suffix?: string;
}

const UPI_APPS: UpiAppOption[] = [
  {
    id: 'phonepe',
    label: 'PhonePe',
    description: 'Pay via PhonePe UPI',
    icon: <PhonePeIcon size={28} />,
    suffix: '@ybl',
  },
  {
    id: 'gpay',
    label: 'Google Pay',
    description: 'Pay via Google Pay',
    icon: <GPayIcon size={28} />,
    suffix: '@okicici',
  },
  {
    id: 'paytm',
    label: 'Paytm',
    description: 'Pay via Paytm wallet/UPI',
    icon: <PaytmIcon size={28} />,
    suffix: '@paytm',
  },
  {
    id: 'other',
    label: 'Other UPI ID',
    description: 'Enter UPI ID manually',
    icon: (
      <div className="w-[58px] h-7 rounded flex items-center justify-center bg-gray-100 border border-gray-200">
        <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      </div>
    ),
  },
];

interface UpiSectionProps {
  selectedApp: UpiApp | null;
  onSelectApp: (app: UpiApp) => void;
  upiId: string;
  onUpiIdChange: (v: string) => void;
}

const UpiSection = ({ selectedApp, onSelectApp, upiId, onUpiIdChange }: UpiSectionProps) => {
  const selectedAppData = UPI_APPS.find(a => a.id === selectedApp);

  return (
    <div className="flex flex-col gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200">
      {/* App Grid */}
      <p className="text-[11px] text-gray-500 font-semibold uppercase tracking-wider">Select UPI App</p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {UPI_APPS.map((app) => {
          const isSelected = selectedApp === app.id;
          return (
            <button
              key={app.id}
              type="button"
              onClick={() => onSelectApp(app.id)}
              className={`flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all cursor-pointer ${
                isSelected
                  ? 'border-red-500 bg-red-50 shadow-sm'
                  : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              {app.icon}
              <span className={`text-xs font-semibold leading-tight text-center ${isSelected ? 'text-red-600' : 'text-gray-700'}`}>
                {app.label}
              </span>
              {isSelected && (
                <div className="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0">
                  <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* UPI ID Input — shown for all apps */}
      {selectedApp && (
        <div className="mt-1">
          <PlainInput
            label={selectedApp === 'other' ? 'UPI ID' : `${selectedAppData?.label} UPI ID`}
            value={upiId}
            onChange={onUpiIdChange}
            placeholder={`yourname${selectedAppData?.suffix ?? '@upi'}`}
          />
          {selectedApp !== 'other' && (
            <p className="text-xs text-gray-400 mt-1.5">
              Enter your registered {selectedAppData?.label} UPI ID (e.g. 9876543210{selectedAppData?.suffix})
            </p>
          )}
          {selectedApp === 'other' && (
            <p className="text-xs text-gray-400 mt-1.5">
              e.g. name@okicici · number@ybl · id@upi · id@paytm
            </p>
          )}
        </div>
      )}

      {!selectedApp && (
        <p className="text-xs text-gray-400 text-center py-1">Select an app above to continue</p>
      )}
    </div>
  );
};

// ─── MAIN CHECKOUT PAGE ───────────────────────────────────────────────────────

const CheckoutPage = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartLoading, setCartLoading] = useState(true);
  const [cartError, setCartError] = useState<string | null>(null);

  const [form, setForm] = useState<BillingForm>({
    firstName: '', companyName: '', streetAddress: '',
    apartment: '', townCity: '', phoneNumber: '',
    emailAddress: '', saveInfo: true,
  });

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
  const [cardForm, setCardForm] = useState<CardForm>({ cardNumber: '', cardHolder: '', expiry: '', cvv: '' });

  // UPI state
  const [selectedUpiApp, setSelectedUpiApp] = useState<UpiApp | null>(null);
  const [upiId, setUpiId] = useState('');

  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [placingOrder, setPlacingOrder] = useState(false);

  const fetchCart = useCallback(async () => {
    setCartLoading(true);
    setCartError(null);
    try {
      const res = await getCartItems();
      setCartItems(res.data ?? []);
    } catch (err: any) {
      setCartError(err?.response?.data?.message || 'Failed to load cart.');
    } finally {
      setCartLoading(false);
    }
  }, []);

  useEffect(() => { fetchCart(); }, [fetchCart]);

  const subtotal = cartItems.reduce(
    (sum, i) => sum + (i.product_id?.product_selling_price ?? 0) * (i.qty ?? 1), 0
  );
  const couponDiscount = couponApplied ? Math.round(subtotal * 0.1) : 0;
  const total = subtotal - couponDiscount;

  const handleFieldChange = (name: keyof BillingForm, value: string) =>
    setForm((prev) => ({ ...prev, [name]: value }));

  const handleApplyCoupon = () => {
    if (couponCode.trim().toUpperCase() === 'SAVE10') setCouponApplied(true);
    else alert('Invalid coupon. Try SAVE10');
  };

  const handlePlaceOrder = async () => {
    setPlacingOrder(true);
    // TODO: call your order placement API here
    await new Promise((res) => setTimeout(res, 1500));
    setPlacingOrder(false);
    alert('Order placed successfully!');
  };

  // Reset UPI state when switching payment method
  const handlePaymentMethodChange = (method: PaymentMethod) => {
    setPaymentMethod(method);
    if (method === 'card') {
      setSelectedUpiApp(null);
      setUpiId('');
    }
  };

  const handleUpiAppSelect = (app: UpiApp) => {
    setSelectedUpiApp(app);
    setUpiId(''); // reset id when switching app
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-14">

        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-6 sm:mb-8 lg:mb-12">
          Billing Details
        </h1>

        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-14 xl:gap-20">

          {/* ── LEFT: BILLING FORM ──────────────────────────────────────── */}
          <div className="flex flex-col gap-4 sm:gap-5 order-2 lg:order-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              <InputField label="First Name" name="firstName" value={form.firstName} onChange={handleFieldChange} required />
              <InputField label="Company Name" name="companyName" value={form.companyName} onChange={handleFieldChange} />
            </div>
            <InputField label="Street Address" name="streetAddress" value={form.streetAddress} onChange={handleFieldChange} required />
            <InputField label="Apartment, floor, etc. (optional)" name="apartment" value={form.apartment} onChange={handleFieldChange} />
            <InputField label="Town / City" name="townCity" value={form.townCity} onChange={handleFieldChange} required />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              <InputField label="Phone Number" name="phoneNumber" value={form.phoneNumber} onChange={handleFieldChange} required type="tel" />
              <InputField label="Email Address" name="emailAddress" value={form.emailAddress} onChange={handleFieldChange} required type="email" />
            </div>

            {/* Save info */}
            <label className="flex items-start sm:items-center gap-3 cursor-pointer mt-1">
              <div className="flex-shrink-0 mt-0.5 sm:mt-0">
                <input type="checkbox" checked={form.saveInfo} onChange={(e) => setForm((p) => ({ ...p, saveInfo: e.target.checked }))} className="sr-only" />
                <div className={`w-5 h-5 rounded flex items-center justify-center border transition-colors ${form.saveInfo ? 'bg-red-600 border-red-600' : 'border-gray-300 bg-white'}`}>
                  {form.saveInfo && (
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
              </div>
              <span className="text-sm text-gray-700">Save this information for faster check-out next time</span>
            </label>
          </div>

          {/* ── RIGHT: ORDER SUMMARY ─────────────────────────────────────── */}
          <div className="flex flex-col gap-4 sm:gap-5 order-1 lg:order-2">

            {/* Cart Items */}
            <div className="bg-gray-50 rounded-2xl p-4 sm:p-5 border border-gray-100">
              <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">Order Summary</h2>
              {cartLoading && <CartSkeleton />}
              {!cartLoading && cartError && (
                <div className="text-center py-4">
                  <p className="text-sm text-red-500 mb-2">{cartError}</p>
                  <button onClick={fetchCart} className="text-xs text-red-600 underline">Retry</button>
                </div>
              )}
              {!cartLoading && !cartError && cartItems.length === 0 && (
                <p className="text-sm text-gray-400 text-center py-4">Your cart is empty.</p>
              )}
              {!cartLoading && !cartError && cartItems.length > 0 && (
                <div className="flex flex-col gap-3">
                  {cartItems.map((item) => {
                    const p = item.product_id;
                    const imgUrl = getImageUrl(p?.product_images);
                    const name = p?.product_title ?? p?.product_name ?? 'Product';
                    const linePrice = (p?.product_selling_price ?? 0) * (item.qty ?? 1);
                    return (
                      <div key={item._id} className="flex items-center gap-3">
                        <div className="w-14 h-14 flex-shrink-0 rounded-xl overflow-hidden bg-white border border-gray-200">
                          {imgUrl
                            ? <img src={imgUrl} alt={name} className="w-full h-full object-cover" />
                            : <div className="w-full h-full flex items-center justify-center text-2xl">📦</div>
                          }
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-800 line-clamp-2 leading-snug">{name}</p>
                          <p className="text-xs text-gray-400 mt-0.5">
                            Qty: {item.qty}{p?.brand?.brand_name && ` · ${p.brand.brand_name}`}
                          </p>
                        </div>
                        <span className="text-sm font-semibold text-gray-900 flex-shrink-0">
                          ₹{linePrice.toLocaleString('en-IN')}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Pricing breakdown */}
            <div className="rounded-2xl border border-gray-100 overflow-hidden divide-y divide-gray-100">
              <div className="flex items-center justify-between px-4 py-3">
                <span className="text-sm text-gray-600">Subtotal:</span>
                <span className="text-sm text-gray-900">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex items-center justify-between px-4 py-3">
                <span className="text-sm text-gray-600">Shipping:</span>
                <span className="text-sm text-green-600 font-medium">Free</span>
              </div>
              {couponApplied && (
                <div className="flex items-center justify-between px-4 py-3">
                  <span className="text-sm text-gray-600">Coupon (SAVE10):</span>
                  <span className="text-sm text-green-600 font-medium">−₹{couponDiscount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex items-center justify-between px-4 py-4 bg-gray-50">
                <span className="text-sm font-semibold text-gray-800">Total:</span>
                <span className="text-base font-bold text-gray-900">₹{total.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Payment methods */}
            <div className="rounded-2xl border border-gray-100 overflow-hidden">
              <div className="px-4 py-3 bg-gray-50 border-b border-gray-100">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Payment Method</p>
              </div>
              <div className="p-4 flex flex-col gap-4">

                {/* Card */}
                <RadioOption value="card" selected={paymentMethod} onChange={handlePaymentMethodChange} label="Credit / Debit Card" icons={<CardNetworkIcons />} />
                {paymentMethod === 'card' && (
                  <div className="flex flex-col gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200">
                    <PlainInput
                      label="Card Number"
                      value={cardForm.cardNumber}
                      onChange={(v) => setCardForm((p) => ({ ...p, cardNumber: formatCardNumber(v) }))}
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                    />
                    <PlainInput
                      label="Card Holder Name"
                      value={cardForm.cardHolder}
                      onChange={(v) => setCardForm((p) => ({ ...p, cardHolder: v }))}
                      placeholder="Name on card"
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <PlainInput
                        label="Expiry (MM/YY)"
                        value={cardForm.expiry}
                        onChange={(v) => setCardForm((p) => ({ ...p, expiry: formatExpiry(v) }))}
                        placeholder="MM/YY"
                        maxLength={5}
                      />
                      <PlainInput
                        label="CVV"
                        value={cardForm.cvv}
                        onChange={(v) => setCardForm((p) => ({ ...p, cvv: v.replace(/\D/g, '').slice(0, 4) }))}
                        placeholder="•••"
                        type="password"
                        maxLength={4}
                      />
                    </div>
                  </div>
                )}

                {/* UPI */}
                <RadioOption value="upi" selected={paymentMethod} onChange={handlePaymentMethodChange} label="UPI" icons={<UpiSmallIcons />} />
                {paymentMethod === 'upi' && (
                  <UpiSection
                    selectedApp={selectedUpiApp}
                    onSelectApp={handleUpiAppSelect}
                    upiId={upiId}
                    onUpiIdChange={setUpiId}
                  />
                )}
              </div>
            </div>

            {/* Coupon */}
            <div className="flex gap-2 sm:gap-3">
              <input
                type="text"
                placeholder="Coupon Code (try SAVE10)"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                disabled={couponApplied}
                className="flex-1 min-w-0 h-[50px] px-4 border border-gray-300 rounded-lg text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all disabled:opacity-50 disabled:bg-gray-50"
              />
              <button
                onClick={handleApplyCoupon}
                disabled={couponApplied}
                className="h-[50px] px-4 sm:px-6 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white text-sm font-medium rounded-lg transition-colors whitespace-nowrap flex-shrink-0"
              >
                {couponApplied ? '✓ Applied' : 'Apply Coupon'}
              </button>
            </div>
            {couponApplied && (
              <p className="text-xs text-green-600 -mt-2 font-medium">
                🎉 10% off applied! You saved ₹{couponDiscount.toLocaleString('en-IN')}.
              </p>
            )}

            {/* Place Order */}
            <button
              onClick={handlePlaceOrder}
              disabled={placingOrder || cartItems.length === 0 || cartLoading}
              className="w-full h-[54px] bg-red-600 hover:bg-red-700 active:bg-red-800 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm sm:text-base font-semibold rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm hover:shadow-md"
            >
              {placingOrder ? (
                <>
                  <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  Placing Order...
                </>
              ) : (
                <>
                  Place Order
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </>
              )}
            </button>

            <p className="text-center text-xs text-gray-400 flex items-center justify-center gap-1.5 pb-2">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              Secure & Encrypted Checkout
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;