import React from 'react';
import PropTypes from 'prop-types';

import FormInput from './FormInput';
import NasaLogo from '../images/nasa.png';
import formStyles from '../styles/form.module.scss';

const Form = ({
  email,
  password,
  handleEmailChange,
  handlePasswordChange,
  handleSubmit,
  submitBtnText,
  headerText,
  showExtraPassword,
  confirmPassword,
  handlePasswordConfirmationChange,
  error,
}) => (
  <>
    <div className={formStyles.formContainer}>
      <img src={NasaLogo} alt="" className={formStyles.logo} />
      <form onSubmit={handleSubmit} className={formStyles.form} data-testid="form">
        <h1 className={formStyles.header}>{headerText}</h1>
        <FormInput
          name="email"
          type="email"
          value={email}
          handleChange={handleEmailChange}
          labelText="Email"
          placeholderText="Enter Email"
        />
        <FormInput
          name="password"
          type="password"
          value={password}
          handleChange={handlePasswordChange}
          labelText="Password"
          placeholderText="Enter Password"
        />
        {
          showExtraPassword ? (
            <FormInput
              name="confirmPassword"
              type="password"
              value={confirmPassword}
              handleChange={handlePasswordConfirmationChange}
              labelText="Confirm Password"
              placeholderText="Enter Password Confirmation"
            />
          ) : null
        }

        <input type="submit" value={submitBtnText} className={formStyles.btn} />

        <p className={formStyles.error}>{error}</p>
      </form>
    </div>
  </>
);

Form.propTypes = {
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  handleEmailChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitBtnText: PropTypes.string.isRequired,
  headerText: PropTypes.string.isRequired,
  showExtraPassword: PropTypes.bool,
  confirmPassword: PropTypes.string,
  handlePasswordConfirmationChange: PropTypes.func,
  error: PropTypes.string,
};

Form.defaultProps = {
  showExtraPassword: false,
  confirmPassword: null,
  handlePasswordConfirmationChange: () => null,
  error: null,
};

export default Form;
