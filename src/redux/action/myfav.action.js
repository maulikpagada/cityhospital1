import * as ActionTypes from '../ActionTypes'

export const addfav = (id) => (dispatch) => {
    console.log(id);
    dispatch({type: ActionTypes.ADD_FAV , payload:{fid: id}})
}