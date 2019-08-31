import {
  HTTP_TRANSACTION_SUCCESS,
  HTTP_TRANSACTION_FETCHING,
  HTTP_TRANSACTION_FAILED
} from "./../constants";

const initialState = {
  result: null,
  isFetching: false,
  isError: false
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case HTTP_TRANSACTION_SUCCESS:
      return { ...state, result: payload, isFetching: false, isError: false };
    case HTTP_TRANSACTION_FAILED:
      return { ...state, result: null, isFetching: false, isError: true };
    case HTTP_TRANSACTION_FETCHING:
      return { ...state, result: null, isFetching: true, isError: false };
    default:
      return state;
  }
};
