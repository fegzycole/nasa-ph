import actions from '../actions/index';

const spinner = (state = null, { type, payload }) => {
  switch (type) {
    case actions.ADD_ERROR:
      return payload;

    default:
      return state;
  }
};

export default spinner;
