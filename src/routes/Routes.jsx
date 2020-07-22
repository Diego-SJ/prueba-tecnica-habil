import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from '../components/views/Home';
import Detail from '../components/views/Detail';

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/detail/:id' component={Detail} />
      </Switch>
    </Router>
  );
}
