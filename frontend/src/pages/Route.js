import React from "react";
import { Route, Switch } from "react-router-dom";
import { RouteWithLayout, MainLayout } from "../components/layout";
import { Test } from "../components/views";
import Login from "../pages/Login";

const Routes = () => {
  return (
    <Switch>
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
