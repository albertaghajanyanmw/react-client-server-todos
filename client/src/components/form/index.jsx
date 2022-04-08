import React, { memo } from 'react';
import PropTypes from 'prop-types';

import CustomFormItem from '../formItem';

const CustomForm = ({ inputs, formik }) => {
  return (
    <>
      {inputs.map((input) => (
        <CustomFormItem key={input.id} input={input} formik={formik} />
      ))}
    </>
  );
};

export default memo(CustomForm);

CustomForm.propTypes = {
  inputs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      variant: PropTypes.string.isRequired,
      icon: PropTypes.node,
    })
  ),
  formik: PropTypes.shape({
    // TODO
  }).isRequired,
};

CustomFormItem.defaultProps = {
  inputs: [],
};
