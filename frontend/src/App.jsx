import React from "react";
import "./App.css";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import { Routes } from "./pages";

const browserHistory = createBrowserHistory();

export default class App extends React.Component {
  render = () => {
    return (
      <div className="App">
        <Router history={browserHistory}>
          <Routes />
        </Router>
      </div>
    );
  };
}
