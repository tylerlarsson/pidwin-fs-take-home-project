import {
  LOGIN,
  LOGOUT,
  USER_LOADED,
  AUTH_ERROR,
} from "../constants/actionTypes";
import * as api from "../api";
import * as messages from "../messages";

export const signup = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);
    dispatch({ type: LOGIN, data });
    dispatch(loadUser());
    history("/");
    messages.success("Login Successful");
  } catch (error) {
    messages.error(error.response.data.message);
  }
};

export const login = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.login(formData);
    dispatch({ type: LOGIN, data });
    dispatch(loadUser());
    history("/");
    messages.success("Login Successful");
  } catch (error) {
    messages.error(error.response.data.message);
  }
};

export const changePassword = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.changePassword(formData);
    dispatch({ type: LOGOUT, data });
    messages.success("Password Change Was Successful");
    history("/");
  } catch (error) {
    messages.error(error.response.data.message);
  }
};

export const logout = (history) => async (dispatch) => {
  try {
    dispatch({ type: LOGOUT });
    history("/auth");
  } catch (error) {
    messages.error(error.response.data.message);
  }
};

export const loadUser = (formData) => async (dispatch) => {
  try {
    const { data } = await api.userProfile(formData);

    dispatch({
      type: USER_LOADED,
      data: data,
    });
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
      data: null,
    });
  }
};
