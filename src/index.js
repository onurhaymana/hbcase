import React from "react";
import ReactDOM from "react-dom";
import SearchPage from "./pages/Search";
import { Provider } from "react-redux";
import configureStore from "./store";

import "./styles/index.scss";

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <SearchPage />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

