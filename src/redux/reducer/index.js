import { combineReducers } from 'redux';

import date from './date';
import spinner from './spinner';
import picture from './pictures';
import error from './error';
import favorites from './favorites';
import user from './user';

export default combineReducers({
  date,
  spinner,
  picture,
  error,
  favorites,
  user,
});
