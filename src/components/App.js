import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from './Header';
import Home from '../containers/Home';
import appStyles from '../styles/app.module.scss';

function App({ pictures }) {
  const picture = pictures.find(pic => pic.favorite === true);

  return (
    <div className={appStyles.app}>
      {
        picture ? <Header /> : null
      }

      <Switch>
        <Route path="/" component={Home} />
      </Switch>
    </div>
  );
}

const mapStateToProps = ({ pictures }) => ({
  pictures,
});

App.propTypes = {
  pictures: PropTypes.instanceOf(Array).isRequired,
};

export default connect(mapStateToProps)(App);
