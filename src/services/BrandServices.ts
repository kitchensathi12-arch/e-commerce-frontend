import type { IBrandDocument } from "@kitchensathi12-arch/ecommerce-types";
import { API } from "../lib/api";
import type {
    IBrandPayload,
} from "@kitchensathi12-arch/ecommerce-types";

// ================= TYPES =================

export interface BrandResponse {
    message: string;
    data: IBrandDocument;
}

export interface BrandListResponse {
    data: IBrandDocument[];
    totalData: number;
    totalPage: number;
}

export interface DeletedBrandListResponse {
    data: IBrandDocument[];
    totelBrand: number;
    totalPage: number;
}

export interface RestoreBrandResponse {
    message: string;
    data: IBrandDocument;
}

// ================= CREATE BRAND =================

export const createBrand = async (
    payload: IBrandPayload
): Promise<BrandResponse> => {
    const res = await API.post("/brand/create", payload);
    return res.data;
};

// ================= GET ALL BRANDS (POST PAGINATION) =================

export const getAllBrands = async ({
    page = 1,
    limit = 10,
}: {
    page?: number;
    limit?: number;
}): Promise<BrandListResponse> => {
    const res = await API.post("/brand/get-brands-list", {
        page,
        limit,
    });

    return res.data;
};

// ================= GET ALL BRANDS (on website) =================

export const getActiveBrands = async () => {
    const res = await API.get("/brand/get-active-brand");
    return res.data;
};

// ================= UPDATE BRAND =================

export const updateBrand = async ({
    id,
    payload,
}: {
    id: string;
    payload: FormData;
}) => {
    const res = await API.put(
        `/brand/update-brand/brandId/${id}`,
        payload
    );

    return res.data;
};

// ================= DELETE BRAND =================

export const deleteBrand = async (
    id: string
): Promise<BrandResponse> => {
    const res = await API.delete(
        `/brand/delete-brand/brandId/${id}`
    );

    return res.data;
};

// ================= GET DELETED BRANDS =================

export const getDeletedBrands = async ({
    page = 1,
    limit = 10,
}: {
    page?: number;
    limit?: number;
} = {}): Promise<DeletedBrandListResponse> => {
    const res = await API.post("/brand/get-deleted-brands", { page, limit });
    return res.data;
};

// ================= RESTORE BRAND =================

export const restoreBrand = async (id: string) => {
    const res = await API.post(`/brand/restore-brand/brandId/${id}`);
    return res.data;
};