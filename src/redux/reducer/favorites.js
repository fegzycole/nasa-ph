import actions from '../actions/index';

const myFavorites = JSON.parse(localStorage.getItem('favorites'));

const favorites = (state = myFavorites || [], { type, payload }) => {
  switch (type) {
    case actions.ADD_FAVORITE:
      return [...state, payload];

    case actions.REMOVE_FAVORITE:
      return state.filter(picture => picture.date !== payload);

    case actions.CLEAR_FAVORITES:
      return [];

    default:
      return state;
  }
};

export default favorites;
