/* eslint-disable @typescript-eslint/no-explicit-any */
import type { IProductDocument, IProductList, IProductListForWebsite } from '@kitchensathi12-arch/ecommerce-types';

import { API } from '../lib/api';

// ================= TYPES =================

export interface ProductFormValues {
  product_name: string;
  product_title: string;
  product_slug: string;
  product_description: string;
  product_images: any;
  product_selling_price: number;
  product_mrp_price: number;
  product_discount: number;
  category: string;
  brand: string;
  active: boolean;
  product_sku: string;
  product_stock: number;
  low_stock_threshold: number;
  in_stock: boolean;
  meta_title: string;
  meta_description: string;
  meta_keywords: string[];
  product_tags: string[];
  is_featured: boolean;
  is_new_arrival: boolean;
  product_details: { key: string; value: string; _id?: string }[];
}

export interface ProductResponse {
  message: string;
  data: IProductDocument;
}

export interface ProductListResponse {
  data: IProductList[];
  totalData: number;
  totalPage: number;
}

export interface DeletedProductListResponse {
  data: IProductList[];
  totalPage: number | null;
}

export interface RestoreProductResponse {
  message: string;
  data: IProductDocument;
}

// ================= CREATE PRODUCT =================

export const createProduct = async (payload: ProductFormValues): Promise<ProductResponse> => {
  const res = await API.post('/product/create-product', payload);

  return res.data;
};

// ================= UPDATE PRODUCT =================

export const updateProduct = async (id: string, payload: ProductFormValues): Promise<ProductResponse> => {
  const res = await API.put(`/product/update-product/product-id/${id}`, payload);

  return res.data;
};

// ================= DELETE PRODUCT =================

export const deleteProduct = async (id: string): Promise<{ message: string }> => {
  const res = await API.delete(`/product/delete-product/product-id/${id}`);

  return res.data;
};

// ================= GET PRODUCT LIST (ADMIN) =================

export const getProductList = async ({ page = 1, limit = 10 }: { page?: number; limit?: number }): Promise<ProductListResponse> => {
  const res = await API.post('/product/get-product-list', {
    page,
    limit,
  });

  return res.data;
};

// ================= GET ALL PRODUCTS (WEBSITE) =================

export const getAllProducts = async (): Promise<{
  data: IProductListForWebsite[];
}> => {
  const res = await API.post('/product/get-all-products');

  return res.data;
};

export const getProductById = async (id: string): Promise<IProductList> => {
  const res = await API.get(`/product/get-product-details/product-id/${id}`);

  return res.data;
};

// ================= GET DELETED PRODUCTS =================

export const getDeletedProducts = async ({
  page = 1,
  limit = 10,
}: {
  page?: number;
  limit?: number;
} = {}): Promise<DeletedProductListResponse> => {
  const res = await API.post('/product/get-deleted-product-list', {
    page,
    limit,
  });
  return res.data;
};

// ================= RESTORE PRODUCT =================

export const restoreProduct = async (id: string): Promise<RestoreProductResponse> => {
  const res = await API.patch(`/product/restore-product/product-id/${id}`);
  return res.data;
};
