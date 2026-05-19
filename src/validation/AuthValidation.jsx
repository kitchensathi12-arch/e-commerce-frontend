import { object, string } from 'yup';

// ===========================================================
// ---------------- login validation start here --------------
// ===========================================================
export const LoginValidation = object({
  username: string().required('Please enter email or username'),
  password: string().min(6).max(16).required('Please enter you password'),
});
