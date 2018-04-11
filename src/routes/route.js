import React from "react";
// import { Router, Route, hashHistory } from "react-router";
import { BrowserRouter, Route, Link, Switch, Redirect } from "react-router-dom";
import App from '../App.js'
const routes = (
  <BrowserRouter>
    
      <Route path="/" component={App} />
    
  </BrowserRouter>
);
export default routes;