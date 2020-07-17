import React from "react";
import { Switch, Route } from "react-router-dom";
import { RouteWithLayout} from "../components/layout";
import { Main } from '../components/layout/Main';
import { Test } from "../components/views/Test";

const Routes = () => {
  return (
    <div>
      <Route path="/" exact component={Loading} />
      <Switch>
        <RouteWithLayout
          component={Test}
          exact
          layout={Main}
          path={'/dashboard'}
        />
      </Switch>
    </div>
  )
}

export default Routes