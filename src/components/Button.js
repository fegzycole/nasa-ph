import React from 'react';
import PropTypes from 'prop-types';

import buttonStyles from '../styles/button.module.scss';

const Button = ({ text, handleClick, color }) => (
  <button
    type="button"
    style={{ backgroundColor: color }}
    onClick={handleClick}
    className={buttonStyles.button}
  >
    {text}
  </button>
);

Button.propTypes = {
  text: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  color: PropTypes.string.isRequired,
};

export default Button;
