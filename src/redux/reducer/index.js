import { combineReducers } from "redux";
import { counterReducer } from "./counter.reducer";
import { doctorReducer } from "./doctor.reducer";


export const rootReducer = combineReducers({
    counter : counterReducer,
    doctors: doctorReducer
})