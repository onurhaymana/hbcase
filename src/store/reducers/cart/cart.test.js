import { ADD_TO_CART, REMOVE_FROM_CART, TEST_CASES } from "../../../app-consts";
import cartReducer from "./index";

const { CART_INITIAL_STATE, MOCK_PRODUCT } = TEST_CASES;

describe("unit tests for cart reducer", () => {
  it("should return initial state object when state and action is undefined", () => {
    expect(cartReducer(undefined, {})).toEqual(CART_INITIAL_STATE);
  });

  it("should update the state by adding product to the cart", () => {
    const expectedAction = {
      type: ADD_TO_CART,
      payload: MOCK_PRODUCT,
    };
    expect(cartReducer(CART_INITIAL_STATE, expectedAction)).toEqual({
      ...CART_INITIAL_STATE,
      cart: [MOCK_PRODUCT],
    });
  });

  it("should update the state by removing product from the cart", () => {
    const expectedAction = {
      type: REMOVE_FROM_CART,
      payload: MOCK_PRODUCT.id,
    };
    expect(
      cartReducer(
        {
          ...CART_INITIAL_STATE,
          cart: [MOCK_PRODUCT],
        },
        expectedAction
      )
    ).toEqual({
      ...CART_INITIAL_STATE,
      cart: [],
    });
  });
});
