import { TOOGLE_THEME } from "../ActionTypes"


export const ThemeReducer = (state, action) => {
    switch (action.type) {
        case TOOGLE_THEME:
            return {
                ...state,
                theme: action.payload,
            }

        default:
            return state
    }
}