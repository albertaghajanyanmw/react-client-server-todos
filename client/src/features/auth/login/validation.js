import * as yup from 'yup';

const userValidationSchema = yup.object({
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
    .string('Enter your nickname')
    .required('Nick name is required')
});

export {userValidationSchema, guestValidationSchema};