import axios from 'axios';

export const AxiosInstance = axios.create({
  baseURL: (import.meta as any).env.VITE_API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
});
