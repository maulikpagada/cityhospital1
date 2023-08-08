import * as ActionTypes from '../ActionTypes'

const initState = {
    user: null,
    isloading: false,
    error: null
}

export const authReducer = (state = initState, action) => {
    console.log(action);
    switch (action.type) {
        case ActionTypes.SIGNUP_REQUEST:
            return {
                ...state
            }

        default:
            return state
    }
}