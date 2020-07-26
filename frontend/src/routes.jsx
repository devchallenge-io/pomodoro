import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

// Pages
import Config from './pages/config';
import Timer from './pages/timer';

export default function Routes() {
  return (
    <BrowserRouter basename="/" forceRefresh={false}>
      <Switch>
        <Route path="/" exact component={Timer} />
        <Route path="/config" exact component={Config} />
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
};