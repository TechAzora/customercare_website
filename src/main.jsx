import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import store from "./ReduxToolkit/Store";
import { Provider } from "react-redux";
import App from "./App";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
  