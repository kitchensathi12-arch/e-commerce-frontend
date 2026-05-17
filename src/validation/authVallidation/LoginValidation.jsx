// ── Login Form Validation ─────
export const LoginValidation = ({ email, password }) => {
  const errors = {};

  if (!email) {
    errors.email = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    errors.email = 'Enter a valid email';
  }

  if (!password) {
    errors.password = 'Password is required';
  }

  return errors;
};