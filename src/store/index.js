// @ts-nocheck
/* eslint-disable import/no-anonymous-default-export */
import { createStore, compose } from "redux";

import rootReducer from "./reducers";
const initialState = {};
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(rootReducer, initialState, composeEnhancers());
  return store;
};
