import * as ActionTypes from '../ActionTypes'

export const signupRequest = (data) => (dispatch) => {
    dispatch({type: ActionTypes.SIGNUP_REQUEST, payload: data})
}

export const emailverfication = () => (dispatch) => {
    dispatch({type: ActionTypes.EMIL_VERFICATION})
}

export const loginRequest = (data) => (dispatch) => {
    dispatch({type: ActionTypes.LOGIN_REQUEST, payload: data})
}

export const loggedIn = (data) => (dispatch) => {
    dispatch({type: ActionTypes.LOGGED_IN, payload: data})
}

export const logoutRequest = () => (dispatch) => {
    dispatch({type: ActionTypes.LOGOUT_REQUEST})
}

export const loggedOut =  () => (dispatch) => {
    dispatch({type: ActionTypes.LOGGED_OUT})
}

export const forgetRequest = (data) => (dispatch) => {
    dispatch({type: ActionTypes.FORGET_REQUEST, payload: data})
}

export const authError = (data) => (dispatch) => {
    dispatch({type: ActionTypes.AUTH_ERROR, payload: data})
}
