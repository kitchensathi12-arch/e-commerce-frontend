import { AxiosInstance } from '@/config/axiosInstance';

// ================= CREATE PRODUCT =================
export const createProduct = async (payload) => {
  const res = await AxiosInstance.post('/product/create-product', payload);

  return res.data;
};

// ================= UPDATE PRODUCT =================
export const updateProduct = async (id, payload) => {
  const res = await AxiosInstance.put(`/product/update-product/product-id/${id}`, payload);

  return res.data;
};

// ================= DELETE PRODUCT =================
export const deleteProduct = async (id) => {
  const res = await AxiosInstance.delete(`/product/delete-product/product-id/${id}`);

  return res.data;
};

// ================= GET PRODUCT LIST (ADMIN) =================

export const getProductList = async ({ page = 1, limit = 10 }) => {
  const res = await AxiosInstance.post('/product/get-product-list', {
    page,
    limit,
  });

  return res.data;
};

export const getProductById = async (id) => {
  const res = await AxiosInstance.get(`/product/get-product-details/product-id/${id}`);

  return res.data;
};

// ================= GET DELETED PRODUCTS =================

export const getDeletedProducts = async ({ page = 1, limit = 10 }) => {
  const res = await AxiosInstance.post('/product/get-deleted-product-list', {
    page,
    limit,
  });
  return res.data;
};

// ================= RESTORE PRODUCT =================
export const restoreProduct = async (id) => {
  const res = await AxiosInstance.patch(`/product/restore-product/product-id/${id}`);
  return res.data;
};

// ================= GET ALL PRODUCTS (WEBSITE) =================
export const getAllProducts = async (params, body) => {
  const res = await AxiosInstance.post(
    `/product/get-all-products?page=${params.page}&limit=${params.limit}`,
    body
  );

  return res.data;
};
