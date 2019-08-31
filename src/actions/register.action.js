import { HTTP_REGISTER_FETCHING, HTTP_REGISTER_SUCCESS, HTTP_REGISTER_FAILED, server } from '../constants'
import { httpClient } from "./../utils/HttpClient";

export const setRegisterStateToFetch = () => ({
  type: HTTP_REGISTER_FETCHING,
})

export const setRegisterStateToSuccess = (payload) => ({
  type: HTTP_REGISTER_SUCCESS,
  payload
})

export const setRegisterStateToFailed = (payload) => ({
  type: HTTP_REGISTER_FAILED,
  payload
})

//Called by Register Compenent
export const register = (value, history) => {
  return async dispatch => {
    try {
      dispatch(setRegisterStateToFetch()); // fetching
      let result = await httpClient.post(server.REGISTER_URL, value);
      if (result.data.result === "ok") {
        dispatch(setRegisterStateToSuccess(result));
        history.goBack()
      } else {
        dispatch(setRegisterStateToFailed(result));
      }
    } catch (error) {
      dispatch(setRegisterStateToFailed({ data: { message: error } }));
    }
  };
};
