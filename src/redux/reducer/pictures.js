import actions from '../actions/index';

const picturesOfTheDay = JSON.parse(localStorage.getItem('picturesOfTheDay'));

const date = (state = picturesOfTheDay || [], { type, payload }) => {
  switch (type) {
    case actions.ADD_PICTURE:
      return [...state, payload];

    case actions.REMOVE_FAVORITE:
      return state.map(picture => {
        const pic = picture;

        if (picture.date === payload) {
          delete pic.favorite;
        }

        return picture;
      });

    case actions.CLEAR_FAVORITES:
      return state.map(picture => {
        const pic = picture;

        if (picture.favorite) {
          delete pic.favorite;
        }

        return picture;
      });

    case actions.ADD_FAVORITE:
      return state.map(picture => {
        if (picture.date === payload) {
          return { ...picture, favorite: true };
        }

        return picture;
      });

    default:
      return state;
  }
};

export default date;
