import { LOADING_TWEETS, CREATE_TWEET, GET_TWEETS, UPDATE_TWEET, DELETE_TWEET, FAIL_GET_TWEETS } from '../actions/types';

const inititalState = {
    isLoading: false,
    tweets: [],
}

export default function (state = inititalState, { type, payload }) {
    switch (type) {
        case LOADING_TWEETS:
            return {
                ...state,
                isLoading: true,
            }
        case GET_TWEETS:
            return {
                ...state,
                isLoading: false,
                tweets: payload,
            }
        case CREATE_TWEET:
            return {
                ...state,
                tweets: [payload, ...state.tweets]
            }
        case UPDATE_TWEET:
            return {
                ...state,
                tweets: state.tweets.map(tweet => tweet._id === payload._id ? payload : tweet)
            }
        case DELETE_TWEET:
            return {
                ...state,
                tweets: state.tweets.filter(tweet => tweet._id !== payload._id)
            }
        default:
            return state;
    }
}