import CircularJSON from 'circular-json';

import { firestore } from '../../firebase/firebase.util';
import actions from './index';
import toggleSpinner from './spinner';
import setError from './error';

export const addFavorite = payload => ({
  type: actions.ADD_FAVORITE,
  payload,
});

export const getFavorites = () => async dispatch => {
  let favorites = JSON.parse(localStorage.getItem('favorites'));

  const user = JSON.parse(localStorage.getItem('user'));

  const userRef = firestore.doc(`users/${user.uid}`);

  const response = [];
  try {
    favorites = await firestore.collection('favorites').where('user', '==', userRef).get();

    favorites.forEach(doc => {
      response.push({ ...doc.data(), id: doc.id });
    });
  } catch (error) {
    dispatch(setError(error.message));
  }

  dispatch(addFavorite(response));

  favorites = CircularJSON.stringify(response);

  localStorage.setItem('favorites', favorites);
};

export const loadFavorites = () => async dispatch => {
  try {
    dispatch(toggleSpinner());
    dispatch(getFavorites());
  } catch (error) {
    dispatch(setError(error.message));
  }

  dispatch(toggleSpinner());
};

export const addToFavorite = picture => async dispatch => {
  const user = JSON.parse(localStorage.getItem('user'));

  const userRef = firestore.doc(`users/${user.uid}`);
  try {
    await dispatch(toggleSpinner());

    await firestore.collection('favorites').add({
      ...picture,
      user: userRef,
    });

    await dispatch(getFavorites());
  } catch (error) {
    dispatch(setError(error.message));
  }

  dispatch(toggleSpinner());
};

export const removeFromFavorites = ({ id }) => async dispatch => {
  try {
    dispatch(toggleSpinner());

    await firestore.collection('favorites').doc(id).delete();

    await dispatch(getFavorites());
  } catch (error) {
    dispatch(setError(error.message));
  }

  dispatch(toggleSpinner());
};

export const removeFavorites = () => async dispatch => {
  const favorites = JSON.parse(localStorage.getItem('favorites'));
  try {
    await dispatch(toggleSpinner());

    await favorites.forEach(async ({ id }) => {
      await firestore.collection('favorites').doc(id).delete();
    });
  } catch (error) {
    await dispatch(setError(error.message));
  }

  await dispatch(getFavorites());

  dispatch(toggleSpinner());

  await dispatch(addFavorite([]));

  return undefined;
};
