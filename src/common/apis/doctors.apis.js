import { addrequest, deleterequest, editrequest, getRequest } from "../request"

export const fetchgetDoctorData = () => {
    return getRequest('Doctors')
}

export const fetchaddDoctorData = (data) => {
    return addrequest('Doctors', data)
}

export const fetchdeleteDoctorData = (id) => {
    return deleterequest('Doctors/' , id)
}

export const fetcheditDoctorData = (data) => {
    return editrequest('Doctors/' + data.id, data)
}