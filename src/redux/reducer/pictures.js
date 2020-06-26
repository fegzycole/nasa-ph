import actions from '../actions/index';

const picturesOfTheDay = JSON.parse(localStorage.getItem('picturesOfTheDay'));

const date = (state = picturesOfTheDay || [], { type, payload }) => {
  switch (type) {
    case actions.ADD_PICTURE:
      return [...state, payload];

    default:
      return state;
  }
};

export default date;
