import { LOADING_TWEETS, CREATE_TWEET, GET_TWEETS, UPDATE_TWEET, DELETE_TWEET, FAIL_GET_TWEETS, GET_TWEET_ID, LOADING_TWEET_ID } from '../actions/types';

const inititalState = {
    isLoading: false,
    tweet: {},
    tweets: [],
}

export default function (state = inititalState, { type, payload }) {
    switch (type) {
        case LOADING_TWEETS:
        case LOADING_TWEET_ID:
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
        case GET_TWEET_ID:
            return {
                ...state,
                tweet: payload,
            }
        case CREATE_TWEET:
            return {
                ...state,
                tweets: [payload, ...state.tweets]
            }
        case UPDATE_TWEET:
            if(state.tweet?._id === payload._id) {
                // If a thread tweet is updated...
                return {
                    ...state,
                    tweet: payload,
                }
            }
            // If a tweet from homepage is updated...
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