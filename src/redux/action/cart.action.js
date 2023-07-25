import * as Actiontypes from '../ActionTypes'

export const addToCart = (id) => (dispatch) => {
    dispatch({type: Actiontypes.ADD_TO_CART, payload:{pid: id, qty: 1}})
}