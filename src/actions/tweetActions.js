import { LOADING_TWEETS, CREATE_TWEET, GET_TWEETS, UPDATE_TWEET, DELETE_TWEET, FAIL_GET_TWEETS, FAIL_CREATE_TWEET, FAIL_UPDATE_TWEET } from './types';
import axios from 'axios';
import { tokenConfig } from './authActions';
import { setErrors } from './errorActions';

export const getTweets = () => (dispatch, getState) => {
    dispatch({ type: LOADING_TWEETS });

    axios.get('/api/tweets/', tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_TWEETS,
                payload: res.data.tweets,
            })
        })
        .catch(err => {
            dispatch(setErrors(err.response.status, err.response.data.msg, FAIL_GET_TWEETS));
        })
}

export const createTweet = tweet => (dispatch, getState) => {
    axios.post('/api/tweets/', tweet, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: CREATE_TWEET,
                payload: res.data.tweet,
            })
        })
        .catch(err => {
            dispatch(setErrors(err.response?.status, err.response?.data.msg, FAIL_CREATE_TWEET));
        })
}

export const likeTweet = id => (dispatch, getState) => {
    axios.post('/api/tweets/like/' + id, {}, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: UPDATE_TWEET,
                payload: res.data.tweet,
            })
        })
        .catch(err => {
            dispatch(setErrors(err.response?.status, err.response?.data.msg, FAIL_UPDATE_TWEET));
        })
}

export const unlikeTweet = id => (dispatch, getState) => {
    axios.post('/api/tweets/unlike/' + id, {}, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: UPDATE_TWEET,
                payload: res.data.tweet,
            })
        })
        .catch(err => {
            dispatch(setErrors(err.response?.status, err.response?.data.msg, FAIL_UPDATE_TWEET));
        })
}