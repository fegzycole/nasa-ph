import actions from '../actions/index';

const spinner = (state = true, { type }) => {
  switch (type) {
    case actions.TOGGLE_SPINNER:
      return !state;

    default:
      return state;
  }
};

export default spinner;
