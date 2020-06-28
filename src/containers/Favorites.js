import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import FavoriteCard from '../components/FavoriteCard';
import favoritesStyles from '../styles/favorites.module.scss';
import Button from '../components/Button';
import { removeFavorites, loadFavorites } from '../redux/actions/favorites';
import FavoritesNotFound from '../components/FavoritesNotFound';
import Spinner from '../components/Spinner';

const Favorites = ({
  favorites,
  history,
  removeFavorites,
  spinner,
  user,
  loadFavorites,
}) => {
  const showFavorite = date => history.push(`/favorite/${date}`);

  const redirectHome = () => {
    history.push('/');
  };

  const removeAllFavorites = () => {
    removeFavorites();
  };

  const initialize = () => {
    if (!user.email) {
      history.push('/signin');
    }

    loadFavorites();
  };

  useEffect(initialize, []);

  return (
    <div className={favoritesStyles.favoritesContainer}>
      {
        spinner ? <Spinner /> : (
          <>
            {favorites.length > 0 ? (
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
                  {favorites.map(pic => (
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
          </>
        )
      }
    </div>
  );
};

const mapStateToProps = ({ favorites, spinner, user }) => ({
  favorites,
  spinner,
  user,
});

const mapDispatchToProps = dispatch => ({
  removeFavorites: () => dispatch(removeFavorites()),
  loadFavorites: () => dispatch(loadFavorites()),
});

Favorites.propTypes = {
  favorites: PropTypes.instanceOf(Array).isRequired,
  history: PropTypes.instanceOf(Object).isRequired,
  removeFavorites: PropTypes.func.isRequired,
  spinner: PropTypes.bool.isRequired,
  user: PropTypes.instanceOf(Object).isRequired,
  loadFavorites: PropTypes.func.isRequired,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Favorites));
