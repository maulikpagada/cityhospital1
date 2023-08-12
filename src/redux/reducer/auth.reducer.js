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
        case ActionTypes.LOGIN_REQUEST:
        case ActionTypes.LOGOUT_REQUEST:
            return {
                user: null,
                isloading: true,
                error: null
            }

        case ActionTypes.EMIL_VERFICATION:
            return {
                user: null,
                isloading: false,
                error: null
            }

        case ActionTypes.AUTH_ERROR:
            return {
                user: null,
                isloading: false,
                error: action.payload
            }

        case ActionTypes.LOGGED_IN:
            return {
                user: action.payload,
                isloading: false,
                error: null
            }

        case ActionTypes.LOGGED_OUT:
            return {
                user: null,
                isloading: false,
                error: null
            }

        case ActionTypes.FORGET_REQUEST:
            return {
                user: action.payload,
                isloading: false,
                error: null
            }


        default:
            return state
    }
}