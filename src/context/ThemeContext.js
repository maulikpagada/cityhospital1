import { createContext, useReducer } from "react";
import { ThemeReducer } from "./reducer/ThemeReducer";
import { TOOGLE_THEME } from "./ActionTypes";

export const ThemeContext = createContext();

const initState = {
    theme: 'light'
}

export const ThemeProvider = ({ children }) => {
    const [state, dispatch] = useReducer(ThemeReducer, initState)

    const toogletheme = (theme) => {
        const newtheme = theme === 'light' ? 'dark' : 'light';

        dispatch({ type:TOOGLE_THEME , payload: newtheme })
    }

    return (
        <ThemeContext.Provider
            value={{
                ...state,
                toogletheme
            }}
        >
            {children}
        </ThemeContext.Provider>
    )
}