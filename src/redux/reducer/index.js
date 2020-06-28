import { combineReducers } from 'redux';

import date from './date';
import spinner from './spinner';
import picture from './pictures';
import error from './error';
import favorites from './favorites';
import user from './user';

const rootReducer = combineReducers({
  date,
  spinner,
  picture,
  error,
  favorites,
  user,
});

export default (state, action) => rootReducer(action.type === 'LOGOUT' ? undefined : state, action);
