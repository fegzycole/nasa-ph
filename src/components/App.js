import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from '../containers/Home';
import Favorites from '../containers/Favorites';
import Favorite from '../containers/Favorite';
import Signup from '../containers/Signup';
import Signin from '../containers/Signin';
import Header from './Header';
import appStyles from '../styles/app.module.scss';

function App() {
  return (
    <div className={appStyles.app}>
      <Header />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/favorites" exact component={Favorites} />
        <Route path="/favorite/:date" exact component={Favorite} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/signin" exact component={Signin} />
      </Switch>
    </div>
  );
}

export default App;
