import { AxiosInstance } from "@/config/axiosInstance";


export const loginUser = async (data) => {
    const res = await AxiosInstance.post('/auth/login', data);
    return res.data;
};

export const registerUser = async (data) => {
    const res = await AxiosInstance.post('/auth/register', data);
    return res.data;
};

export const getLoggedInUser = async () => {
    const res = await AxiosInstance.get('/auth/logged-in-user');
    return res;
};

export const logoutUser = async () => {
    const res = await AxiosInstance.post('/auth/logout');
    return res;
};
