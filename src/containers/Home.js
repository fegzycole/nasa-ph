import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Arrow from '../components/Arrow';
import Spinner from '../components/Spinner';
import Info from '../components/Info';
import homeStyles from '../styles/home.module.scss';
import updateDate from '../redux/actions/date';
import { getPicture } from '../redux/actions/pictures';
import { addToFavorite, removeFromFavorites } from '../redux/actions/favorites';
import {
  getPrevDate, getNextDate, getNormalizedDate,
} from '../helpers/index';

const Home = ({
  spinner,
  getPicture,
  date,
  picture,
  updateDate,
  error,
  favorites,
  addToFavorite,
  removeFromFavorites,
}) => {
  const getCurrPicture = (picDate = date) => {
    getPicture(picDate);
  };

  const initialize = () => {
    getCurrPicture();
  };

  const handlePrevClick = () => {
    const newDate = getPrevDate(date);
    updateDate(newDate);
    getCurrPicture(newDate);
  };

  const handleNextClick = () => {
    const newDate = getNextDate(date);
    updateDate(newDate);
    getCurrPicture(newDate);
  };

  const getSelectedDate = date => {
    const selectedDate = getNormalizedDate(date);
    updateDate(selectedDate);
    getCurrPicture(selectedDate);
  };

  useEffect(initialize, []);

  const isFavorite = favorites.find(pic => pic.date === picture.date);

  return (
    <div className={homeStyles.home}>
      <Arrow
        innerClassName="fas fa-chevron-left"
        outerClassName="left"
        handleClick={handlePrevClick}
      />
      <Arrow
        innerClassName="fas fa-chevron-right"
        outerClassName="right"
        handleClick={handleNextClick}
      />
      <div>
        { spinner ? <Spinner /> : (
          <div className={homeStyles.infoContainer}>
            {
              picture ? (
                <Info
                  title={picture.title}
                  description={picture.explanation}
                  imageUrl={picture.url}
                  btnClolor={isFavorite ? 'red' : '#b480f3'}
                  text={picture.favorite ? 'Remove Favorite' : 'Set Favorite'}

                  handleClick={() => (isFavorite
                    ? removeFromFavorites(picture)
                    : addToFavorite(picture))}

                  handleSelect={e => getSelectedDate(e)}
                  dateValue={date}
                  showDate
                />
              ) : <p className={homeStyles.error}>{error}</p>
            }
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({
  spinner, picture, date, error, favorites,
}) => ({
  spinner,
  date,
  picture,
  error,
  favorites,
});

const mapDispatchToProps = dispatch => ({
  getPicture: date => dispatch(getPicture(date)),
  updateDate: date => dispatch(updateDate(date)),
  addToFavorite: picture => dispatch(addToFavorite(picture)),
  removeFromFavorites: picture => dispatch(removeFromFavorites(picture)),
});

Home.propTypes = {
  spinner: PropTypes.bool.isRequired,
  getPicture: PropTypes.func.isRequired,
  date: PropTypes.string.isRequired,
  picture: PropTypes.instanceOf(Object).isRequired,
  updateDate: PropTypes.func.isRequired,
  error: PropTypes.string,
  favorites: PropTypes.instanceOf(Array).isRequired,
  addToFavorite: PropTypes.func.isRequired,
  removeFromFavorites: PropTypes.func.isRequired,
};

Home.defaultProps = {
  error: null,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
