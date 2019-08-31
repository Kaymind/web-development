import { httpClient } from "./../utils/HttpClient";

import {
  HTTP_TRANSACTION_SUCCESS,
  HTTP_TRANSACTION_FETCHING,
  HTTP_TRANSACTION_FAILED,
  server
} from "./../constants";

const setStateTransactionToSuccess = payload => ({
  type: HTTP_TRANSACTION_SUCCESS,
  payload: payload
});

const setStateTransactionToFetching = () => ({
  type: HTTP_TRANSACTION_FETCHING
});

const setStateTransactionToFailed = () => ({
  type: HTTP_TRANSACTION_FAILED
});

export const getTransactions = () => {
  setStateTransactionToFetching();
  return dispatch => {
    httpClient
      .get(server.TRANSACTION_URL)
      .then(result => {
        dispatch(setStateTransactionToSuccess(result.data));
      })
      .catch(err => {
        console.log(err);
        dispatch(setStateTransactionToFailed());
      });
  };
};
