import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "./css/index.css";
import App from "./components/App";
import store from './store/Store';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals