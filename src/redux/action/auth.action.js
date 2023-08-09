import * as ActionTypes from '../ActionTypes'

export const signupRequest = (data) => (dispatch) => {
    dispatch({type: ActionTypes.SIGNUP_REQUEST, payload: data})
}

export const loginRequest = (data) => (dispatch) => {
    dispatch({type: ActionTypes.LOGIN_REQUEST, payload: data})
}


export const forgetRequest = (data) => (dispatch) => {
    dispatch({type: ActionTypes.FORGET_REQUEST, payload: data})
}
