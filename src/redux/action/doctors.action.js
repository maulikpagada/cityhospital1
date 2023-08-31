import { fetchaddDoctorData, fetchdeleteDoctorData, fetcheditDoctorData, fetchgetDoctorData } from '../../common/apis/doctors.apis'
import * as ActionTypes from '../ActionTypes'
import { setAlert } from '../slice/alertSlice'

export const getDoctorData = () => (dispatch) => {
    try {
        // dispatch(loadingData(true))
        // setTimeout(function () {
            fetchgetDoctorData()
                .then((response) => dispatch({ type: ActionTypes.GET_DOCTORS, payload: response.data }))
                .catch((error) => console.log(error))

            // fetch("http://localhost:3004/Doctor")
            //     .then((response) => {
            //         if (response.ok) {
            //             return response.json()
            //         }
            //         throw new Error('somthing went wrong');
            //     })
            //     .then((data) => dispatch({ type: ActionTypes.GET_DOCTORS, payload: data }))
            //     .catch((error) => dispatch(errorData(error.message)))
        // }, 1000)

    } catch (error) {
        // dispatch(errorData(error.message))
    }
}

export const addDoctorData = (data) => (dispatch) => {
    try {
        fetchaddDoctorData(data)
            .then((response) => {
                dispatch(setAlert({ text: 'ADD DATA', color: 'success' }))
                dispatch({ type: ActionTypes.ADD_DOCTORS, payload: response.data })
            })
            .catch((error) => console.log(error))

        // fetch("http://localhost:3004/Doctor", {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify(data),
        // })
        //     .then((response) => response.json())
        //     .then((data) => dispatch({ type: ActionTypes.ADD_DOCTORS, payload: data }))
        //     .catch((error) => console.log(error))
    } catch (error) {
        console.log(error);
    }
}

export const deleteDoctorData = (id) => (dispatch) => {
    try {
        fetchdeleteDoctorData(id)
            .then(
                dispatch(setAlert({ text: "Delete Data", color: 'error' })),
                dispatch({ type: ActionTypes.DELETE_DOCTORS, payload: id })
            )
            .catch((error) => console.log(error))

        // fetch("http://localhost:3004/Doctor/" + id, {
        //     method: "DELETE"
        // })
        //     .then(dispatch({ type: ActionTypes.DELETE_DOCTORS, payload: id }))
        //     .catch((error) => console.log(error))
    } catch (error) {
        console.log(error);
    }
}

export const updateDoctorData = (data) => (dispatch) => {
    try {
        fetcheditDoctorData(data)
            .then(
                dispatch(setAlert({ text: "Updete Data", color: 'success' })),
                dispatch({ type: ActionTypes.UPDATE_DOCTORS, payload: data })
            )
            .catch((error) => console.log(error))

        // fetch("http://localhost:3004/Doctor/" + data.id, {
        //     method: "PUT",
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify(data),
        // })
        //     .then(dispatch({ type: ActionTypes.UPDATE_DOCTORS, payload: data }))
        //     .catch((error) => console.log(error))
    } catch (error) {
        console.log(error)
    }
}

// export const loadingData = (status) => (dispatch) => {
//     console.log("loading");
//     dispatch({ type: ActionTypes.LOADING_DOCTORS, payload: status })
// }

// export const errorData = (error) => (dispatch) => {
//     console.log("error");
//     dispatch({ type: ActionTypes.ERROR_DOCTORS, payload: error })
// }