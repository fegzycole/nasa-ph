import axios from 'axios';

import toggleSpinner from './spinner';
import addError from './error';
import actions from './index';

const { REACT_APP_API_KEY } = process.env;

export const addPicture = payload => ({
  type: actions.ADD_PICTURE,
  payload,
});

export const getPicture = date => async dispatch => {
  let picturesOfTheDay = JSON.parse(localStorage.getItem('picturesOfTheDay'));

  try {
    dispatch(addError(null));

    dispatch(toggleSpinner());

    const { data } = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=${REACT_APP_API_KEY}&date=${date}`);

    dispatch(addPicture(data));

    dispatch(toggleSpinner());

    if (!picturesOfTheDay) {
      picturesOfTheDay = [data];
    } else {
      picturesOfTheDay = [...picturesOfTheDay, data];
    }

    picturesOfTheDay = JSON.stringify(picturesOfTheDay);

    localStorage.setItem('picturesOfTheDay', picturesOfTheDay);

    return null;
  } catch (error) {
    const { response, message } = error;

    if (!response) {
      dispatch(addError(message));
    } else {
      const { data: { msg } } = response;
      dispatch(addError(msg));
    }
    dispatch(toggleSpinner());

    return null;
  }
};

export const addFavorite = payload => ({
  type: actions.ADD_FAVORITE,
  payload,
});

export const removeFavorite = payload => ({
  type: actions.REMOVE_FAVORITE,
  payload,
});

export const toggleFavorite = ({ date, favorite }) => dispatch => {
  let picturesOfTheDay = JSON.parse(localStorage.getItem('picturesOfTheDay'));

  if (favorite) {
    picturesOfTheDay = picturesOfTheDay.map(picture => {
      const pic = picture;

      if (picture.date === date) {
        delete pic.favorite;
      }

      return picture;
    });

    dispatch(removeFavorite(date));
  } else {
    picturesOfTheDay = picturesOfTheDay.map(picture => {
      if (picture.date === date) {
        return { ...picture, favorite: true };
      }

      return picture;
    });

    dispatch(addFavorite(date));
  }

  picturesOfTheDay = JSON.stringify(picturesOfTheDay);

  localStorage.setItem('picturesOfTheDay', picturesOfTheDay);
};
