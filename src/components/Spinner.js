import React from 'react';
import PropTypes from 'prop-types';

import SpinnerStyles from '../styles/spinner.module.scss';

const Spinner = ({ addOverlay }) => (
  <div
    className={SpinnerStyles.Overlay}
    style={{ backgroundColor: addOverlay ? 'rgba(0,0,0,0.5)' : null }}
  >
    <div className={SpinnerStyles.Spinner} />
  </div>
);

Spinner.propTypes = {
  addOverlay: PropTypes.bool,
};

Spinner.defaultProps = {
  addOverlay: false,
};

export default Spinner;
