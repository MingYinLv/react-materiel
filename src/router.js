import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import MainLayout from './Layout/MainLayout';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route
        exact
        component={MainLayout}
      />
    </Router>
  );
}

export default RouterConfig;
