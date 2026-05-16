import { AxiosInstance } from "@/config/axiosInstance";


// ------------------ CREATE CATEGORY -----------------------
export const createCategory = async (payload) => {
  const res = await AxiosInstance.post('/category/create-category', payload);
  return res.data;
};

// ---------------------  GET ALL CATEGORIES (ADMIN) ---------------------
export const getAllCategories = async ({ page = 1, limit = 10 } ) => {
  const res = await AxiosInstance.get('/category/get-category', {
    params: { page, limit },
  });
  return res.data;
};

// ------------------------- UPDATE CATEGORY -----------------------------
export const updateCategory = async ({ id, payload }) => {
  const res = await AxiosInstance.put(`/category/update-category/id/${id}`, payload);
  return res.data;
};

// --------------------------- DELETE CATEGORY (SOFT DELETE) ------------------------
export const deleteCategory = async (id) => {
  const res = await AxiosInstance.delete(`/category/delete-category/id/${id}`);
  return res.data;
};

// ---------------- GET ALL DELETED CATEGORIES (FIXED) ----------------------
export const getDeletedCategories = async ({ page = 1, limit = 10 })=> {
  const res = await AxiosInstance.get('/category/get-all-deleted-categories', {
    params: { page, limit },
  });
  return res.data;
};

// ------------------------ RESTORE CATEGORY (IMPORTANT - METHOD PUT) ------------------------
export const restoreCategory = async (id) => {
  const res = await AxiosInstance.put(`/category/restored-category/id/${id}`);
  return res.data;
};

// ------------------------ PERMANENT DELETE CATEGORY (AGAR HAI) ------------------------
export const deleteCategoryPermanently = async (id) => {
  const res = await AxiosInstance.delete(
    `/category/delete-category-permanent/id/${id}` // check backend
  );
  return res.data;
};

// =======================================
// ------ public api start here ----------
// =======================================

// ------------------------ GET ACTIVE CATEGORIES (PUBLIC) ------------------------
export const getActiveCategories = async ()=> {
  const res = await AxiosInstance.get('/category/get-active-categories');
  return res.data;
};