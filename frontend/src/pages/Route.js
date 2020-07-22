import React from "react";
import { Switch } from "react-router-dom";
import { RouteWithLayout, MainLayout } from "../components/layout";
import { Test } from "../components/views";

const Routes = () => {
  return (
    <Switch>
      <RouteWithLayout
        component={Test}
        exact
        layout={MainLayout}
        path="/"
      />
    </Switch>
  );
};

export default Routes;
