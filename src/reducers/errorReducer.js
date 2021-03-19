import { SET_ERRORS, CLEAR_ERRORS } from '../actions/types';

const initialState = {
    status: null,
    msg: null,
    id: null,
}

export default function (state = initialState, { type, payload }) {
    switch (type) {
        case SET_ERRORS:
            return {
                ...state,
                status: payload.status,
                msg: payload.msg,
                id: payload.id,
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                status: null,
                msg: null,
                id: null
            }
        default:
            return state;
    }
}