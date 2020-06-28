import actions from '../actions/index';

const user = (state = null, { type, payload }) => {
  switch (type) {
    case actions.SET_USER:
      return payload;

    default:
      return state;
  }
};

export default user;
