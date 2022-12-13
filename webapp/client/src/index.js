import React from "react";
import { hot } from "react-hot-loader/root";
import ReactDOM from "react-dom";
import "src/index.module.scss";
import App from "src/App";
import * as serviceWorker from "src/serviceWorker";

const render = (Component) => {
  ReactDOM.render(
    <Component />,
    document.getElementById("root")
  );
}

render(hot(App))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
