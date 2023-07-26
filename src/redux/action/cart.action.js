import * as Actiontypes from '../ActionTypes'

export const addToCart = (id) => (dispatch) => {
    dispatch({type: Actiontypes.ADD_TO_CART, payload:{pid: id, qty: 1}})
}
export const incCartQty = (id) => (dispatch) => {
    dispatch({type: Actiontypes.INC_CART , payload:id})
}

export const decCartQty = (id) => (dispatch) => {
    dispatch({type: Actiontypes.DEC_CART , payload:id})
}

export const deleteToCart = (id) => (dispatch) => {
    console.log(id);
    dispatch({type: Actiontypes.REMOVE_CART, payload: id})
}