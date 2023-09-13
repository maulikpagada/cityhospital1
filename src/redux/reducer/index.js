import { combineReducers } from "redux";
import { doctorReducer } from "./doctor.reducer";
// import { medicineReducer } from "./medicine.reducer";
import { myFavReducer } from "./myfav.reducer";
import counterReducer from "../slice/counterSlice";
import cartReducer from "../slice/cartSlice";
import departmentsReducer from "../slice/departmentSlice";
import alertReducer from "../slice/alertSlice";
import { authReducer } from "./auth.reducer";
import appointmentReducer from "../slice/appointmentSlice";
import medicinesReducer from "../slice/medicineSlice";


export const rootReducer = combineReducers({
    alert: alertReducer,
    counter: counterReducer,
    doctors: doctorReducer,
    // medicine: medicineReducer,
    cart: cartReducer,
    item: myFavReducer,
    departments: departmentsReducer,
    auth: authReducer,
    apt: appointmentReducer,
    medicines: medicinesReducer
})