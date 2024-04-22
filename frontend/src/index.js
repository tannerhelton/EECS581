// This script serves as the entry point for a React application, orchestrating the initial rendering process.
// It imports React and ReactDOM to utilize essential functionalities for rendering UI components.
// The App component, which is the root of the application, along with global styles from 'index.css', are imported.
// The ReactDOM.createRoot method is called to attach the React application to an HTML element with the id 'root'.
// React's StrictMode is employed to wrap the App component, ensuring better debugging and notification of potential problems in development mode.
// Additionally, the reportWebVitals function is used to monitor and report on the performance of the app, which can be logged or sent to an analytics endpoint.
// The setup ensures that the application is efficiently bootstrapped and performance metrics can be easily captured and analyzed.

// Created by: Tanner Helton

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
