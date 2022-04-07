import * as yup from 'yup';

const validationSchema = yup.object({
  name: yup
    .string('Enter todo name.')
    .required('Name is required.'),
  estimatedDate: yup
    .string('Enter todo estimated date.')
    .nullable()
});

const reminderValidationSchema = yup.object({
  reminderDate: yup
    .string('Enter todo reminder date.')
    .nullable()
});

export {validationSchema, reminderValidationSchema};