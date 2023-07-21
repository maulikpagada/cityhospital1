import * as ActionTypes from "../ActionTypes"

const initialState = {
    doctors: [],
    isloading: false,
    error: null
}

export const doctorReducer = (state = initialState, action) => {
    console.log(action);
    switch (action.type) {

        case ActionTypes.LOADING_DOCTORS:
            return {
                doctors: [],
                isloading: action.payload,
                error: null
            }

        case ActionTypes.ERROR_DOCTORS:
            return {
                doctors: [],
                isloading: false,
                error: action.payload
            }

        case ActionTypes.GET_DOCTORS:
            return {
                ...state,
                doctors: action.payload,
                isloading: false
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

        case ActionTypes.UPDATE_DOCTORS:
            return {
                ...state,
                doctors: state.doctors.map((v) => {
                    if (v.id === action.payload.id) {
                        return action.payload
                    } else {
                        return v;
                    }
                })
            }

        default:
            return state
    }
}