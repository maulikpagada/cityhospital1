import { combineReducers } from "redux";
import { counterReducer } from "./counter.reducer";


export const rootReducer = combineReducers({
    counter : counterReducer
})