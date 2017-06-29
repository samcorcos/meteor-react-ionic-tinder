
// import { IndexRoute, Route } from 'react-router';
// import { ReactRouterSSR } from 'react-router-ssr';

import React, { Component } from 'react';
import ReactRouter, { Route, IndexRoute, NotFoundRoute, DefaultRoute } from 'react-router';

import { ReactRouterSSR } from 'meteor/reactrouter:react-router-ssr';

import AppBody from '../components/AppBody';
import HomeContainer from '../components/HomeContainer';
import OtherContainer from '../components/OtherContainer';
import Settings from '../components/Settings';
import AppNotFound from '../components/AppNotFound';
import AppLoading from '../components/AppLoading';

const routes = (
  <Route name="root" component={AppBody}>
    <Route name="home" path="/" component={HomeContainer} />
    <Route name="other" path="/other" component={OtherContainer} />
    <Route name="settings" path="/settings" component={Settings} />
    <Route name="notfound" component={AppNotFound} />
    <Route name="defaultroute" path="*" component={AppLoading} />
  </Route>
)

Meteor.startup(function () {
  ReactRouterSSR.Run(routes, ReactRouter.HistoryLocation, function (Handler, state) {
    React.render(<Handler />, document.getElementById("app"));
 });
});
