import React from "react";
import SearchResultsBar from "./index";

import Enzyme, { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import EnzymeAdapter from "@wojtekmaj/enzyme-adapter-react-17";
import { Provider } from "react-redux";
import { mockStore } from "../../test";

Enzyme.configure({ adapter: new EnzymeAdapter() });

const setup = (props) => {
  const store = mockStore();
  return shallow(
    <Provider store={store}>
      <SearchResultsBar {...props} />
    </Provider>
  );
};

describe("snapshot test for search results bar", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup();
  });
  it("should render correctly", () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
