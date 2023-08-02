import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { fetchadddepartmentData, fetchdeletedepartmentData, fetcheditdepartmentData, fetchgetdepartmentData } from "../../common/apis/departments.apis"

const initState = {
    isLoading: false,
    departments: [],
    error: null
}

export const fetchdepartments = createAsyncThunk(
    'department/fetch',
    async () => {
        let response = await fetchgetdepartmentData()
        return response.data
    }
)

export const adddepartmentsData = createAsyncThunk(
    'department/add',
    async (data) => {
        let response = await fetchadddepartmentData(data)
        return response.data
    }
)

export const updatedepartmentsData = createAsyncThunk(
    'department/update',
    async (data) => {
        let response = await fetcheditdepartmentData(data)
        return response.data
    }
)

export const deletedepartmentsData = createAsyncThunk(
    'department/delete',
    async (id) => {
        let response = await fetchdeletedepartmentData(id)
        console.log("22222222222",response);
        return response.id
    }
)

export const departmentsSlice = createSlice({
    name: "departments",
    initialState: initState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchdepartments.fulfilled, (state, action) => {
                console.log(action);
                state.departments = action.payload
            })

            .addCase(adddepartmentsData.fulfilled, (state, action) => {
                console.log(action);
                state.departments = state.departments.concat(action.payload)
            })

            .addCase(updatedepartmentsData.fulfilled, (state, action) => {
                console.log(action);
                state.departments = state.departments.map((a,i) => {
                    if (a.id === action.payload.id) {
                        return action.payload
                    } else {
                        return a;
                    }
                })
            })

            .addCase(deletedepartmentsData.fulfilled, (state, action) => {
                console.log("3333333333",action);
                state.departments = state.departments.filter((v) => v.id != action.payload)
            })
    }
})

export default departmentsSlice.reducer;