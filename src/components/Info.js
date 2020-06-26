import React from 'react';
import PropTypes from 'prop-types';

import Button from './Button';
import infoStyles from '../styles/info.module.scss';

const Info = ({
  title,
  imageUrl,
  description,
  handleClick,
  handleSelect,
  btnClolor,
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
        text="Set Favorite"
        handleClick={handleClick}
        color={btnClolor}
      />
      <input
        type="date"
        onChange={handleSelect}
        className={infoStyles.date}
      />
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
};

Info.defaultProps = {
  title: null,
  imageUrl: null,
  description: null,
  handleClick: () => null,
  handleSelect: () => null,
};

export default Info;
