import actions from '../actions/index';

const date = (state = {}, { type, payload }) => {
  switch (type) {
    case actions.ADD_PICTURE:
      return payload;

    default:
      return state;
  }
};

export default date;
