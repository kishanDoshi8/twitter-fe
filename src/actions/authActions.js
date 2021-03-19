import { USER_LOADED, USER_LOADING, REGISTER_FAIL, REGISTER_SUCCESS, AUTH_ERROR, LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT_SUCCESS, SET_ERRORS } from '../actions/types';
import axios from 'axios';
import { setErrors } from './errorActions';

export const loadUser = () => (dispatch, getState) => {
    dispatch({ type: USER_LOADING })

    axios.get('/api/auth/user', tokenConfig(getState))
        .then(res => {
            dispatch({
                type: USER_LOADED,
                payload: res.data,
            })
        })
        .catch(err => {
            dispatch(setErrors(err.response.status, err.response.data.msg, AUTH_ERROR));
            dispatch({ type: AUTH_ERROR })
        })
}

export const loginUser = user => (dispatch, getState) => {

    axios.post('/api/auth/', user, tokenConfig(getState))
        .then(res => {
            console.log(res);
            dispatch({
                type: LOGIN_SUCCESS,
                payload: {
                    user: res.data.user,
                    token: res.data.token,
                }
            })
        })
        .catch(err => {
            dispatch(setErrors(err.response.status, err.response.data.msg, LOGIN_FAIL))
            dispatch({ type: LOGIN_FAIL })
        })
}

export const logout = () => (dispatch) => {
    dispatch({
        type: LOGOUT_SUCCESS
    })
}

export const register = (user) => (dispatch) => {
    axios.post('/api/users/', user)
        .then(res => {
            console.log(res.data);
            dispatch({
                type: REGISTER_SUCCESS,
                payload: {
                    user: res.data.user,
                    token: res.data.token,
                },
            })
        })
        .catch(err => {
            dispatch(setErrors(err.response.status, err.response.data.msg, REGISTER_FAIL));
            dispatch({ type: REGISTER_FAIL });
        })
}

export const tokenConfig = getState => {
    // Get token from local storage
    const token = getState().auth.token;

    // Headers
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }

    // if token, add to headers
    if(token) {
        config.headers['x-auth-token'] = token;
    }

    return config;
}