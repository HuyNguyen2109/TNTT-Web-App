import React from "react";
import ReactDOM from "react-dom";
import "./index.module.scss";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { ParallaxProvider } from "react-skrollr";

ReactDOM.render(
  <ParallaxProvider
    init={{
      smoothScrolling: true,
      smoothScrollingDuration: 500,
      forceHeight: true,
    }}
  >
    <App />
  </ParallaxProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
