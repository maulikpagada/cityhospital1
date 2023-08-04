import * as ActionTypes from "../ActionTypes"

const initState = {
    departments: [],
    isLoading: false,
    error: null
}

export const departmentsReducer = (state = initState, action) => {
    console.log("444444444444444", action);
    switch (action.type) {
        case ActionTypes.GET_DEPARTMENTS:
            return {
                ...state,
                departments: action.payload
            }

        case ActionTypes.ADD_DEPARTMENTS:
            return {
                ...state,
                departments: state.departments.concat(action.payload)
            }

        case ActionTypes.DELETE_DEPARTMENTS:
            return {
                ...state,
                departments: state.departments.filter((v) => v.id != action.payload)
            }

        case ActionTypes.UPDATE_DEPARTMENTS:
            return {
                ...state,
                departments: state.departments.map((v) => {
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