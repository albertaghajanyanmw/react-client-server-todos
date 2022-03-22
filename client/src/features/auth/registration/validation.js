import * as yup from 'yup';

const validationSchema = yup.object({
  firstName: yup
  .string('Enter your First name')
  .required('First name is required'),
  lastName: yup
  .string('Enter your Last name')
  .required('Last name is required'),
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string('Enter your password')
    .min(5, 'Password should be of minimum 5 characters length')
    .required('Password is required'),
});

// eslint-disable-next-line import/prefer-default-export
export {validationSchema};