/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useEffect, useCallback } from 'react';
import { ShoppingCart, Trash2 } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import type { IWishlistDetails } from '@kitchensathi12-arch/ecommerce-types';
import { emptyWishlist, getWishlistItems, removeWishlistItem } from '@/services/Whislist';
import { addToCart } from '@/services/CartServices';
import { AuthStore } from '@/store/store';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function Wishlist() {
  const { user } = AuthStore((state) => state);
  const navigate = useNavigate();
  const [items, setItems] = useState<(IWishlistDetails & { _id: string })[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [removingId, setRemovingId] = useState<string | null>(null);
  const [emptyingWishlist, setEmptyingWishlist] = useState(false);

  // ── Fetch wishlist ──
  const fetchWishlist = useCallback(async () => {
    if (!user) {
      setItems([]);
      setLoading(false);
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      const res = await getWishlistItems();
      setItems(res.data as unknown as (IWishlistDetails & { _id: string })[]);
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Failed to load wishlist.');
    } finally {
      setLoading(false);
    }
  }, []);

  // ── Add to Cart ──
  const { mutate: handleAddToCart, isPending: isCartPending } = useMutation({
    mutationFn: addToCart,
    onSuccess: () => {
      console.log('Added to cart');
    },
    onError: (err: any) => {
      alert(err?.response?.data?.message || 'Failed to add to cart.');
    },
  });

  useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist, user]);

  // ── Remove single item ──
  const removeItem = async (wishlistId: string) => {
    setRemovingId(wishlistId);
    try {
      await removeWishlistItem(wishlistId);
      setTimeout(() => {
        setItems((prev) => prev.filter((i) => String(i._id) !== wishlistId));
        setRemovingId(null);
      }, 350);
    } catch (err: any) {
      setRemovingId(null);
      alert(err?.response?.data?.message || 'Failed to remove item.');
    }
  };

  // ── Empty wishlist ──
  const handleEmptyWishlist = async () => {
    if (!confirm('Are you sure you want to empty the wishlist?')) return;
    setEmptyingWishlist(true);
    try {
      await emptyWishlist();
      setItems([]);
    } catch (err: any) {
      alert(err?.response?.data?.message || 'Failed to empty wishlist.');
    } finally {
      setEmptyingWishlist(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --red: #db4444;
          --red-dark: #b83333;
          --bg: #fff;
          --border: #e8e8e8;
          --text: #1a1a1a;
          --muted: #7a7a7a;
          --card-bg: #f5f5f5;
        }

        .wl-root {
          min-height: 100vh;
          background: var(--bg);
          font-family: 'Inter', sans-serif;
          padding: 48px 5vw 80px;
        }

        .wl-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 32px;
          flex-wrap: wrap;
          gap: 12px;
        }
        .wl-title {
          font-size: 1rem;
          font-weight: 400;
          color: var(--text);
        }
        .wl-move-btn {
          padding: 10px 24px;
          border: 1.5px solid #808080;
          background: transparent;
          color: var(--text);
          font-family: 'Inter', sans-serif;
          font-size: 0.85rem;
          font-weight: 400;
          border-radius: 4px;
          cursor: pointer;
          transition: background 0.2s, color 0.2s, border-color 0.2s;
          white-space: nowrap;
        }
        .wl-move-btn:hover { background: var(--text); color: #fff; border-color: var(--text); }
        .wl-move-btn:disabled { opacity: 0.5; cursor: not-allowed; }

        .wl-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }
        @media (max-width: 1024px) { .wl-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (max-width: 700px)  { .wl-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 420px)  { .wl-grid { grid-template-columns: 1fr; } }

        .wl-card {
          border-radius: 4px;
          overflow: hidden;
          background: var(--bg);
          transition: opacity 0.35s ease, transform 0.35s ease;
        }
        .wl-card.removing { opacity: 0; transform: scale(0.92); }

        .wl-img-wrap {
          position: relative;
          background: var(--card-bg);
          border-radius: 4px;
          aspect-ratio: 1 / 1;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          cursor: pointer;
        }
        .wl-img-wrap img { width: 100%; height: 100%; object-fit: cover; }
        .wl-img-wrap:hover .wl-add-overlay { opacity: 1; transform: translateY(0); }

        .wl-badge {
          position: absolute;
          top: 10px; left: 10px;
          background: var(--red);
          color: #fff;
          font-size: 0.72rem;
          font-weight: 500;
          padding: 3px 10px;
          border-radius: 4px;
        }

        .wl-delete {
          position: absolute;
          top: 10px; right: 10px;
          width: 32px; height: 32px;
          background: #fff;
          border: none; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          transition: background 0.2s;
          box-shadow: 0 1px 4px rgba(0,0,0,0.1);
        }
        .wl-delete:hover { background: var(--red); }
        .wl-delete:hover svg { stroke: #fff; }
        .wl-delete:disabled { opacity: 0.5; cursor: not-allowed; }

        .wl-add-overlay {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          background: var(--text);
          color: #fff;
          display: flex; align-items: center; justify-content: center; gap: 8px;
          padding: 11px;
          font-size: 0.82rem; font-weight: 500;
          cursor: pointer;
          border: none;
          font-family: 'Inter', sans-serif;
          opacity: 0; transform: translateY(8px);
          transition: opacity 0.22s ease, transform 0.22s ease, background 0.2s;
          width: 100%;
        }
        .wl-add-overlay:hover { background: var(--red); }

        .wl-info { padding: 12px 4px 4px; }
        .wl-name {
          font-size: 0.9rem; font-weight: 500; color: var(--text);
          margin-bottom: 6px;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .wl-prices { display: flex; align-items: center; gap: 10px; }
        .wl-sale { font-size: 0.88rem; font-weight: 500; color: var(--red); }
        .wl-original { font-size: 0.82rem; font-weight: 400; color: var(--muted); text-decoration: line-through; }

        .wl-empty {
          grid-column: 1 / -1;
          text-align: center; padding: 80px 20px; color: var(--muted);
        }
        .wl-empty-icon { font-size: 3.5rem; margin-bottom: 16px; }
        .wl-empty-text { font-size: 1rem; font-weight: 400; color: var(--text); margin-bottom: 6px; }

        .wl-loading { text-align: center; padding: 80px 20px; color: var(--muted); }
        .wl-spinner {
          width: 36px; height: 36px;
          border: 3px solid var(--border);
          border-top-color: var(--red);
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
          margin: 0 auto 16px;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        .wl-error {
          text-align: center; padding: 48px 20px;
          color: var(--red); background: #fff5f5;
          border: 1.5px solid #fecaca; border-radius: 12px;
        }
        .wl-error button {
          margin-top: 12px; padding: 8px 20px;
          background: var(--red); color: #fff;
          border: none; border-radius: 6px;
          cursor: pointer; font-size: 0.85rem;
        }
      `}</style>

      <div className="wl-root">
        {/* Header */}
        <div className="wl-header">
          <p className="wl-title">Wishlist ({items.length})</p>
          <button className="wl-move-btn" onClick={handleEmptyWishlist} disabled={emptyingWishlist || items.length === 0}>
            {emptyingWishlist ? 'Clearing...' : 'Empty Wishlist'}
          </button>
        </div>

        {/* Loading */}
        {loading && (
          <div className="wl-loading">
            <div className="wl-spinner" />
            <p>Loading your wishlist...</p>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="wl-error">
            <p>⚠️ {error}</p>
            <button onClick={fetchWishlist}>Retry</button>
          </div>
        )}

        {/* Grid */}
        {!loading && !error && (
          <div className="wl-grid">
            {items.length === 0 ? (
              <div className="wl-empty">
                <div className="wl-empty-icon">{!user ? '🔒' : '🤍'}</div>
                <p className="wl-empty-text">{!user ? 'Log in to view your wishlist' : 'Your wishlist is empty'}</p>
                <p>{!user ? 'You need an account to save and view your favorite items.' : 'Save items you love here'}</p>
                {!user && (
                  <button className="wl-move-btn" style={{ marginTop: '20px', background: 'var(--red)', color: '#fff', borderColor: 'var(--red)' }} onClick={() => navigate('/login')}>
                    Login to Continue
                  </button>
                )}
              </div>
            ) : (
              items.map((item) => {
                const p = item.product_id;
                const price = (p as any)?.product_selling_price ?? 0;
                const mrp = (p as any)?.product_mrp_price ?? 0;
                const discount = (p as any)?.product_discount ?? 0;
                const imageUrl = (p as any)?.product_images?.image_url;
                const name = (p as any)?.product_name ?? 'Product';

                return (
                  <div key={String(item._id)} className={`wl-card${removingId === String(item._id) ? ' removing' : ''}`}>
                    <div className="wl-img-wrap">
                      {/* Discount Badge */}
                      {discount > 0 && <span className="wl-badge">-{discount}%</span>}

                      {/* Delete */}
                      <button className="wl-delete" onClick={() => removeItem(String(item._id))} disabled={removingId === String(item._id)} title="Remove from wishlist">
                        <Trash2 size={15} color="#333" />
                      </button>

                      {/* Image */}
                      {imageUrl ? <img src={imageUrl} alt={name} /> : <span style={{ fontSize: '4rem' }}>📦</span>}

                      {/* Add to Cart overlay */}
                      {/* Add to Cart overlay */}
                      <button
                        className="wl-add-overlay"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (!user) {
                            toast.error('Please login to add to cart');
                            navigate('/login');
                            return;
                          }
                          const productId = (p as any)?._id;
                          if (!productId) return;
                          handleAddToCart({
                            product_id: String(productId),
                            qty: 1,
                            currency: 'INR',
                          });
                        }}
                        disabled={isCartPending}
                      >
                        <ShoppingCart size={15} />
                        {isCartPending ? 'Adding...' : 'Add To Cart'}
                      </button>
                    </div>

                    <div className="wl-info">
                      <p className="wl-name">{name}</p>
                      <div className="wl-prices">
                        <span className="wl-sale">₹{price.toLocaleString('en-IN')}</span>
                        {mrp > price && <span className="wl-original">₹{mrp.toLocaleString('en-IN')}</span>}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>
    </>
  );
}
