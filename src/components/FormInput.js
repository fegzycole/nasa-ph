import React from 'react';
import PropTypes from 'prop-types';

import formInputStyles from '../styles/forminput.module.scss';

const FormInput = ({
  type,
  labelText,
  name,
  value,
  handleChange,
  placeholderText,
}) => (
  <div className={formInputStyles.forminput}>
    <p className={formInputStyles.text}>{labelText}</p>
    <input
      type={type}
      name={name}
      value={value}
      data-testid={name}
      onChange={handleChange}
      placeholder={placeholderText}
      required
      className={formInputStyles.input}
    />
  </div>
);

FormInput.propTypes = {
  type: PropTypes.string.isRequired,
  labelText: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  placeholderText: PropTypes.string.isRequired,
};

export default FormInput;
