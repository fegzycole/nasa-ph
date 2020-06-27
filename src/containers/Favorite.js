import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import Info from '../components/Info';
import FavoriteNotFound from '../components/FavoritesNotFound';
import favoriteStyles from '../styles/favorites.module.scss';
import { removeFromFavorites } from '../redux/actions/favorites';

const Favorite = ({
  match, favorites, removeFromFavorites, history,
}) => {
  const {
    params: { date },
  } = match;

  const picture = favorites.find(pic => pic.date === date);

  const deleteFromFavorites = () => {
    removeFromFavorites(picture);
    history.push('/favorites');
  };

  const redirectHome = () => {
    history.push('/');
  };

  return (
    <div className={favoriteStyles.favoritesContainer}>
      {
        picture ? (
          <Info
            title={picture.title}
            description={picture.explanation}
            imageUrl={picture.url}
            btnClolor="red"
            text={picture.favorite ? 'Remove Favorite' : 'Set Favorite'}
            handleClick={deleteFromFavorites}
          />
        ) : (
          <FavoriteNotFound
            text="No favorite with the specified date exists"
            handleClick={redirectHome}
          />
        )
      }
    </div>
  );
};

const mapStateToProps = ({ favorites }) => ({
  favorites,
});

const mapDispatchToProps = dispatch => ({
  removeFromFavorites: picture => dispatch(removeFromFavorites(picture)),
});

Favorite.propTypes = {
  match: PropTypes.instanceOf(Object).isRequired,
  favorites: PropTypes.instanceOf(Array).isRequired,
  removeFromFavorites: PropTypes.func.isRequired,
  history: PropTypes.instanceOf(Object).isRequired,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Favorite));
