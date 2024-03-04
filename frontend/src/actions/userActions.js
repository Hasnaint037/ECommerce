import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  UPDATE_PROFILE_RESET,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAIL,
} from "../constants/userConstants";
import axios from "axios";

//login
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });
    let link = "http://localhost:3000/Users/login";
    const config = {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    };
    const { data } = await axios.post(link, { email, password }, config);
    if (data.status !== 200) {
      dispatch({ type: LOGIN_FAIL, payload: data.message });
    }
    dispatch({ type: LOGIN_SUCCESS, payload: data });
  } catch (e) {
    dispatch({ type: LOGIN_FAIL, payload: e.response.data.message });
  }
};

//signup
export const signup = (userData) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_USER_REQUEST });
    let link = "http://localhost:3000/Users/register";
    const config = {
      withCredentials: true,
      headers: { "Content-Type": "multipart/form-data" },
    };
    const { data } = await axios.post(link, userData, config);
    if (data.status !== 200) {
      dispatch({
        type: REGISTER_USER_FAIL,
        payload: data.response.data.message,
      });
    }
    dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user });
  } catch (e) {
    dispatch({ type: LOGIN_FAIL, payload: e.response.data.message });
  }
};

//load user
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_REQUEST });
    let link = "http://localhost:3000/Users/me";
    const config = {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    };
    const { data } = await axios.get(link, config);
    if (data.status !== 200) {
      dispatch({ type: LOAD_USER_FAIL, payload: data.message });
    }
    dispatch({ type: LOAD_USER_SUCCESS, payload: data });
  } catch (e) {
    dispatch({ type: LOAD_USER_FAIL, payload: e.response.data.message });
  }
};

//logout
export const logout = () => async (dispatch) => {
  try {
    const config = {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    };
    const { data } = await axios.get(
      "http://localhost:3000/Users/logout",
      config
    );
    dispatch({ type: LOGOUT_USER_SUCCESS });
  } catch (error) {
    dispatch({ type: LOGOUT_USER_FAIL, payload: error.response.data.message });
  }
};

//update profile
export const updateProfile = (userData) => async (dispatch) => {
  try {
    console.log("object");
    dispatch({ type: UPDATE_PROFILE_REQUEST });
    let link = "http://localhost:3000/Users/updateProfile";
    const config = {
      withCredentials: true,
      headers: { "Content-Type": "multipart/form-data" },
    };
    const { data } = await axios.put(link, userData, config);
    if (data.status !== 200) {
      dispatch({ type: UPDATE_PROFILE_FAIL, payload: data.success });
    }
    dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data.success });
  } catch (e) {
    dispatch({ type: LOGIN_FAIL, payload: e.response.data.message });
  }
};

export const updatePassword = (passwords) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PASSWORD_REQUEST });
    let link = "http://localhost:3000/Users/updatePassword";
    const config = {
      withCredentials: true,
      headers: { "Content-Type": "multipart/form-data" },
    };
    let { data } = await axios.put(link, passwords, config);
    dispatch({ UPDATE_PASSWORD_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_PASSWORD_FAIL,
      payload: error.response.data.message,
    });
  }
};
