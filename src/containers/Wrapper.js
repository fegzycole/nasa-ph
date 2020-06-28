import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import setUserStatus from '../redux/actions/user';
import Header from '../components/Header';

const Wrapper = ({
  favorites,
  children,
}) => (
  <div>
    {
        favorites.length > 0 ? <Header /> : null
      }
    <div>
      {children}
    </div>
  </div>
);

const mapStateToProps = ({ favorites }) => ({
  favorites,
});

const mapDispatchToProps = dispatch => ({
  setUserStatus: payload => dispatch(setUserStatus(payload)),
});

Wrapper.propTypes = {
  favorites: PropTypes.instanceOf(Array).isRequired,
  children: PropTypes.node.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wrapper);
