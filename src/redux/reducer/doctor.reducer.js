import * as ActionTypes from "../ActionTypes"

const initialState = {
    doctors: [],
    isloading: false,
    error: null 
}

export const doctorReducer = (state = initialState, action) => {
    console.log(action.payload);
    switch (action.type) {
        case ActionTypes.GET_DOCTORS:
            return {
                ...state,
                doctors: action.payload
            }

        case ActionTypes.POST_DOCTORS:
            return{
                ...state,
                doctors: state.doctors.concat(action.payload)
            }

        default:
            return state
    }
}