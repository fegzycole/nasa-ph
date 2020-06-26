export const getTodayDate = () => {
  const today = new Date();
  return `${today.getFullYear()}-${
    today.getMonth() + 1 < 10
      ? `0${today.getMonth() + 1}`
      : today.getMonth() + 1
  }-${today.getDate()}`;
};

export const getNormalizedDate = date => {
  const selectedDate = new Date(date);
  return `${selectedDate.getFullYear()}-${
    selectedDate.getMonth() + 1 < 10
      ? `0${selectedDate.getMonth() + 1}`
      : selectedDate.getMonth() + 1
  }-${selectedDate.getDate()}`;
};

export const getPrevDate = date => {
  let prevDate = new Date(date);
  prevDate = prevDate.setDate(prevDate.getDate() - 1);
  return `${prevDate.getFullYear()}-${
    prevDate.getMonth() + 1 < 10
      ? `0${prevDate.getMonth() + 1}`
      : prevDate.getMonth() + 1
  }-${prevDate.getDate()}`;
};

export const getNextDate = date => {
  let nextDate = new Date(date);
  nextDate = nextDate.setDate(nextDate.getDate() + 1);
  return `${nextDate.getFullYear()}-${
    nextDate.getMonth() + 1 < 10
      ? `0${nextDate.getMonth() + 1}`
      : nextDate.getMonth() + 1
  }-${nextDate.getDate()}`;
};

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
