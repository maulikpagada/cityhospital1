import { fetchadddepartmentData, fetchdeletedepartmentData, fetcheditdepartmentData, fetchgetdepartmentData } from '../../common/apis/departments.apis'
import * as ActionTypes from '../ActionTypes'

export const getdepartmentsData = () => (dispatch) => {
    fetchgetdepartmentData()
        .then((response) => dispatch({ type: ActionTypes.GET_DEPARTMENTS, payload: response.data }))
        .catch((error) => console.log(error))
}

export const adddepartmentsData = (data) => (dispatch) => {
    fetchadddepartmentData(data)
        .then((response) => dispatch({ type: ActionTypes.ADD_DEPARTMENTS, payload: response.data }))
        .catch((error) => console.log(error))
}

export const deletedepartmentsData = (id) => (dispatch) => {
    console.log("33333333333", id);
    fetchdeletedepartmentData(id)
        .then(dispatch({ type: ActionTypes.DELETE_DEPARTMENTS, payload: id }))
        .catch((error) => console.log(error))
}

export const updatedepartmentsData = (data) => (dispatch) => {
    fetcheditdepartmentData(data)
        .then(dispatch({ type: ActionTypes.UPDATE_DEPARTMENTS, payload: data }))
        .catch((error) => console.log(error))
}