"use client";

import { emptyCart, getCartItems, removeCartItem } from "@/services/CartServices";
import { useState, useEffect, useCallback } from "react";
import type { ICartDetails } from "@kitchensathi12-arch/ecommerce-types";

export default function Cart() {
  const [items, setItems] = useState<ICartDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [removingId, setRemovingId] = useState<string | null>(null);
  const [emptyingCart, setEmptyingCart] = useState(false);

  // ── Fetch cart ──
  const fetchCart = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await getCartItems();
      setItems(res.data as unknown as ICartDetails[]);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to load cart.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  // ── Remove single item ──
  const removeItem = async (cartId: string) => {
    setRemovingId(cartId);
    try {
      await removeCartItem(cartId);
      setTimeout(() => {
        setItems((prev) => prev.filter((i) => String(i._id) !== cartId));
        setRemovingId(null);
      }, 400);
    } catch (err: any) {
      setRemovingId(null);
      alert(err?.response?.data?.message || "Failed to remove item.");
    }
  };

  // ── Empty cart ──
  const handleEmptyCart = async () => {
    if (!confirm("Are you sure you want to empty the cart?")) return;
    setEmptyingCart(true);
    try {
      await emptyCart();
      setItems([]);
    } catch (err: any) {
      alert(err?.response?.data?.message || "Failed to empty cart.");
    } finally {
      setEmptyingCart(false);
    }
  };

  // ── Coupon ──
  const applyCoupon = () => {
    if (coupon.trim().toUpperCase() === "SAVE10") {
      setCouponApplied(true);
    } else {
      alert("Invalid coupon code. Try SAVE10");
    }
  };

  const subtotal = items.reduce(
    (sum, i) =>
      sum + ((i.product_id?.product_selling_price ?? 0) * (i.qty ?? 0)),
    0
  );

  const totalMRP = items.reduce(
    (sum, i) =>
      sum + ((i.product_id?.product_mrp_price ?? 0) * (i.qty ?? 0)),
    0
  );
  const mrpDiscount = totalMRP - subtotal;
  const couponDiscount = couponApplied ? Math.round(subtotal * 0.1) : 0;
  const total = subtotal - couponDiscount;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=DM+Sans:wght@300;400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        :root {
          --red: #e02d2d; --red-dark: #b81e1e;
          --bg: #f7f5f2; --card: #ffffff;
          --border: #e8e3dc; --text: #1a1714;
          --muted: #8a8075; --accent: #1a1714;
          --green: #16a34a;
        }
        body { background: var(--bg); font-family: 'Inter', sans-serif; }
        .cart-root { min-height: 100vh; background: var(--bg); padding: 0 0 80px; }

        /* Header */
        .cart-header {
          background: var(--accent); color: #fff;
          padding: 28px 5vw;
          display: flex; align-items: center; justify-content: space-between;
          position: sticky; top: 0; z-index: 100;
        }
        .cart-header h1 { font-weight: 500; font-size: clamp(1.2rem, 3vw, 1.6rem); letter-spacing: -0.01em; }
        .cart-badge { background: var(--red); color: #fff; font-weight: 500; font-size: 0.78rem; padding: 4px 14px; border-radius: 999px; }

        /* Layout */
        .cart-layout { display: grid; grid-template-columns: 1fr 380px; gap: 28px; padding: 24px 5vw 0; align-items: start; }
        @media (max-width: 900px) { .cart-layout { grid-template-columns: 1fr; } }

        /* Savings Banner */
        .savings-banner {
          background: #f0fdf4; border: 1.5px solid #bbf7d0;
          border-radius: 10px; padding: 10px 16px; margin-bottom: 16px;
          font-size: 0.82rem; color: var(--green); font-weight: 500;
          display: flex; align-items: center; gap: 8px;
        }

        /* Table Header */
        .table-header {
          display: grid; grid-template-columns: 2.5fr 1fr 1.2fr 1fr;
          padding: 14px 24px; font-size: 0.78rem; font-weight: 500;
          text-transform: uppercase; letter-spacing: 0.08em;
          color: var(--muted); border-bottom: 2px solid var(--border); margin-bottom: 4px;
        }
        @media (max-width: 600px) { .table-header { display: none; } }

        /* Cart Item */
        .cart-item {
          background: var(--card); border: 1.5px solid var(--border);
          border-radius: 16px; padding: 20px 24px;
          display: grid; grid-template-columns: 2.5fr 1fr 1.2fr 1fr;
          align-items: center; gap: 16px; margin-bottom: 12px;
          transition: opacity 0.4s ease, transform 0.4s ease, border-color 0.2s;
          position: relative; overflow: hidden;
        }
        .cart-item:hover { border-color: var(--red); }
        .cart-item.removing { opacity: 0; transform: translateX(60px); }
        .cart-item::before {
          content: ''; position: absolute; left: 0; top: 0; bottom: 0;
          width: 4px; background: var(--red); border-radius: 4px 0 0 4px;
          opacity: 0; transition: opacity 0.2s;
        }
        .cart-item:hover::before { opacity: 1; }
        @media (max-width: 600px) { .cart-item { grid-template-columns: 1fr 1fr; grid-template-rows: auto auto; } }

        /* Product Cell */
        .product-cell { display: flex; align-items: center; gap: 16px; }
        .product-img-wrap {
          width: 68px; height: 68px; background: #f0ede8;
          border-radius: 12px; display: flex; align-items: center;
          justify-content: center; flex-shrink: 0; position: relative; overflow: hidden;
        }
        .product-img-wrap img { width: 100%; height: 100%; object-fit: cover; }
        .img-placeholder { font-size: 2rem; }
        .remove-btn {
          position: absolute; top: -4px; left: -4px;
          width: 22px; height: 22px; background: var(--red);
          border: none; border-radius: 50%; color: #fff; font-size: 0.75rem;
          cursor: pointer; display: flex; align-items: center; justify-content: center;
          opacity: 0; transition: opacity 0.2s; z-index: 2;
        }
        .cart-item:hover .remove-btn { opacity: 1; }
        .remove-btn:disabled { cursor: not-allowed; opacity: 0.5 !important; }
        .product-info { flex: 1; min-width: 0; }
        .product-name { font-weight: 500; font-size: 0.95rem; color: var(--text); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .product-meta { font-size: 0.75rem; color: var(--muted); margin-top: 3px; }
        .discount-badge {
          display: inline-block; background: #dcfce7; color: var(--green);
          font-size: 0.7rem; font-weight: 600; padding: 2px 7px;
          border-radius: 999px; margin-top: 4px;
        }

        /* Price Cell */
        .selling-price { font-weight: 500; font-size: 0.95rem; color: var(--text); }
        .mrp-price { font-size: 0.75rem; color: var(--muted); text-decoration: line-through; margin-top: 2px; }

        /* Qty */
        .qty-num {
          display: inline-flex; align-items: center; justify-content: center;
          width: 44px; height: 36px; border: 1.5px solid var(--border);
          border-radius: 8px; font-weight: 500; font-size: 0.92rem;
          color: var(--text); background: var(--bg);
        }

        /* Subtotal */
        .subtotal-cell { font-weight: 600; font-size: 1rem; color: var(--red); text-align: right; }
        @media (max-width: 600px) { .subtotal-cell { text-align: left; } }

        /* Buttons */
        .bottom-row { display: flex; justify-content: space-between; align-items: center; margin-top: 8px; flex-wrap: wrap; gap: 12px; }
        .btn-outline {
          padding: 12px 28px; border: 1.5px solid var(--text);
          background: transparent; color: var(--text); font-weight: 500;
          font-size: 0.88rem; border-radius: 10px; cursor: pointer;
          transition: background 0.2s, color 0.2s;
        }
        .btn-outline:hover { background: var(--text); color: #fff; }
        .btn-red {
          padding: 12px 28px; border: none; background: var(--red); color: #fff;
          font-weight: 500; font-size: 0.88rem; border-radius: 10px; cursor: pointer;
          transition: background 0.2s, transform 0.1s;
        }
        .btn-red:hover { background: var(--red-dark); transform: translateY(-1px); }
        .btn-red:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }

        /* Coupon */
        .coupon-row { display: flex; gap: 12px; margin-top: 28px; flex-wrap: wrap; }
        .coupon-input {
          flex: 1; min-width: 180px; padding: 13px 18px;
          border: 1.5px solid var(--border); border-radius: 10px;
          background: var(--card); font-size: 0.9rem; color: var(--text);
          outline: none; transition: border-color 0.2s; font-family: 'DM Sans', sans-serif;
        }
        .coupon-input:focus { border-color: var(--red); }
        .coupon-input::placeholder { color: var(--muted); }
        .coupon-success { font-size: 0.8rem; color: var(--green); font-weight: 500; margin-top: 6px; }

        /* Summary Card */
        .cart-total-card { background: var(--card); border: 1.5px solid var(--border); border-radius: 20px; overflow: hidden; position: sticky; top: 100px; }
        .total-header { background: var(--accent); color: #fff; padding: 20px 28px; font-weight: 500; font-size: 1rem; }
        .total-body { padding: 24px 28px; }
        .total-row { display: flex; justify-content: space-between; align-items: center; padding: 12px 0; border-bottom: 1px solid var(--border); }
        .total-row:last-of-type { border-bottom: none; }
        .total-label { font-size: 0.9rem; color: var(--muted); }
        .total-value { font-weight: 500; font-size: 0.95rem; color: var(--text); }
        .total-value.free { color: var(--green); }
        .total-value.discount { color: var(--green); }
        .total-value.coupon { color: var(--red); }
        .grand-total-row { display: flex; justify-content: space-between; align-items: center; padding: 18px 0 20px; border-top: 2px solid var(--border); margin-top: 8px; }
        .grand-label { font-weight: 500; font-size: 1rem; color: var(--text); }
        .grand-value { font-weight: 600; font-size: 1.3rem; color: var(--red); }
        .checkout-btn {
          width: 100%; padding: 16px; background: var(--red); color: #fff;
          border: none; border-radius: 12px; font-weight: 500; font-size: 0.95rem;
          cursor: pointer; transition: background 0.2s, transform 0.1s, box-shadow 0.2s;
          display: flex; align-items: center; justify-content: center; gap: 10px;
        }
        .checkout-btn:hover:not(:disabled) { background: var(--red-dark); transform: translateY(-2px); box-shadow: 0 8px 24px rgba(224,45,45,0.3); }
        .checkout-btn:disabled { opacity: 0.5; cursor: not-allowed; }
        .security-note { display: flex; align-items: center; justify-content: center; gap: 6px; margin-top: 14px; font-size: 0.78rem; color: var(--muted); }

        /* States */
        .loading-state { text-align: center; padding: 80px 20px; color: var(--muted); }
        .loading-spinner {
          width: 40px; height: 40px; border: 3px solid var(--border);
          border-top-color: var(--red); border-radius: 50%;
          animation: spin 0.8s linear infinite; margin: 0 auto 16px;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        .error-state { text-align: center; padding: 60px 20px; color: var(--red); background: #fff5f5; border: 1.5px solid #fecaca; border-radius: 16px; }
        .error-state button { margin-top: 14px; padding: 10px 24px; background: var(--red); color: #fff; border: none; border-radius: 8px; cursor: pointer; font-size: 0.88rem; }
        .empty-state { text-align: center; padding: 80px 20px; color: var(--muted); }
        .empty-state .icon { font-size: 4rem; margin-bottom: 16px; }
        .empty-state h3 { font-weight: 500; font-size: 1.2rem; color: var(--text); margin-bottom: 8px; }
      `}</style>

      <div className="cart-root">
        {/* Header */}
        <header className="cart-header">
          <h1>🛒 Shopping Cart</h1>
          <span className="cart-badge">{items.length} Item{items.length !== 1 ? "s" : ""}</span>
        </header>

        <div className="cart-layout">

          {/* ── Left ── */}
          <div>
            {loading && (
              <div className="loading-state">
                <div className="loading-spinner" />
                <p>Loading your cart...</p>
              </div>
            )}

            {!loading && error && (
              <div className="error-state">
                <p>⚠️ {error}</p>
                <button onClick={fetchCart}>Retry</button>
              </div>
            )}

            {!loading && !error && mrpDiscount > 0 && (
              <div className="savings-banner">
                🎉 You're saving ₹{mrpDiscount.toLocaleString("en-IN")} on MRP on this order!
              </div>
            )}

            {!loading && !error && items.length > 0 && (
              <div className="table-header">
                <div>Product</div>
                <div>Price</div>
                <div>Quantity</div>
                <div style={{ textAlign: "right" }}>Subtotal</div>
              </div>
            )}

            {!loading && !error && items.length === 0 && (
              <div className="empty-state">
                <div className="icon">🛍️</div>
                <h3>Your cart is empty</h3>
                <p>Add some items to get started!</p>
              </div>
            )}

            {!loading && !error && items.map((item) => {
              const p = item.product_id ?? {};
              return (
                <div
                  key={String(item._id)}
                  className={`cart-item${removingId === String(item._id) ? " removing" : ""}`}
                >
                  <div className="product-cell">
                    <div className="product-img-wrap">
                      <button
                        className="remove-btn"
                        onClick={() => removeItem(String(item._id))}
                        disabled={removingId === String(item._id)}
                        title="Remove item"
                      >
                        ✕
                      </button>
                      {(p.product_images as any)?.image_url ? (
                        <img src={(p.product_images as any).image_url} alt={p.product_name} />
                      ) : (
                        <span className="img-placeholder">📦</span>
                      )}
                    </div>
                    <div className="product-info">
                      <div className="product-name">{p?.product_name || "Unknown Product"}</div>
                      <div className="product-meta">
                        {p.brand?.brand_name} · {p.category?.name}
                      </div>
                      {(p.product_discount ?? 0) > 0 && (
                        <span className="discount-badge">{p.product_discount}% OFF</span>
                      )}
                    </div>
                  </div>

                  <div>
                    <div className="selling-price">
                      ₹{(p.product_selling_price ?? 0).toLocaleString("en-IN")}
                    </div>
                    {(p.product_mrp_price ?? 0) > (p.product_selling_price ?? 0) && (
                      <div className="mrp-price">
                        ₹{(p.product_mrp_price ?? 0).toLocaleString("en-IN")}
                      </div>
                    )}
                  </div>

                  <div>
                    <div className="qty-num">{String(item.qty).padStart(2, "0")}</div>
                  </div>

                  <div className="subtotal-cell">
                    ₹{((p.product_selling_price ?? 0) * item.qty).toLocaleString("en-IN")}
                  </div>
                </div>
              );
            })}

            {!loading && (
              <div className="bottom-row">
                <button className="btn-outline" onClick={() => (window.location.href = "/")}>
                  ← Return To Shop
                </button>
                <div style={{ display: "flex", gap: "12px" }}>
                  <button className="btn-outline" onClick={fetchCart}>↺ Refresh</button>
                  {items.length > 0 && (
                    <button className="btn-red" onClick={handleEmptyCart} disabled={emptyingCart}>
                      {emptyingCart ? "Clearing..." : "🗑 Empty Cart"}
                    </button>
                  )}
                </div>
              </div>
            )}

            {!loading && !error && items.length > 0 && (
              <div>
                <div className="coupon-row">
                  <input
                    className="coupon-input"
                    placeholder="Enter coupon code (try SAVE10)"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    disabled={couponApplied}
                  />
                  <button className="btn-red" onClick={applyCoupon} disabled={couponApplied}>
                    {couponApplied ? "Applied ✓" : "Apply Coupon"}
                  </button>
                </div>
                {couponApplied && <div className="coupon-success">🎉 Coupon applied! 10% off.</div>}
              </div>
            )}
          </div>

          {/* ── Right: Summary ── */}
          <div className="cart-total-card">
            <div className="total-header">Cart Total</div>
            <div className="total-body">
              <div className="total-row">
                <span className="total-label">MRP Total</span>
                <span className="total-value">₹{totalMRP.toLocaleString("en-IN")}</span>
              </div>
              {mrpDiscount > 0 && (
                <div className="total-row">
                  <span className="total-label">Product Discount</span>
                  <span className="total-value discount">−₹{mrpDiscount.toLocaleString("en-IN")}</span>
                </div>
              )}
              <div className="total-row">
                <span className="total-label">Subtotal</span>
                <span className="total-value">₹{subtotal.toLocaleString("en-IN")}</span>
              </div>
              {couponApplied && (
                <div className="total-row">
                  <span className="total-label">Coupon (SAVE10)</span>
                  <span className="total-value coupon">−₹{couponDiscount.toLocaleString("en-IN")}</span>
                </div>
              )}
              <div className="total-row">
                <span className="total-label">Shipping</span>
                <span className="total-value free">Free</span>
              </div>
              <div className="total-row">
                <span className="total-label">Tax</span>
                <span className="total-value">₹0.00</span>
              </div>
              <div className="grand-total-row">
                <span className="grand-label">Total</span>
                <span className="grand-value">₹{total.toLocaleString("en-IN")}</span>
              </div>
              <button className="checkout-btn" disabled={items.length === 0 || loading}>
                Proceed to Checkout →
              </button>
              <div className="security-note">🛡️ Secure & Encrypted Checkout</div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}