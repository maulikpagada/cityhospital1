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
        await new Promise ((resolve, reject) => setTimeout(resolve, 3000))
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
        console.log("22222222222", response);
        return id;
    }
)


const onerror = (state, action) => {
    state.isLoading = false;
    state.error = action.error.message;
}
const onloading = (state, action) => {
    state.isLoading = true
    state.error = null;
}

export const departmentsSlice = createSlice({
    name: "departments",
    initialState: initState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchdepartments.pending, onloading)
            .addCase(fetchdepartments.fulfilled, (state, action) => {
                state.isLoading = false
                state.error = null
                console.log(action);
                state.departments = action.payload
            })
            .addCase(fetchdepartments.rejected, onerror)


            .addCase(adddepartmentsData.pending, onloading)
            .addCase(adddepartmentsData.fulfilled, (state, action) => {
                console.log(action);
                state.departments = state.departments.concat(action.payload)
                state.isLoading = false
                state.error = null
            })
            .addCase(adddepartmentsData.rejected, onerror)


            .addCase(updatedepartmentsData.pending, onloading)
            .addCase(updatedepartmentsData.fulfilled, (state, action) => {
                console.log(action);
                let Udata = state.departments = state.departments.map((a, i) => {
                    if (a.id === action.payload.id) {
                        return action.payload
                    } else {
                        return a;
                    }
                })

                state.isLoading = false
                state.error = null
                state.departments = Udata
            })

            .addCase(updatedepartmentsData.rejected, onerror)


            .addCase(deletedepartmentsData.pending, onloading)
            .addCase(deletedepartmentsData.fulfilled, (state, action) => {
                state.isLoading = false
                state.error = null
                let Fdata = state.departments = state.departments.filter((v) => v.id != action.payload)
                console.log(Fdata);
                state.departments = Fdata;
            })
            .addCase(deletedepartmentsData.rejected, onerror)

    }
})

export default departmentsSlice.reducer;