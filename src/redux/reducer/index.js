import { combineReducers } from "redux";
import { counterReducer } from "./counter.reducer";
import { doctorReducer } from "./doctor.reducer";
import { medicineReducer } from "./medicine.reducer";
import { cartreducer } from "./cart.reducer";


export const rootReducer = combineReducers({
    counter : counterReducer,
    doctors: doctorReducer,
    medicine: medicineReducer,
    cart: cartreducer
})