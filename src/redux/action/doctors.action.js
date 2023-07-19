import * as ActionTypes from '../ActionTypes'

export const getDoctorData = () => (dispatch) => {
    try {
        fetch("http://localhost:3004/Doctor")
            .then((response) => response.json())
            .then((data) => dispatch({ type: ActionTypes.GET_DOCTORS, payload: data }))
            .catch((error) => console.log(error))

    } catch (error) {
        console.log(error);
    }
}