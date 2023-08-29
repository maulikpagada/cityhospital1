import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { db, storage } from "../../firebase";
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";

const initState = {
    isLoading: false,
    departments: [],
    error: null
}


export const adddep = createAsyncThunk(
    'department/add',
    async (data) => {
        console.log(data.prec.name);
        console.log(data);
        let iData = { data }

        try {
            const rNo = Math.floor(Math.random() * 100);
            const precRef = ref(storage, 'precipitation/' + rNo + "_" + data.prec.name);

            await uploadBytes(precRef, data.prec).then(async (snapshot) => {
                console.log('Uploaded a blob or file!');

                await getDownloadURL(snapshot.ref)
                    .then(async (url) => {
                        console.log(url);

                        iData = { ...data, prec: url, precName: rNo + "_" + data.prec.name }

                        const docRef = await addDoc(collection(db, "department"), iData);
                        console.log(docRef);

                        iData = {
                            id: docRef.id,
                            ...data,
                            prec: url,
                            precName: rNo + "_" + data.prec.name
                        }
                    })
            });

            return iData;
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }
)


export const getdep = createAsyncThunk(
    'department/get',
    async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "department"));

            let data = []

            querySnapshot.forEach((doc) => {

                data.push({
                    id: doc.id,
                    ...doc.data()
                })
            });

            return data
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }
)

export const deletedep = createAsyncThunk(
    'department/delete',
    async (data) => {
        console.log(data);
        try {
            const desertRef = ref(storage, 'precipitation/' + data.precName);
            console.log(data);

            await deleteObject(desertRef).then(async () => {
                await deleteDoc(doc(db, "department", data.id));
                console.log("file deleted success");
            })
        } catch (e) {
            console.error("Error adding document: ", e);
        }
        return data.id;
    }
)


export const updatedep = createAsyncThunk(
    'department/update',
    async (data) => {
        try {
            if (typeof data.prec === 'string') {
                console.log("Image No Change");
                const departmentRef = doc(db, "department", data.id);

                await updateDoc(departmentRef, data);

                return data
            } else {

                console.log("Image  Change");

                const desertRef = ref(storage, 'precipitation/' + data.precName);

                let iData = { data }

                await deleteObject(desertRef).then(async () => {
                    const rNo = Math.floor(Math.random() * 100);

                    const precRef = ref(storage, 'precipitation/' + rNo + "_" + data.prec.name);

                    console.log("Delete Old File");


                    await uploadBytes(precRef, data.prec).then(async (snapshot) => {
                        console.log('Uploaded a blob or file!');

                        await getDownloadURL(snapshot.ref)
                            .then(async (url) => {
                                console.log("New url" + url);

                                iData = { ...data, prec: url, precName: rNo + "_" + data.prec.name }

                                
                                const departmentRef = doc(db, "department", data.id);

                                await updateDoc(departmentRef, iData);
                                iData = {
                                    // id: docRef.id,
                                    ...data,
                                    prec: url,
                                    precName: rNo + "_" + data.prec.name
                                }
                            })
                    });
                })
                console.log(iData);
                return iData;

            }
        } catch (e) {
            console.error("Error adding document: ", e);
        }
        // const response = await putDepartmentData(data);
        // return response.data
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
    name: 'departments',
    initialState: initState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(adddep.pending, onloading)
            .addCase(adddep.fulfilled, (state, action) => {
                state.isLoading = false
                console.log(action);
                state.departments = state.departments.concat(action.payload)
            })
            .addCase(getdep.fulfilled, (state, action) => {
                state.isLoading = false
                console.log(action);
                state.departments = action.payload
            })
            .addCase(deletedep.fulfilled, (state, action) => {
                state.isLoading = false
                console.log(action);
                let Fdata = state.departments = state.departments.filter((v) => v.id != action.payload)
                state.departments = Fdata;
            })
            .addCase(updatedep.fulfilled, (state, action) => {
                console.log(action);
                state.isLoading = false
                let uData = state.departments.map((value) => {
                    if (value.id === action.payload.id) {
                        return action.payload;
                    } else {
                        return value;
                    }
                })
                state.departments = uData
            })
    }
})

export default departmentsSlice.reducer;