import React from 'react';
import PropTypes from 'prop-types';

import '../styles/arrow.scss';

const Arrow = ({ outerClassName, innerClassName, handleClick }) => (
  <div
    className={outerClassName}
    onClick={handleClick}
    onKeyPress={handleClick}
    role="button"
    tabIndex={0}
  >
    <i className={innerClassName} />
  </div>
);

Arrow.propTypes = {
  outerClassName: PropTypes.string.isRequired,
  innerClassName: PropTypes.string.isRequired,
  handleClick: PropTypes.func,
};

Arrow.defaultProps = {
  handleClick: () => null,
};

export default Arrow;
