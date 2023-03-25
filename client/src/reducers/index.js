import { combineReducers } from "redux";
import authReducer from "./authReducer";
import productsReducer from "./productsReducer";
import profileReducer from "./profileReducer";
import cartReducer from "./cartReducer";

export default combineReducers({
  auth: authReducer,
  products: productsReducer,
  profile: profileReducer,
  cart: cartReducer,
});
