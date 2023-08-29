import { db, storage } from "../../firebase";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";


const initState = {
    isLoading: false,
    apt: [],
    error: null
}


export const addApt = createAsyncThunk(
    'appoinment/add',
    async (data) => {
        console.log(data.prec.name);
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

                        const docRef = await addDoc(collection(db, "appointment"), iData);
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
    async (data) => {
        console.log(data);
        try {
            const desertRef = ref(storage, 'precipitation/' + data.precName);
            console.log(data);

            await deleteObject(desertRef).then(async () => {
                await deleteDoc(doc(db, "appointment", data.id));
                console.log("file deleted success");
            })
        } catch (e) {
            console.error("Error adding document: ", e);
        }
        return data.id;
    }

)

export const updateApt = createAsyncThunk(
    'appoinment/update',
    async (data) => {
        try {
            if (typeof data.prec === "string") {
                console.log("Image No Change");
                const aptRef = doc(db, "appointment", data.id);

                await updateDoc(aptRef, data);

                return data;
            } else {

                console.log("Image  Change");

                const desertRef = ref(storage, 'precipitation/' + data.precName);

                let iData = { data }

                await deleteObject(desertRef).then(async () => {
                    const rNo = Math.floor(Math.random() * 100);

                    const precRef = ref(storage, 'precipitation/' + rNo + "_" + data.prec.name);

                    console.log("Delete Old File");

                    // await deleteDoc(doc(db, "appointment", data.id));
                    
                    await uploadBytes(precRef, data.prec).then(async (snapshot) => {
                        console.log('Uploaded a blob or file!');

                        await getDownloadURL(snapshot.ref)
                            .then(async (url) => {
                                console.log("New url" + url);

                                iData = { ...data, prec: url, precName: rNo + "_" + data.prec.name }

                                // const docRef = await updateDoc(collection(db, "appointment"), iData);

                                // // await updateDoc(aptRef, iData);

                                const appointmentRef = doc(db, "appointment", data.id);
                                
                                await updateDoc(appointmentRef, iData);
                                iData = {
                                    // id: docRef.id,
                                    ...data,
                                    prec: url,
                                    precName: rNo + "_" + data.prec.name
                                }
                            })
                    });
                })
                return iData;
            }
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
            .addCase(getApt.fulfilled, (state, action) => {
                state.isLoading = false
                console.log(action);
                state.apt = action.payload
            })
            .addCase(deleteApt.fulfilled, (state, action) => {
                state.isLoading = false
                console.log(action);
                let Fdata = state.apt = state.apt.filter((v) => v.id !== action.payload)
                state.apt = Fdata;
            })
            .addCase(updateApt.fulfilled, (state, action) => {
                state.isLoading = false
                let uData = state.apt.map((value) => {
                    if (value.id === action.payload.id) {
                        return action.payload;
                    } else {
                        return value;
                    }
                })
                state.apt = uData
            })
    }
})

export default appointmentSlice.reducer;