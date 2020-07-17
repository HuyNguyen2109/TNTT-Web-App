import React from "react";
import { Route } from 'react-router-dom';

export default class RouteWithLayout extends React.Component {
  render = () => {
    const { layout: Layout, component: Component, ...props} = this.props;

    return (
      <Route
        {...props}
        render={matchProps => (
          <Layout>
            <Component {...matchProps} />
          </Layout>
        )}
      />
    )
  }
}