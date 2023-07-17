import * as ActionTypes from '../ActionTypes'

export const increment = () => (dispatch) => {
    dispatch({type: ActionTypes.INCREMENT_COUNTER})
}


export const decrement = () => (dispatch) => {
    dispatch({type: ActionTypes.DECREMENT_COUNTER})
}