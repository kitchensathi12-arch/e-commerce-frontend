import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CheckOut = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    companyName: "",
    streetAddress: "",
    apartment: "",
    townCity: "",
    phoneNumber: "",
    emailAddress: "",
    saveInfo: true,
  });

  const [paymentMethod, setPaymentMethod] = useState<"bank" | "cod">("cod");
  const [couponCode, setCouponCode] = useState("");

  // Mock cart items — replace with real cart data
  const cartItems = [
    { id: 1, name: "LCD Monitor", price: 650 },
    { id: 2, name: "H1 Gamepad", price: 1100 },
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);
  const shipping = 0;
  const total = subtotal + shipping;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handlePlaceOrder = () => {
    console.log("Order placed", { form, paymentMethod, cartItems });
    // TODO: Add real order submission logic
  };

  return (
    <div className="min-h-screen bg-white font-sans">

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <nav className="text-xs sm:text-sm text-gray-400 flex flex-wrap items-center gap-1 sm:gap-2">
          <span className="hover:text-gray-600 cursor-pointer" onClick={() => navigate("/")}>Account</span>
          <span>/</span>
          <span className="hover:text-gray-600 cursor-pointer">My Account</span>
          <span>/</span>
          <span className="hover:text-gray-600 cursor-pointer">Product</span>
          <span>/</span>
          <span className="hover:text-gray-600 cursor-pointer" onClick={() => navigate("/cart")}>View Cart</span>
          <span>/</span>
          <span className="text-gray-900 font-medium">CheckOut</span>
        </nav>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-20">
        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-8 sm:mb-10">
          Billing Details
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">

          {/* LEFT — Billing Form */}
          <div className="flex flex-col gap-5">

            <div>
              <label className="block text-sm text-gray-700 mb-2">
                First Name<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                className="w-full bg-gray-100 rounded-md px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-red-400 transition"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">Company Name</label>
              <input
                type="text"
                name="companyName"
                value={form.companyName}
                onChange={handleChange}
                className="w-full bg-gray-100 rounded-md px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-red-400 transition"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Street Address<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="streetAddress"
                value={form.streetAddress}
                onChange={handleChange}
                className="w-full bg-gray-100 rounded-md px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-red-400 transition"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Apartment, floor, etc. (optional)
              </label>
              <input
                type="text"
                name="apartment"
                value={form.apartment}
                onChange={handleChange}
                className="w-full bg-gray-100 rounded-md px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-red-400 transition"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Town/City<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="townCity"
                value={form.townCity}
                onChange={handleChange}
                className="w-full bg-gray-100 rounded-md px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-red-400 transition"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Phone Number<span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="phoneNumber"
                value={form.phoneNumber}
                onChange={handleChange}
                className="w-full bg-gray-100 rounded-md px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-red-400 transition"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Email Address<span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="emailAddress"
                value={form.emailAddress}
                onChange={handleChange}
                className="w-full bg-gray-100 rounded-md px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-red-400 transition"
              />
            </div>

            <div className="flex items-center gap-3 mt-1">
              <input
                type="checkbox"
                id="saveInfo"
                name="saveInfo"
                checked={form.saveInfo}
                onChange={handleChange}
                className="w-4 h-4 accent-red-500 cursor-pointer flex-shrink-0"
              />
              <label htmlFor="saveInfo" className="text-sm text-gray-700 cursor-pointer leading-snug">
                Save this information for faster check-out next time
              </label>
            </div>
          </div>

          {/* RIGHT — Order Summary */}
          <div className="flex flex-col gap-6">

            {/* Cart Items */}
            <div className="flex flex-col gap-5">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    {/* Image placeholder — no URL */}
                    <div className="w-14 h-14 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6 text-gray-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <span className="text-sm text-gray-800">{item.name}</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900 whitespace-nowrap">
                    ${item.price.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200" />

            {/* Totals */}
            <div className="flex flex-col gap-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-700">Subtotal:</span>
                <span className="font-medium text-gray-900">${subtotal.toLocaleString()}</span>
              </div>
              <div className="border-t border-gray-200" />
              <div className="flex justify-between">
                <span className="text-gray-700">Shipping:</span>
                <span className="font-medium text-green-600">
                  {shipping === 0 ? "Free" : `$${shipping}`}
                </span>
              </div>
              <div className="border-t border-gray-200" />
              <div className="flex justify-between">
                <span className="text-gray-700">Total:</span>
                <span className="font-semibold text-gray-900 text-base">${total.toLocaleString()}</span>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    value="bank"
                    checked={paymentMethod === "bank"}
                    onChange={() => setPaymentMethod("bank")}
                    className="accent-red-500 w-4 h-4"
                  />
                  <span className="text-sm text-gray-800">Bank</span>
                </label>
                <div className="flex items-center gap-1 flex-wrap">
                  <div className="px-2 h-5 bg-pink-100 rounded text-[9px] flex items-center justify-center font-bold text-pink-600">bKash</div>
                  <div className="px-2 h-5 bg-blue-600 rounded text-[9px] flex items-center justify-center font-bold text-white">VISA</div>
                  <div className="px-2 h-5 bg-red-500 rounded text-[9px] flex items-center justify-center font-bold text-white">MC</div>
                  <div className="px-2 h-5 bg-orange-500 rounded text-[9px] flex items-center justify-center font-bold text-white">Nagad</div>
                </div>
              </div>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={paymentMethod === "cod"}
                  onChange={() => setPaymentMethod("cod")}
                  className="accent-red-500 w-4 h-4"
                />
                <span className="text-sm text-gray-800">Cash on delivery</span>
              </label>
            </div>

            {/* Coupon Code */}
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                placeholder="Coupon Code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="flex-1 border border-gray-300 rounded-md px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-red-400 transition"
              />
              <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-md text-sm font-medium transition-colors whitespace-nowrap">
                Apply Coupon
              </button>
            </div>

            {/* Place Order */}
            <button
              onClick={handlePlaceOrder}
              className="w-full sm:w-48 bg-red-500 hover:bg-red-600 text-white py-3 rounded-md font-medium text-sm transition-colors"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;