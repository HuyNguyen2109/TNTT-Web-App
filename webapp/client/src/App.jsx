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
import { Dashboard, Login, Landing, List, NotFound, Children } from "pages";
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
        fontFamily: '"SVN-Poppins", san-serif',
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
                    <RouteWithLayout
                      component={Dashboard}
                      exact
                      layout={MainLayout}
                      path="/dashboard"
                    />
                    <RouteWithLayout
                      component={Children}
                      exact
                      layout={MainLayout}
                      path="/children"
                    />
                    <RouteWithLayout
                      component={List}
                      exact
                      layout={MainLayout}
                      path="/members"
                    />
                    <PublicRoute path="/landing" component={() => <Landing />} />
                    <PublicRoute path="/login" component={(props) => <Login {...props} />} />
                    <Redirect exact from="/" to="/dashboard" />
                    <PublicRoute path="*" component={(props) => <NotFound {...props} />} />
                  </Switch>
                </Router>
              </ThemeProvider>
            </StyledEngineProvider>
          </SkrollrProvider>
        </ParallaxProvider>
        <div className="footer">
          <div />
          <div>
            <h5>{`Xứ Đoàn Anne Lê Thị Thành @ ${new Date().getFullYear()}`}</h5>
          </div>
        </div>
      </div>
    );
  };
}
