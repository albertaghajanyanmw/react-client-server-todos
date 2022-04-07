import * as yup from 'yup';

const reminderValidationSchema = yup.object({
  reminderDate: yup
    .string('Enter todo reminder date.')
    .required('Enter todo reminder date.'),
});

export {reminderValidationSchema};