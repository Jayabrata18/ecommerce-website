import { GET_CART, ERRORS } from "../actions/types";

const initialState = {
  cart: {},
  errors: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_CART:
      return {
        ...state,
        cart: payload.result,
      };
    case ERRORS:
      return {
        ...state,
        error: payload,
      };
    default:
      return state;
  }
}
