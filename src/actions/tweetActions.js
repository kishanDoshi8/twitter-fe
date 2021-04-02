import { LOADING_TWEETS, CREATE_TWEET, GET_TWEETS, UPDATE_TWEET, DELETE_TWEET, FAIL_GET_TWEETS, FAIL_CREATE_TWEET, FAIL_UPDATE_TWEET, LOADING_TWEET_ID, GET_TWEET_ID, FAIL_GET_TWEET_ID, ERROR_COMMENT } from './types';
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

export const getTweetById = id => (dispatch, getState) => {
    dispatch({ type: LOADING_TWEET_ID });

    axios.get('/api/tweets/'+id, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_TWEET_ID,
                payload: res.data.tweet,
            })
        })
        .catch(err => {
            dispatch(setErrors(err.response.status, err.response.data.msg, FAIL_GET_TWEET_ID));
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

export const postComment = comment => (dispatch, getState) => {
    const id = comment.id;
    axios.post('/api/tweets/comments/' + id, comment, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: UPDATE_TWEET,
                payload: res.data.tweet,
            })
        })
        .catch(err => {
            dispatch(setErrors(err.response?.status, err.response?.data.msg, ERROR_COMMENT));
        })
}