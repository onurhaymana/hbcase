import { createStore } from "redux";
import rootReducer from "../store/reducers";
import checkPropTypes from "check-prop-types";

export const mockStore = (initialState) => {
  return createStore(rootReducer, initialState);
};

export const findByTestAttribute = (wrapper, val) => {
  return wrapper.find(`[data-test="${val}"]`);
};

export const checkProps = (component, conformingProps) => {
  const propError = checkPropTypes(
    component.propTypes,
    conformingProps,
    "prop",
    component.name
  );
  expect(propError).toBeUndefined();
};
