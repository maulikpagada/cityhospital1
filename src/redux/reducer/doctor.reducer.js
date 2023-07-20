import * as ActionTypes from "../ActionTypes"

const initialState = {
    doctors: [],
    isloading: false,
    error: null
}

export const doctorReducer = (state = initialState, action) => {
    console.log(action);
    switch (action.type) {
        case ActionTypes.GET_DOCTORS:
            return {
                ...state,
                doctors: action.payload
            }

        case ActionTypes.ADD_DOCTORS:
            return {
                ...state,
                doctors: state.doctors.concat(action.payload)
            }

        case ActionTypes.DELETE_DOCTORS:
            return {
                ...state,
                doctors: state.doctors.filter((v) => v.id != action.payload)
            }

        default:
            return state
    }
}