import * as ActionTypes from '../ActionTypes'

export const getDoctorData = () => (dispatch) => {
    fetch("http://localhost:3004/posts")
        .then((response) => response.json())
        .then((data) => dispatch({ type: ActionTypes.GET_DOCTORS, payload: data}))
        .catch((error) => console.log(error))
}