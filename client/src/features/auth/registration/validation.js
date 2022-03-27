import * as yup from 'yup';

const userValidationSchema = yup.object({
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

const guestValidationSchema = yup.object({
  nickName: yup
    .string('Enter your Nick name')
    .required('Nick name is required'),
  password: yup
    .string('Enter your password')
    .min(5, 'Password should be of minimum 5 characters length')
    .required('Password is required'),
});

const switchGuestValidationSchema = yup.object({
  firstName: yup
    .string('Enter your First name')
    .required('First name is required'),
  lastName: yup
    .string('Enter your Last name')
    .required('Last name is required'),
  nickName: yup
    .string('Enter your Nick name')
    .required('Nick name is required'),
  password: yup
    .string('Enter your password')
    .min(5, 'Password should be of minimum 5 characters length')
    .required('Password is required'),
});

export {userValidationSchema, guestValidationSchema, switchGuestValidationSchema};