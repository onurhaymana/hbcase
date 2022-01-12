import React from "react";
import ReactDOM from "react-dom";
import Modal from "./index";

import Enzyme, { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import EnzymeAdapter from "@wojtekmaj/enzyme-adapter-react-17";

Enzyme.configure({ adapter: new EnzymeAdapter() });

const setup = (props) => {
    // @ts-ignore
    ReactDOM.createPortal = jest.fn(modal => modal);

  return shallow(
      <Modal {...props} />
  );
};

describe("snapshot test for modal", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup({children: <div>test</div>});
  });
  it("should render correctly", () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
