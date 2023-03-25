import { getServer } from "../util";
import { GET_CART, ERRORS } from "./types";
import axios from "axios";

export const addToCart = (context) => (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  return axios
    .post(`${getServer()}/api/cart`, context, config)
    .then((res) => {
      dispatch({
        type: GET_CART,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: ERRORS,
        payload: err,
      });
    });
};

export const getCart = () => (dispatch) => {
  axios
    .get(`${getServer()}/api/cart`)
    .then((res) => {
      dispatch({
        type: GET_CART,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch({
        type: ERRORS,
        payload: err,
      })
    );
};

export const removeFromCart = (context) => (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const { id } = context;
  return axios
    .put(`${getServer()}/api/cart/${id}`, context, config)
    .then((res) =>
      dispatch({
        type: GET_CART,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: ERRORS,
        payload: err,
      })
    );
};
