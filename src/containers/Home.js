import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Arrow from '../components/Arrow';
import Spinner from '../components/Spinner';
import Info from '../components/Info';
import homeStyles from '../styles/home.module.scss';
import updateDate from '../redux/actions/date';
import { getPicture, toggleFavorite } from '../redux/actions/pictures';
import {
  getPrevDate, getNextDate, getNormalizedDate,
} from '../helpers/index';

const Home = ({
  spinner, getPicture, date, pictures, updateDate, error, toggleFavorite,
}) => {
  const getCurrPicture = (picDate = date) => {
    const selectedDate = pictures.find(pic => pic.date === picDate);

    if (!selectedDate) {
      getPicture(picDate);
    }
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

  const picture = pictures.find(pic => pic.date === date);

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
          <div>
            {
              picture ? (
                <Info
                  title={picture.title}
                  description={picture.explanation}
                  imageUrl={picture.url}
                  btnClolor={picture.favorite ? 'red' : '#b480f3'}
                  handleClick={() => toggleFavorite(picture)}
                  handleSelect={e => getSelectedDate(e.target.value)}
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
  spinner, pictures, date, error,
}) => ({
  spinner,
  date,
  pictures,
  error,
});

const mapDispatchToProps = dispatch => ({
  getPicture: date => dispatch(getPicture(date)),
  updateDate: date => dispatch(updateDate(date)),
  toggleFavorite: picture => dispatch(toggleFavorite(picture)),
});

Home.propTypes = {
  spinner: PropTypes.bool.isRequired,
  getPicture: PropTypes.func.isRequired,
  date: PropTypes.string.isRequired,
  pictures: PropTypes.instanceOf(Object).isRequired,
  updateDate: PropTypes.func.isRequired,
  error: PropTypes.string,
  toggleFavorite: PropTypes.func,
};

Home.defaultProps = {
  error: null,
  toggleFavorite: () => null,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
