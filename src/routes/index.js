import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./home";
import Register from "./register";
import Login from "./login";
import CreateTeam from "./createTeam";

export default () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/register" exact component={Register} />
      <Route path="/login" exact component={Login} />
      <Route path="/create-team" exact component={CreateTeam} />
    </Switch>
  </BrowserRouter>
);
