import {
  LOGIN,
  LOGOUT,
  USER_LOADED,
  AUTH_ERROR,
} from "../constants/actionTypes";

const loginReducer = (
  state = { isAuthenticated: false, authData: null, loading: true },
  action
) => {
  switch (action.type) {
    case USER_LOADED:
      return {
        isAuthenticated: true,
        loading: false,
        authData: {
          ...state.authData,
          ...action?.data,
        },
      };
    case LOGIN:
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      return {
        isAuthenticated: true,
        loading: false,
        authData: {
          ...state.authData,
          ...action?.data,
        },
      };
    case AUTH_ERROR:
      return {
        isAuthenticated: false,
        loading: false,
        authData: null,
      };
    case LOGOUT:
      localStorage.clear();
      return {
        isAuthenticated: false,
        loading: false,
        authData: null,
      };

    default:
      return state;
  }
};
export default loginReducer;
