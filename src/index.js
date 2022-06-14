// Bootstrap + MDBootstrap + FontAwesome + Custom Styles

import "font-awesome/css/font-awesome.min.css";
import "mdbootstrap/css/bootstrap.css";
import "mdbootstrap/css/mdb.css";
import "./style.css";

import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
// import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// reportWebVitals();
