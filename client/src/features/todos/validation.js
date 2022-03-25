import * as yup from 'yup';

const validationSchema = yup.object({
  name: yup
    .string('Enter todo name.')
    .required('Name is required.'),
  estimatedDate: yup
    .string('Enter todo expire date.')
    .nullable()
});

export {validationSchema};