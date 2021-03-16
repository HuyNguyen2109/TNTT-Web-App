import React from "react";
import "./App.css";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import { Routes } from "./pages";
import { ParallaxProvider } from "react-skrollr";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import { smoothScrolling } from "./helpers/functions";

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
              <Routes />
            </Router>
          </MuiThemeProvider>
        </ParallaxProvider>
      </div>
    );
  };
}
