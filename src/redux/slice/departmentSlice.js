import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { fetchgetdepartmentData } from "../../common/apis/departments.apis"

const initState = {
    isLoading : false,
    departments: [],
    error : null
}

export const fetchdepartments = createAsyncThunk(
    'department/fetch',
    async () => {
        let response = await fetchgetdepartmentData()
        return response.data
    }
)

export const departmentsSlice = createSlice({
    name: "departments",
    initialState: initState,
    reducers : {},
    extraReducers : (builder) => {
        builder
        .addCase(fetchdepartments.fulfilled, (state, action)  => {
            console.log(action);
            state.departments = action.payload
        })
    }
})

export default departmentsSlice.reducer;