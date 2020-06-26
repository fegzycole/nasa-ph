import actions from '../actions/index';
import { getTodayDate } from '../../helpers/index';

const date = (state = getTodayDate(), { type, payload }) => {
  switch (type) {
    case actions.ADD_DATE:
      return payload;

    default:
      return state;
  }
};

export default date;
