import React from 'react';
import PropTypes from 'prop-types';
import favoriteCardStyles from '../styles/favoritecard.module.scss';

const FavoriteCard = ({ imageUrl, title, handleClick }) => (
  <div
    onClick={handleClick}
    onKeyPress={handleClick}
    role="button"
    tabIndex={0}
    className={favoriteCardStyles.favorite}
  >
    <img
      src={imageUrl}
      alt=""
      className={favoriteCardStyles.favoriteImg}
    />
    <h6
      className={favoriteCardStyles.favoriteTitle}
    >
      {title}
    </h6>
  </div>
);

FavoriteCard.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default FavoriteCard;
