import { combineReducers } from 'redux';

import date from './date';
import spinner from './spinner';
import pictures from './pictures';
import error from './error';

export default combineReducers({
  date,
  spinner,
  pictures,
  error,
});
