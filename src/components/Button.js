import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ text, handleClick, color }) => (
  <button
    type="button"
    style={{ backgroundColor: color }}
    onClick={handleClick}
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
