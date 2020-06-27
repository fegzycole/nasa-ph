import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from './Header';
import Home from '../containers/Home';
import Favorites from '../containers/Favorites';
import Favorite from '../containers/Favorite';
import appStyles from '../styles/app.module.scss';

function App({ pictures }) {
  const picture = pictures.find(pic => pic.favorite === true);

  return (
    <div className={appStyles.app}>
      {
        picture ? <Header /> : null
      }

      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/favorites" exact component={Favorites} />
        <Route path="/favorite/:date" exact component={Favorite} />
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
