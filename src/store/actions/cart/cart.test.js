import { ADD_TO_CART, REMOVE_FROM_CART, TEST_CASES } from "../../../app-consts";
import { addToCart, removeFromCart } from "./index";

const { MOCK_PRODUCT } = TEST_CASES;

describe("unit tests for cart actions", () => {
  it("should create an action for adding an item to cart", () => {
    const expectedAction = {
      type: ADD_TO_CART,
      payload: MOCK_PRODUCT,
    };
    expect(addToCart(MOCK_PRODUCT)).toEqual(expectedAction);
  });

  it("should create an action for removing an item from cart", () => {
    const expectedAction = {
      type: REMOVE_FROM_CART,
      payload: MOCK_PRODUCT.id,
    };
    expect(removeFromCart(MOCK_PRODUCT.id)).toEqual(expectedAction);
  });
});
