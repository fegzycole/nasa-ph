import React from 'react';

import SpinnerStyles from '../styles/spinner.module.scss';

const Spinner = () => (
  <div className={SpinnerStyles.Overlay}>
    <div className={SpinnerStyles.Spinner} />
  </div>
);

export default Spinner;
