import React from "react";
import { Switch, Route } from "react-router";

export default (
  <Switch>
    <Route  path="/" />
    <Route exact path="/search" />
    <Route exact path="/categories"  />
    {/* <Route exact path="/location" /> */}
    <Route exact path="/share"  />
    {/* <Route exact path="/location/:id" /> */}
    <Route exact path="/categories/:id"  />
    <Route exact path="/insights"  />
    <Route exact path="/insights/:id"  />
    <Route exact path="/:userId"  />
  </Switch>
);
