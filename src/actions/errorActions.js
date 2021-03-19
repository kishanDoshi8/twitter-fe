import { SET_ERRORS, CLEAR_ERRORS } from './types';

export const setErrors = (status, msg, id = null) => {
    return {
        type: SET_ERRORS,
        payload: { status, msg, id }
    }
}

export const clearErrors = (status, msg, id = null) => {
    return {
        type: CLEAR_ERRORS,
    }
}