
import type { ICategoryDocument, ICategoryPayload, CategoryResponse, CategoryListResponse } from "@kitchensathi12-arch/ecommerce-types";
import { API } from "../lib/api";

// CREATE CATEGORY
export const createCategory = async (
  payload: ICategoryPayload
): Promise<CategoryResponse> => {
  const res = await API.post("/category/create-category", payload);
  return res.data;
};

// GET ALL CATEGORIES (ADMIN)
export const getAllCategories = async ({
  page = 1,
  limit = 10,
}: {
  page?: number;
  limit?: number;
}): Promise<CategoryListResponse> => {
  const res = await API.get("/category/get-category", {
    params: { page, limit },
  });
  return res.data;
};

// GET ACTIVE CATEGORIES (PUBLIC)
export const getActiveCategories = async (): Promise<ICategoryDocument[]> => {
  const res = await API.get("/category/get-active-categories");
  return res.data;
};

// UPDATE CATEGORY
export const updateCategory = async ({
  id,
  payload,
}: {
  id: string;
  payload: Partial<ICategoryPayload>;
}): Promise<CategoryResponse> => {
  const res = await API.put(
    `/category/update-category/id/${id}`,
    payload
  );
  return res.data;
};

// DELETE CATEGORY (SOFT DELETE)
export const deleteCategory = async (id: string): Promise<CategoryResponse> => {
  const res = await API.delete(
    `/category/delete-category/id/${id}`
  );
  return res.data;
};

// ✅ GET ALL DELETED CATEGORIES (FIXED)
export const getDeletedCategories = async ({
  page = 1,
  limit = 10,
}: {
  page?: number;
  limit?: number;
}): Promise<CategoryListResponse> => {
  const res = await API.get(
    "/category/get-all-deleted-categories",
    {
      params: { page, limit },
    }
  );
  return res.data;
};

// ✅ RESTORE CATEGORY (IMPORTANT - METHOD PUT)
export const restoreCategory = async (
  id: string
): Promise<CategoryResponse> => {
  const res = await API.put(
    `/category/restored-category/id/${id}`
  );
  return res.data;
};

// ✅ PERMANENT DELETE CATEGORY (AGAR HAI)
export const deleteCategoryPermanently = async (
  id: string
): Promise<CategoryResponse> => {
  const res = await API.delete(
    `/category/delete-category-permanent/id/${id}` // check backend
  );
  return res.data;
};