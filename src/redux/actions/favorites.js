import actions from './index';

export const addFavorite = payload => ({
  type: actions.ADD_FAVORITE,
  payload,
});

export const removeFavorite = payload => ({
  type: actions.REMOVE_FAVORITE,
  payload,
});

export const clearFavorites = () => ({
  type: actions.CLEAR_FAVORITES,
});

export const addToFavorite = picture => dispatch => {
  let favorites = JSON.parse(localStorage.getItem('favorites'));

  if (favorites) {
    favorites = favorites.concat([picture]);
  } else {
    favorites = [picture];
  }

  dispatch(addFavorite(picture));

  favorites = JSON.stringify(favorites);

  localStorage.setItem('favorites', favorites);
};

export const removeFromFavorites = ({ date }) => dispatch => {
  let favorites = JSON.parse(localStorage.getItem('favorites'));

  favorites = favorites.filter(pic => pic.date !== date);

  dispatch(removeFavorite(date));

  favorites = JSON.stringify(favorites);

  localStorage.setItem('favorites', favorites);
};

export const removeFavorites = () => dispatch => {
  localStorage.removeItem('favorites');

  dispatch(clearFavorites());
};
