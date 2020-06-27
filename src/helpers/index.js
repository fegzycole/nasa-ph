import moment from 'moment';

export const getTodayDate = () => {
  const today = new Date();
  return moment(today).format('YYYY-MM-DD');
};

export const getNormalizedDate = date => moment(date).format('YYYY-MM-DD');

export const getPrevDate = date => moment(date).subtract(1).format('YYYY-MM-DD');

export const getNextDate = date => moment(date).add(1, 'day').format('YYYY-MM-DD');

export const toggleFavorite = ({ date, favorite }) => {
  let picturesOfTheDay = JSON.parse(localStorage.getItem('picturesOfTheDay'));

  if (favorite) {
    picturesOfTheDay = picturesOfTheDay.map(picture => {
      const pic = picture;

      if (picture.date === date) {
        delete pic.favorite;
      }

      return picture;
    });
  } else {
    picturesOfTheDay = picturesOfTheDay.map(picture => {
      if (picture.date === date) {
        return { ...picture, favorite: true };
      }

      return picture;
    });
  }

  picturesOfTheDay = JSON.stringify(picturesOfTheDay);

  localStorage.setItem('picturesOfTheDay', picturesOfTheDay);
};
