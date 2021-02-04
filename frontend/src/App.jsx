import React from "react";
import "./App.css";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import { Routes } from "./pages";
import { ParallaxProvider } from "react-skrollr";

const browserHistory = createBrowserHistory();

export default class App extends React.Component {
  render = () => {
    return (
      <div className="App">
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
      </div>
    );
  };
}
