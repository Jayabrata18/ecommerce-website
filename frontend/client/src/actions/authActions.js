import {
  SET_CURRENT_USER,
  SUCCESSFUL_REGISTER,
  FAILURE_REGISTER,
  ERRORS,
  AUTH_ERROR,
  SUCCESSFUL_LOGIN,
  FAILURE_LOGIN,
} from "./types";
import axios from "axios";
import setAuthToken from "./../Util/setAuthToken";
import { getServer } from "../Util";

//set a user
export const setCurrentUser = (user) => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get(`${getServer}/api/auth`);
    dispatch({ type: SET_CURRENT_USER, payload: res.data });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
  return {
    type: SET_CURRENT_USER,
    payload: user,
  };
};

//register a user
export const register = (userData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post(`${getServer}/api/users`, userData, config);
    dispatch({
      type: SUCCESSFUL_REGISTER,
      payload: res.data,
    });
  } catch (err) {
    const error = err.response.data.error;
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
    const res = await axios.post(`${getServer}/api/auth`, userData, config);
    dispatch({
      type: SUCCESSFUL_LOGIN,
      payload: res.data,
    });
  } catch (err) {
      dispatch({
        type: FAILURE_LOGIN,
      });
    }
  
};
