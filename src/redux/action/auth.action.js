import * as ActionTypes from '../ActionTypes'

export const signupRequest = (data) => (dispatch) => {
    dispatch({type: ActionTypes.SIGNUP_REQUEST, payload: data})
}