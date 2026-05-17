// ── Register Form Validation ──────────────────────────────────────────────────

export const RegisterValidation = ({ firstName, lastName, email, phone, password, agree }) => {
  const errors = {};

  if (!firstName.trim()) errors.firstName = 'First Name is Required';
  if (!lastName.trim())  errors.lastName  = 'Last Name is Required';

  if (!email)                          errors.email = 'Email is required';
  else if (!/\S+@\S+\.\S+/.test(email)) errors.email = 'Enter a valid email';

  if (!phone) errors.phone = 'Phone is required';

  if (!password)              errors.password = 'Password is required';
  else if (password.length < 8) errors.password = 'Minimum 8 characters';

  if (!agree) errors.agree = 'Please accept terms to continue';

  return errors;
};