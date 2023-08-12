import { fetchadddepartmentData, fetchdeletedepartmentData, fetcheditdepartmentData, fetchgetdepartmentData } from '../../common/apis/departments.apis'
import * as ActionTypes from '../ActionTypes'
import { setAlert } from '../slice/alertSlice'

export const getdepartmentsData = () => (dispatch) => {
    fetchgetdepartmentData()
        .then((response) => {
            dispatch({ type: ActionTypes.GET_DEPARTMENTS, payload: response.data })
        })
        .catch((error) => console.log(error))
}

export const adddepartmentsData = (data) => (dispatch) => {
    fetchadddepartmentData(data)
        .then((response) => {
            dispatch(setAlert({ text: 'ADD DATA', color: 'success' }))
            dispatch({ type: ActionTypes.ADD_DEPARTMENTS, payload: response.data })
        })
        .catch((error) => console.log(error))
}

export const deletedepartmentsData = (id) => (dispatch) => {
    fetchdeletedepartmentData(id)
        .then(
            dispatch(setAlert({ text: "Delete Data", color: 'error' })),
            dispatch({ type: ActionTypes.DELETE_DEPARTMENTS, payload: id })
        )
        .catch((error) => console.log(error))
}

export const updatedepartmentsData = (data) => (dispatch) => {
    fetcheditdepartmentData(data)
        .then(
            dispatch(setAlert({ text: "Updete Data", color: 'success' })),
            dispatch({ type: ActionTypes.UPDATE_DEPARTMENTS, payload: data })
        )
        .catch((error) => console.log(error))
}