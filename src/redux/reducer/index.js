import { combineReducers } from "redux";
import { doctorReducer } from "./doctor.reducer";
import { medicineReducer } from "./medicine.reducer";
import { myFavReducer } from "./myfav.reducer";
import counterReducer from "../slice/counterSlice";
import cartReducer from "../slice/cartSlice";


export const rootReducer = combineReducers({
    counter : counterReducer,
    doctors: doctorReducer,
    medicine: medicineReducer,
    cart: cartReducer,
    item : myFavReducer
})