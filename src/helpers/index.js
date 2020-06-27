import moment from 'moment';

export const getTodayDate = () => {
  const today = new Date();
  return moment(today).format('YYYY-MM-DD');
};

export const getNormalizedDate = date => moment(date).format('YYYY-MM-DD');

export const getPrevDate = date => moment(date).subtract(1).format('YYYY-MM-DD');

export const getNextDate = date => moment(date).add(1, 'day').format('YYYY-MM-DD');
