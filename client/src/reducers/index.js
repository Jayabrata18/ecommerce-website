import {combineReducers} from "redux";
import authReducer from "./authReducer";
import ProductsReducer from "./productsReducer";

export default combineReducers({
    auth: authReducer,
    Products: ProductsReducer,
});