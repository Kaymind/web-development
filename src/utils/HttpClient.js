import axios from "axios";
import join from "url-join";
import {
  server,
  apiUrl,
  NOT_CONNECT_NETWORK,
  NETWORK_CONNECTION_MESSAGE
} from "../constants";

const isAbsoluteURLRegex = /^(?:\w+:)\/\//;

axios.interceptors.request.use(async config => {
  if (!isAbsoluteURLRegex.test(config.url)) {
    const userToken = localStorage.getItem(server.TOKEN_KEY);
    if (userToken) {
      config.headers = { "x-access-token": userToken };
    }
    config.url = join(apiUrl, config.url);
  }
  config.timeout = 10000; // 10 Second
  return config;
});

axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    console.log(JSON.stringify(error, undefined, 2));
    if (axios.isCancel(error)) {
      return Promise.reject(error);
    } else if (!error.response) {
      return Promise.reject({
        code: NOT_CONNECT_NETWORK,
        message: NETWORK_CONNECTION_MESSAGE
      });
    }
    return Promise.reject(error);
  }
);

export const httpClient = axios;
