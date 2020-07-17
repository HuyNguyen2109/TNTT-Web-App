import React from 'react';
import './App.css';
import { Test, Login } from './pages'
import { Router } from 'react-router-dom';
import { createBrowserHistory } from "history";
import { Routes } from './pages/Route';

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
  }
}
