import axios from "axios";
import {
  SET_CURRENT_USER,
  SUCCESSFUL_REGISTER,
  FAILURE_REGISTER,
  ERRORS,
  AUTH_ERROR,
  SUCCESSFUL_LOGIN,
  FAILURE_LOGIN,
  LOGOUT,
} from "./types";
import { getServer } from "../util";
import setAuthToken from "../util/setAuthToken";

//set a user
export const setCurrentUser = (user) => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get(`${getServer()}/api/auth`);
    dispatch({
      type: SET_CURRENT_USER,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

//register a user
export const register = (userData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post(`${getServer()}/api/users`, userData, config);
    dispatch({
      type: SUCCESSFUL_REGISTER,
      payload: res.data,
    });
    dispatch(setCurrentUser());
  } catch (err) {
    const error = err.response.data.errors;
    if (error) {
      dispatch({
        type: ERRORS,
        payload: error,
      });
    } else {
      dispatch({
        type: FAILURE_REGISTER,
      });
    }
  }
};

//login user
export const login = (userData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post(`${getServer()}/api/auth`, userData, config);
    dispatch({
      type: SUCCESSFUL_LOGIN,
      payload: res.data,
    });
    dispatch(setCurrentUser());
  } catch (err) {
    const error = err.response.data.errors;
    if (error) {
      dispatch({
        type: ERRORS,
        payload: error,
      });
    } else {
      dispatch({
        type: FAILURE_LOGIN,
      });
    }
  }
};

export const logout = () => (dispatch) => dispatch({ type: LOGOUT });
