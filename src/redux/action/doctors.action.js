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

export const addDoctorData = (data) => (dispatch) => {
    try {
        fetch("http://localhost:3004/Doctor", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((data) => dispatch({ type: ActionTypes.ADD_DOCTORS, payload: data }))
    } catch (error) {
        console.log(error);
    }
}
