import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Arrow from '../components/Arrow';
import Spinner from '../components/Spinner';
import Info from '../components/Info';
import { getPicture } from '../redux/actions/pictures';
import {
  getPrevDate, getNextDate, toggleFavorite, getNormalizedDate,
} from '../helpers/index';
import updateDate from '../redux/actions/date';

const Home = ({
  spinner, getPicture, date, pictures, updateDate,
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

  useEffect(initialize, [pictures]);

  const picture = pictures.find(picture => picture.date === date);

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
            imageUrl={picture.hdurl}
            btnClolor={picture.favorite ? 'red' : '#b480f3'}
            handleClick={toggleFavorite}
            handleSelect={e => getSelectedDate(e.target.value)}
          />
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ spinner, date, pictures }) => ({
  spinner,
  date,
  pictures,
});

const mapDispatchToProps = dispatch => ({
  getPicture: date => dispatch(getPicture(date)),
  updateDate: date => dispatch(updateDate(date)),
});

Home.propTypes = {
  spinner: PropTypes.bool.isRequired,
  getPicture: PropTypes.func,
  date: PropTypes.string.isRequired,
  pictures: PropTypes.instanceOf(Object).isRequired,
  updateDate: PropTypes.func,
};

Home.defaultProps = {
  getPicture: () => null,
  updateDate: () => null,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
