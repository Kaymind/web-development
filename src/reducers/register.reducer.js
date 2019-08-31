import { LOGIN_FETCHING, LOGIN_SUCCESS, LOGIN_FAILED, HTTP_REGISTER_FETCHING, HTTP_REGISTER_SUCCESS, HTTP_REGISTER_FAILED } from "../constants";

const initialState = {
    result: null,
    isFetching: false,
    isError: false
}

export default (state = initialState, { type, payload }) => {
    switch (type) {

    case HTTP_REGISTER_FETCHING:
        return { ...state, result:null, isFetching:true, isError:false}
    case HTTP_REGISTER_SUCCESS:
        return { ...state, result:payload, isFetching:false, isError:false}
    case HTTP_REGISTER_FAILED:
        return { ...state, result:payload, isFetching:false, isError:true}

    default:
        return state
    }
}
