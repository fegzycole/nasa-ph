import actions from '../actions/index';

const myFavorites = JSON.parse(localStorage.getItem('favorites'));

const favorites = (state = myFavorites || [], { type, payload }) => {
  switch (type) {
    case actions.ADD_FAVORITE:
      return payload;

    default:
      return state;
  }
};

export default favorites;
