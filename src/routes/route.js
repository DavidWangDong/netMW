import React from "react";
// import { Router, Route, hashHistory } from "react-router";
import { HashRouter, Route, Link, Switch, Redirect,BrowserRouter } from "react-router-dom";
import App from '../App.js'
const routes = (
  <BrowserRouter>
    <Route path="/" component={App} />
  </BrowserRouter>
);
export default routes;