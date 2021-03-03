import React from "react";
import "./App.css";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import { Routes } from "./pages";
import { ParallaxProvider } from "react-skrollr";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

const browserHistory = createBrowserHistory();

export default class App extends React.Component {
  render = () => {
    const theme = createMuiTheme({
      typography: {
        fontFamily: '"Segoe UI Light", san-serif',
      },
    });

    return (
      <div className="App">
        <MuiThemeProvider theme={theme}>
          <ParallaxProvider
            init={{
              smoothScrolling: true,
              smoothScrollingDuration: 500,
              forceHeight: true,
            }}
          >
            <Router history={browserHistory}>
              <Routes />
            </Router>
          </ParallaxProvider>
        </MuiThemeProvider>
      </div>
    );
  };
}
