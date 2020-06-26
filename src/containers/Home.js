import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Arrow from '../components/Arrow';
import Spinner from '../components/Spinner';
import Info from '../components/Info';
import updateDate from '../redux/actions/date';
import toggleSpinner from '../redux/actions/spinner';
import { getPicture } from '../redux/actions/pictures';
import {
  getPrevDate, getNextDate, toggleFavorite, getNormalizedDate,
} from '../helpers/index';

const Home = ({
  spinner, getPicture, date, pictures, updateDate, toggleSpinner,
}) => {
  const getCurrPicture = (picDate = date) => {
    const selectedDate = pictures.find(pic => pic.date === picDate);

    if (!selectedDate) {
      return getPicture(picDate);
    }

    return toggleSpinner();
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
    <div>
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
          <Info
            title={picture.title}
            description={picture.explanation}
            imageUrl={picture.url}
            btnClolor={picture.favorite ? 'red' : '#b480f3'}
            handleClick={toggleFavorite}
            handleSelect={e => getSelectedDate(e.target.value)}
          />
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ spinner, pictures, date }) => ({
  spinner,
  date,
  pictures,
});

const mapDispatchToProps = dispatch => ({
  getPicture: date => dispatch(getPicture(date)),
  updateDate: date => dispatch(updateDate(date)),
  toggleSpinner: () => dispatch(toggleSpinner()),
});

Home.propTypes = {
  spinner: PropTypes.bool.isRequired,
  getPicture: PropTypes.func.isRequired,
  date: PropTypes.string.isRequired,
  pictures: PropTypes.instanceOf(Object).isRequired,
  updateDate: PropTypes.func.isRequired,
  toggleSpinner: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
