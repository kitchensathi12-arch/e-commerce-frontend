import { API } from '../lib/api';
import type { IWishlistDocument, IWishlistDetails } from '@kitchensathi12-arch/ecommerce-types';

// ================= TYPES =================

// Add Wishlist Response
export interface AddWishlistResponse {
  message: string;
  data: IWishlistDocument;
}

// Get Wishlist Response
export interface GetWishlistResponse {
  message: string;
  data: IWishlistDetails[];
}

// Remove Wishlist Response
export interface RemoveWishlistResponse {
  message: string;
  data: null;
}

// Empty Wishlist Response
export interface EmptyWishlistResponse {
  message: string;
  data: {
    acknowledged: boolean;
    deletedCount: number;
  };
}

// ================= ADD TO WISHLIST =================

export const addToWishlist = async (payload: { product_id: string }): Promise<AddWishlistResponse> => {
  const res = await API.post('/wishlist/add-item', payload);
  return res.data;
};

// ================= GET WISHLIST ITEMS =================

export const getWishlistItems = async (): Promise<GetWishlistResponse> => {
  const res = await API.get('/wishlist/wishlist-items');
  return res.data;
};

// ================= REMOVE WISHLIST ITEM =================

export const removeWishlistItem = async (id: string): Promise<RemoveWishlistResponse> => {
  const res = await API.delete(`/wishlist/remove-items/wishlist-id/${id}`);
  return res.data;
};

// ================= EMPTY WISHLIST =================

export const emptyWishlist = async (): Promise<EmptyWishlistResponse> => {
  const res = await API.delete('/wishlist/empty-wishlist');
  return res.data;
};
