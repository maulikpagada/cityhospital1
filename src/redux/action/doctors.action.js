import * as ActionTypes from '../ActionTypes'

export const getDoctorData = () => (dispatch) => {
    try {
        dispatch(loadingData(true))
        setTimeout(function () {
            fetch("http://localhost:3004/Doctor")
                .then((response) => {
                    if (response.ok) {
                        return response.json()
                    }
                    throw new Error('somthing went wrong');
                })
                .then((data) => dispatch({ type: ActionTypes.GET_DOCTORS, payload: data }))
                .catch((error) => dispatch(errorData(error.message)))
        }, 3000)

    } catch (error) {
        dispatch(errorData(error.message))
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
            .catch((error) => console.log(error))
    } catch (error) {
        console.log(error);
    }
}

export const deleteDoctorData = (id) => (dispatch) => {
    try {
        fetch("http://localhost:3004/Doctor/" + id, {
            method: "DELETE"
        })
            .then(dispatch({ type: ActionTypes.DELETE_DOCTORS, payload: id }))
            .catch((error) => console.log(error))
    } catch (error) {
        console.log(error);
    }
}

export const updateDoctorData = (data) => (dispatch) => {
    try {
        fetch("http://localhost:3004/Doctor/" + data.id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then(dispatch({ type: ActionTypes.UPDATE_DOCTORS, payload: data }))
            .catch((error) => console.log(error))
    } catch (error) {
        console.log(error)
    }
}

export const loadingData = (status) => (dispatch) => {
    console.log("loading");
    dispatch({ type: ActionTypes.LOADING_DOCTORS, payload: status })
}

export const errorData = (error) => (dispatch) => {
    console.log("error");
    dispatch({ type: ActionTypes.ERROR_DOCTORS, payload: error })
}