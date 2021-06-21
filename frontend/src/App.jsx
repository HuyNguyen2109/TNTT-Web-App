import React from "react";
import "src/App.scss";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import { ParallaxProvider } from "react-skrollr";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import { Route, Switch } from "react-router-dom";
import { RouteWithLayout, MainLayout } from "layout";
import { Dashboard, Login, Landing } from "pages";
import { PublicRoute } from "components/Auth";

import { smoothScrolling } from "helpers/functions";

const browserHistory = createBrowserHistory();

export default class App extends React.Component {
  componentDidMount = () => {
    smoothScrolling();
  };

  render = () => {
    const theme = createMuiTheme({
      typography: {
        fontFamily: '"Roboto", san-serif',
        fontWeightRegular: "500",
        fontWeightLight: "100",
        fontWeightMedium: "300",
        fontWeightBold: "900",
      },
    });

    return (
      <div className="App">
        <ParallaxProvider
          init={{
            smoothScrollingDuration: 1000,
            smoothScrolling: true,
            forceHeight: false,
          }}
        >
          <MuiThemeProvider theme={theme}>
            <Router history={browserHistory}>
              <Switch>
                <PublicRoute 
                  path="/landing"
                  component={() => <Landing />}
                />
                <PublicRoute 
                  path="/login"
                  component={() => <Login />}
                />
                <RouteWithLayout
                  component={Dashboard}
                  exact
                  layout={MainLayout}
                  path="/dashboard"
                />
              </Switch>
            </Router>
          </MuiThemeProvider>
        </ParallaxProvider>
      </div>
    );
  };
}
