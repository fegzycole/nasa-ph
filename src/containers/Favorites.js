import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import FavoriteCard from '../components/FavoriteCard';
import favoritesStyles from '../styles/favorites.module.scss';
import Button from '../components/Button';
import { removeFavorites } from '../redux/actions/pictures';
import FavoritesNotFound from '../components/FavoritesNotFound';

const Favorites = ({ pictures, history, removeFavorites }) => {
  const favoritePics = pictures.filter(pic => pic.favorite === true);

  const showFavorite = date => history.push(`/favorite/${date}`);

  const redirectHome = () => {
    history.push('/');
  };

  const removeAllFavorites = () => {
    removeFavorites();
    redirectHome();
  };

  return (
    <div className={favoritesStyles.favoritesContainer}>
      {favoritePics.length > 0 ? (
        <div>
          <div className={favoritesStyles.group}>
            <h3 className={favoritesStyles.groupHeader}>My Favorites</h3>
            <Button
              text="Clear All"
              color="red"
              handleClick={removeAllFavorites}
            />
          </div>
          <div className={favoritesStyles.favorites}>
            {favoritePics.map(pic => (
              <FavoriteCard
                key={`${Math.random()}-${Math.random()}`}
                title={pic.title}
                imageUrl={pic.url}
                handleClick={() => showFavorite(pic.date)}
              />
            ))}
          </div>
        </div>
      ) : (
        <FavoritesNotFound
          handleClick={redirectHome}
          text="You have no favorites yet"
        />
      )}
    </div>
  );
};

const mapStateToProps = ({ pictures }) => ({
  pictures,
});

const mapDispatchToProps = dispatch => ({
  removeFavorites: () => dispatch(removeFavorites()),
});

Favorites.propTypes = {
  pictures: PropTypes.instanceOf(Array).isRequired,
  history: PropTypes.instanceOf(Object).isRequired,
  removeFavorites: PropTypes.func.isRequired,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Favorites));
