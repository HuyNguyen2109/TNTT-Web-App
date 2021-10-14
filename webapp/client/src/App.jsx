import React from "react";
import "src/App.scss";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import { ParallaxProvider as SkrollrProvider } from "react-skrollr";
import { ParallaxProvider } from "react-scroll-parallax";
import { ThemeProvider, StyledEngineProvider, createTheme, adaptV4Theme } from "@mui/material/styles";
import { Route, Switch, Redirect } from "react-router-dom";
import { Provider } from "react-redux";

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
    const theme = createTheme({
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
        <ParallaxProvider scrollAxis="vertical">
          <SkrollrProvider init={{ forceHeight: false }}>
            <StyledEngineProvider injectFirst>
              <ThemeProvider theme={theme}>
                <Router history={browserHistory}>
                  <Switch>
                    <PublicRoute path="/landing" component={() => <Landing />} />
                    <PublicRoute path="/login" component={() => <Login />} />
                    <RouteWithLayout
                      component={Dashboard}
                      exact
                      layout={MainLayout}
                      path="/"
                    />
                  </Switch>
                </Router>
              </ThemeProvider>
            </StyledEngineProvider>
          </SkrollrProvider>
        </ParallaxProvider>
      </div>
    );
  };
}
