import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import Info from '../components/Info';
import FavoriteNotFound from '../components/FavoritesNotFound';
import { toggleFavorite } from '../redux/actions/pictures';

const Favorite = ({
  match, pictures, toggleFavorite, history,
}) => {
  const {
    params: { date },
  } = match;

  const picture = pictures.find(pic => pic.date === date);

  const removeFromFavorites = () => {
    toggleFavorite(picture);
    history.push('/favorites');
  };

  const redirectHome = () => {
    history.push('/');
  };

  return (
    <div>
      {
        picture && picture.favorite ? (
          <Info
            title={picture.title}
            description={picture.explanation}
            imageUrl={picture.url}
            btnClolor={picture.favorite ? 'red' : '#b480f3'}
            text={picture.favorite ? 'Remove Favorite' : 'Set Favorite'}
            handleClick={removeFromFavorites}
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

const mapStateToProps = ({ pictures }) => ({
  pictures,
});

const mapDispatchToProps = dispatch => ({
  toggleFavorite: picture => dispatch(toggleFavorite(picture)),
});

Favorite.propTypes = {
  match: PropTypes.instanceOf(Object).isRequired,
  pictures: PropTypes.instanceOf(Array).isRequired,
  toggleFavorite: PropTypes.func.isRequired,
  history: PropTypes.instanceOf(Object).isRequired,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Favorite));
