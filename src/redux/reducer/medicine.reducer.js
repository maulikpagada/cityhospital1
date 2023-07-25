import * as ActionTypes from '../ActionTypes'

const initState = {
    medicine: []
}

export const medicineReducer = (state = initState, action) => {
    switch (action.type) {
        case ActionTypes.GET_MEDICINE:
            return {
                ...state,
                medicine: action.payload
            }

        case ActionTypes.ADD_MEDICINE:
            return {
                ...state,
                medicine: state.medicine.concat(action.payload)
            }

        case ActionTypes.DELETE_MEDICINE:
            return {
                ...state,
                medicine: state.medicine.filter((a) => a.id != action.payload)
            }

        case ActionTypes.UPDATE_MEDICINE:
            return {
                ...state,
                medicine: state.medicine.map((a) => {
                    if (a.id === action.payload.id) {
                        return action.payload;
                    } else {
                        return a;
                    }
                })
            }

        default:
            return state
    }
}