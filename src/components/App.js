import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Header from './Header';
import Home from '../containers/Home';
import appStyles from '../styles/app.module.scss';

function App() {
  return (
    <div className={appStyles.app}>
      <Header />

      <Switch>
        <Route path="/" component={Home} />
      </Switch>
    </div>
  );
}

export default App;
