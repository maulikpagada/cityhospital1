import axios from "axios";
import { BASE_URL } from "../utils/baseURL";

const instance = axios.create({
    baseURL: BASE_URL,
    timeout: 1000,
});

const sendRequest = (config) => {
    return instance.request(config)
}

export const getRequest = (path) => {
    return sendRequest({
        method: 'GET',
        url: path
    })
}   

export const addrequest = (path, data) => {
    return sendRequest({
        method: 'POST',
        url: path,
        data: JSON.stringify(data),
        headers: {
            'content-type': 'application/json'
        }
    })
}

export const deleterequest = (path, id) => {
    console.log("11111111111111", path , id);
    return sendRequest({
        method: 'DELETE',
        url: path + id
    })
}

export const editrequest = (path,data) => {
    return sendRequest({
        method: 'PUT',
        url: path,
        data: JSON.stringify(data),
        headers: {
            'content-type': 'application/json'
        }
    })
}