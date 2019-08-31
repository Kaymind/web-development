import {
  LOGIN_FETCHING,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT,
  server
} from "../constants";
import { httpClient } from "./../utils/HttpClient";

// Forward to reducer
export const setLoginStateToFetch = () => ({
  type: LOGIN_FETCHING
});

export const setLoginStateToSuccess = payload => ({
  type: LOGIN_SUCCESS,
  payload
});

export const setLoginStateToFailed = payload => ({
  type: LOGIN_FAILED,
  payload
});

export const setLoginStateToLogout = () => ({
  type: LOGOUT
});

// Called by Login Component
export const login = (value, history) => {
  return async dispatch => {
    try {
      dispatch(setLoginStateToFetch()); // fetching
      let result = await httpClient.post(server.LOGIN_URL, value);
      if (result.data.result === "ok") {
        localStorage.setItem(server.TOKEN_KEY, result.data.token);
        dispatch(setLoginStateToSuccess(result));
        history.push('/stock')
      } else {
        dispatch(setLoginStateToFailed(result));
      }
    } catch (error) {
      dispatch(setLoginStateToFailed({ data: { message: error } }));
    }
  };
};

export const logout = (history)=> {
    return (dispatch, getState) =>{
      localStorage.removeItem(server.TOKEN_KEY);
      dispatch(setLoginStateToLogout())
      history.push("/login");
    }
  }