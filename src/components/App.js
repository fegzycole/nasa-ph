import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Header from './Header';
import Home from '../containers/Home';

function App() {
  return (
    <div className="App">
      <Header />

      <Switch>
        <Route path="/" component={Home} />
      </Switch>
    </div>
  );
}

export default App;
