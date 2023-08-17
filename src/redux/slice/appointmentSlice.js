import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

const initState = {
    isLoading: false,
    apt: [],
    error: null
}

export const addApt = createAsyncThunk(
    'appointment/add',
    async (data) => {
        try {
            const docRef = await addDoc(collection(db, "appointment"), data);
            return {
                id: docRef.id,
                ...data
            }
        } catch (e) {
            console.error("Error adding document: ", e);
        }

    }
)

export const getApt = createAsyncThunk(
    'appoinment/get',
    async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "appointment"));

            let data = []

            querySnapshot.forEach((doc) => {

                data.push({
                    id: doc.id,
                    ...doc.data()
                })
            });

            return data;
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }
)

export const deleteApt = createAsyncThunk(
    'appoinment/delete',
    async (id) => {
        try {

            await deleteDoc(doc(db, "appointment", id));

            return id;

        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }
)

export const updateApt = createAsyncThunk(
    'appoinment/update',
    async (data) => {
        try {
            const aptRef = doc(db, "appointment", data);

            await updateDoc(aptRef, data);

            return data;

        } catch (e) {
            console.error("Error adding document: ", e);
        }
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

export const appointmentSlice = createSlice({
    name: 'appointment',
    initialState: initState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addApt.pending, onloading)
            .addCase(addApt.fulfilled, (state, action) => {
                state.isLoading = false
                console.log(action);
                state.apt = state.apt.concat(action.payload)
            })
            .addCase(getApt.pending, onloading)
            .addCase(getApt.fulfilled, (state, action) => {
                state.isLoading = false
                console.log(action);
                state.apt = action.payload
            })
            .addCase(deleteApt.pending, onloading)
            .addCase(deleteApt.fulfilled, (state, action) => {
                state.isLoading = false
                console.log(action);
                let Fdata = state.apt = state.apt.filter((v) => v.id !== action.payload)
                state.apt = Fdata;
            })
            .addCase(updateApt.pending, onloading)
            .addCase(updateApt.fulfilled, (state, action) => {
                let Udata = state.apt = state.departments.map((a, i) => {
                    if (a.id === action.payload.id) {
                        return action.payload
                    } else {
                        return a;
                    }
                })
                state.isLoading = false
                state.error = null
                state.apt = Udata
            })


    }
})

export default appointmentSlice.reducer;