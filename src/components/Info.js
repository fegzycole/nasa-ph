import React from 'react';
import PropTypes from 'prop-types';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

import Button from './Button';
import infoStyles from '../styles/info.module.scss';

const Info = ({
  title,
  imageUrl,
  description,
  handleClick,
  handleSelect,
  btnClolor,
  showDate,
  text,
  dateValue,
}) => (
  <div className={infoStyles.info}>
    <h3
      className={infoStyles.title}
    >
      {title}
    </h3>
    <img
      src={imageUrl}
      alt={title}
      className={infoStyles.potd}
    />
    <div className={infoStyles.infoGroup}>
      <Button
        text={text}
        handleClick={handleClick}
        color={btnClolor}
      />
      {
        showDate ? (
          <DayPickerInput onDayChange={handleSelect} value={dateValue} />
        ) : null
      }
    </div>
    <p className={infoStyles.description}>{description}</p>
  </div>
);

Info.propTypes = {
  title: PropTypes.string,
  imageUrl: PropTypes.string,
  description: PropTypes.string,
  handleClick: PropTypes.func,
  handleSelect: PropTypes.func,
  btnClolor: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  showDate: PropTypes.bool,
  dateValue: PropTypes.string,
};

Info.defaultProps = {
  title: null,
  imageUrl: null,
  description: null,
  handleClick: () => null,
  handleSelect: () => null,
  showDate: false,
  dateValue: null,
};

export default Info;
