import React from "react";
import { Route, Switch } from "react-router-dom";
import { RouteWithLayout, MainLayout } from "../components/layout";
import { Test, Login, Home } from "../pages";

const Routes = () => {
  return (
    <Switch>
      <Route 
        component={Home}
        exact
        path="/"
      />
      <Route
        component={Login}
        path="/login"
      />
      <RouteWithLayout
        component={Test}
        exact
        layout={MainLayout}
        path="/dashboard"
      />
    </Switch>
  );
};

export default Routes;
