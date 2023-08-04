import { addrequest, deleterequest, editrequest, getRequest } from "../request"

export const fetchgetdepartmentData = () => {
    return getRequest('department')
}

export const fetchadddepartmentData = (data) => {
    return addrequest('department', data)
}


export const fetchdeletedepartmentData = (id) => {
    return deleterequest('department/', id)
}


export const fetcheditdepartmentData = (data) => {
    return editrequest('department/' + data.id, data)
}