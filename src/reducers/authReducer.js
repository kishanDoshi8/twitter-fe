import { USER_LOADED, USER_LOADING, REGISTER_FAIL, REGISTER_SUCCESS, AUTH_ERROR, LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT_SUCCESS } from '../actions/types';

const initialState = {
    isLoading: false,
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    user: {},
}

export default function(state = initialState, {type, payload}) {
    switch (type) {
        case USER_LOADING:
            return {
                ...state,
                isLoading: true,
            }
        case USER_LOADED:
            return {
                ...state,
                isLoading: false,
                user: payload,
                isAuthenticated: true,
            }
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token', payload.token);
            return {
                ...state,
                user: payload.user,
                token: payload.token,
                isAuthenticated: true,
                isLoading: false,
            }
        case REGISTER_FAIL:
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT_SUCCESS:
            localStorage.removeItem('token');
            return  {
                ...state,
                token: null,
                user: null,
                isAuthenticated: false,
            }
        default:
            return state;
    }
}