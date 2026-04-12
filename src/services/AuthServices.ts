import type { IAuthLogin, IAuthRegister } from '@kitchensathi12-arch/ecommerce-types';
import { API } from '../lib/api';

export const loginUser = async (data: IAuthLogin) => {
  console.log(data);
  const res = await API.post('/auth/login', data);
  return res.data;
};

export const registerUser = async (data: IAuthRegister) => {
  const res = await API.post('/auth/register', data);
  return res.data;
};

export const getLoggedInUser = async () => {
  const res = await API.get('/auth/logged-in-user');
  return res;
};

export const logoutUser = async () => {
  const res = await API.post('/auth/logout');
  return res;
};
