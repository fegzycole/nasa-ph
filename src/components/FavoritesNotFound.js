import React from 'react';
import PropTypes from 'prop-types';

import Button from './Button';
import favoriteNotFoundStyles from '../styles/favnotfound.module.scss';

const FavoritesNotFound = ({ handleClick, text }) => (
  <div className={favoriteNotFoundStyles.favNotFound}>
    <p
      className={favoriteNotFoundStyles.text}
    >
      {text}
    </p>
    <Button
      text="Return Home"
      color="#a27bd3"
      handleClick={handleClick}
    />
  </div>
);

FavoritesNotFound.propTypes = {
  handleClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

export default FavoritesNotFound;
