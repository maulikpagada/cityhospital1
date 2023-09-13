import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { db, storage } from "../../firebase";
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";

const initState = {
    isLoading: false,
    medicines: [],
    error: null
}

export const addMedicineData = createAsyncThunk(
    'medicines/add',
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

                        const docRef = await addDoc(collection(db, "medicines"), iData);
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

export const getMedicineData = createAsyncThunk(
    'medicines/get',
    async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "medicines"));
            let data = [];

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

export const deleteMedicineData = createAsyncThunk(
    'medicines/delete',
    async (data) => {
        console.log(data);
        try {
            const desertRef = ref(storage, 'precipitation/' + data.precName);
            console.log(data);

            await deleteObject(desertRef).then(async () => {
                await deleteDoc(doc(db, "medicines", data.id));
                console.log("file deleted success");
            })
        } catch (e) {
            console.error("Error adding document: ", e);
        }
        return data.id;
    }
)

export const updateMedicineData = createAsyncThunk(
    'medicines/update',
    async (data) => {
        try {
            if (typeof data.prec === 'string') {
                console.log("Image No Change");
                const medicinestRef = doc(db, "medicines", data.id);

                await updateDoc(medicinestRef, data);

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

                                
                                const medicinesRef = doc(db, "medicines", data.id);

                                await updateDoc(medicinesRef, iData);
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
    }
)

export const medicinesSlice = createSlice({
    name: 'medicines',
    initialState: initState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addMedicineData.fulfilled, (state, action) => {
                state.isLoading = false
                console.log(action);
                state.medicines = state.medicines.concat(action.payload)
            })
            .addCase(getMedicineData.fulfilled, (state, action) => {
                state.isLoading = false
                console.log(action);
                state.medicines = action.payload
            })
            .addCase(deleteMedicineData.fulfilled, (state, action) => {
                state.isLoading = false
                console.log(action);
                let Fdata = state.medicines = state.medicines.filter((v) => v.id != action.payload)
                state.medicines = Fdata;
            })
            .addCase(updateMedicineData.fulfilled, (state, action) => {
                console.log(action);
                state.isLoading = false
                let uData = state.medicines.map((value) => {
                    if (value.id === action.payload.id) {
                        return action.payload;
                    } else {
                        return value;
                    }
                })
                state.medicines = uData
            })

    }
})

export default medicinesSlice.reducer;