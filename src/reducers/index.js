import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import tweetReducer from './tweetReducer';

export default combineReducers({
    auth: authReducer,
    error: errorReducer,
    tweet: tweetReducer,
})