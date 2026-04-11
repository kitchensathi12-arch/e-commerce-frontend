import { API } from "../lib/api";
import {
  convertToBase64,
  type ICreateBannerPayload,
} from "@kitchensathi12-arch/ecommerce-types";

/* ========= CREATE BANNER ======== */

export const createBanner = async (
  data: Omit<ICreateBannerPayload, "image"> & { image?: File }
) => {
  const { image, ...rest } = data;

  const payload: Omit<ICreateBannerPayload, "image"> & {
    image?: string;
  } = {
    ...rest,
  };

  if (image instanceof File) {
    payload.image = await convertToBase64(image);
  }

  const res = await API.post("/banner/create", payload);
  return res.data;
};

/* ========= UPDATE BANNER ======== */

export const updateBanner = async (
  id: string,
  data: Partial<Omit<ICreateBannerPayload, "image">> & {
    image?: string | File;
  }
) => {
  const { image, ...rest } = data;

  const payload: Partial<Omit<ICreateBannerPayload, "image">> & {
    image?: string;
  } = {
    ...rest,
  };

  if (image instanceof File) {
    payload.image = await convertToBase64(image);
  } else if (typeof image === "string") {
    payload.image = image;
  }

  const res = await API.put(`/banner/update/id/${id}`, payload);
  return res.data;
};

/* ========= DELETE BANNER ======== */

export const deleteBanner = async (id: string) => {
  const res = await API.delete(`/banner/delete/id/${id}`);

  return res.data;
};

/* ========= GET ACTIVE BANNERS (Website UI) ======== */

export const getActiveBanners = async () => {
  const res = await API.get("/banner/active-banners");
  return res.data;
};

/* ========= GET ALL BANNERS WITH PAGINATION (Admin Panel) ======== */

export const getAllBanners = async (
  page: number = 1,
  limit: number = 10
) => {
  const res = await API.get(
    `/banner/get-all-banners?page=${page}&limit=${limit}`
  );

  return res.data;
};