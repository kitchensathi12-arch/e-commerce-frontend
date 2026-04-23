import type { IAddressDocument } from '@kitchensathi12-arch/ecommerce-types';
import { API } from '../lib/api';

export const addAddress = async (data: Partial<IAddressDocument>) => {
  console.log('API Request: addAddress payload ->', data);
  const res = await API.post('/address/create', data);
  return res.data;
};

export const getAddress = async () => {
  console.log('API Request: getAddress');
  const res = await API.get('/address/get-all-address');
  return res.data;
};

export const updateAddress = async (id: string, data: Partial<IAddressDocument>) => {
  console.log(`API Request: updateAddress id:[${id}] payload ->`, data);
  const res = await API.put(`/address/update/${id}`, data);
  return res.data;
};

export const deleteAddress = async (id: string) => {
  console.log(`API Request: deleteAddress id:[${id}]`);
  const res = await API.delete(`/address/delete/${id}`);
  return res.data;
};
