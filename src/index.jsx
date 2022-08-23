import React from "react";
import ReactDOM from "react-dom/client";
import "antd/dist/antd.min.css";
import { PersistGate } from "redux-persist/integration/react";
import "./index.css";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./components/App";

import store, { persistor } from "./store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </BrowserRouter>
);
