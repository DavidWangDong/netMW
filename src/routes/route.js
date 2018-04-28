import React from "react";
// import { Router, Route, hashHistory } from "react-router";
import { HashRouter, Route, Link, Switch, Redirect } from "react-router-dom";
import App from '../App.js'
const routes = (
  <HashRouter>
    <Route path="/" component={App} />
  </HashRouter>
);
export default routes;