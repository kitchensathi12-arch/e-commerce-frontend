import { API } from '../lib/api';
import type { ICartDocument, ICartDetails } from '@kitchensathi12-arch/ecommerce-types';

// ================= TYPES =================

// Add Cart Response
export interface AddCartResponse {
  message: string;
  data: ICartDocument;
}

// Get Cart Response
export interface GetCartResponse {
  message: string;
  data: ICartDetails[];
}

// Remove Cart Response
export interface RemoveCartResponse {
  message: string;
  data: null;
}

// Empty Cart Response
export interface EmptyCartResponse {
  message: string;
  data: {
    acknowledged: boolean;
    deletedCount: number;
  };
}

// ================= ADD TO CART =================

export const addToCart = async (payload: { product_id: string; qty: number; currency?: string }): Promise<AddCartResponse> => {
  const res = await API.post('/cart/add-item', payload);
  return res.data;
};

// ================= GET CART ITEMS =================

export const getCartItems = async (): Promise<GetCartResponse> => {
  const res = await API.get('/cart/cart-items');
  return res.data;
};

// ================= REMOVE CART ITEM =================

export const removeCartItem = async (id: string): Promise<RemoveCartResponse> => {
  const res = await API.delete(`/cart/remove-items/cart-id/${id}`);
  return res.data;
};

// ================= EMPTY CART =================

export const emptyCart = async (): Promise<EmptyCartResponse> => {
  const res = await API.delete('/cart/empty-cart');
  return res.data;
};
