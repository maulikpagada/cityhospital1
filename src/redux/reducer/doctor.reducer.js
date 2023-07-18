import * as ActionTypes from "../ActionTypes"

const initialState = {
    doctor: [],
}


export const doctorReducer = (state = initialState, action) => {

    switch (action.type) {
        case ActionTypes.GET_DOCTORS:
            return {
                doctor: action.payload
            }

        default:
            return state
    }
}