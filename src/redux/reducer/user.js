import actions from '../actions/index';

const user = JSON.parse(localStorage.getItem('user'));

const userReducer = (state = user || {}, { type, payload }) => {
  switch (type) {
    case actions.SET_USER:
      return payload;

    default:
      return state;
  }
};

export default userReducer;
