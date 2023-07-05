import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import MedicineForm from './MedicineForm';


function Medicine(props) {
    const [items, setItems] = React.useState([]);
    const [update, setupdate] = React.useState(null);

    useEffect(() => {
        let localData = JSON.parse(localStorage.getItem("medicines"));

        if (localData !== null) {
            setItems(localData)
        }

    }, []);

    const handlesubmitdata = (data) => {
        console.log(data);

        let rno = Math.floor(Math.random() * 1000);

        let newData = { id: rno, ...data };

        let localdata = JSON.parse(localStorage.getItem("medicines"));

        console.log(localdata);

        if (localdata === null) {
            localStorage.setItem("medicines", JSON.stringify([newData]))
            setItems([newData])
        } else {
            if (update) {
                let udata = localdata.map((v, i) => {
                    if (v.id === data.id) {
                        return data;
                    } else {
                        return v;
                    }
                })
                localStorage.setItem("medicines", JSON.stringify(udata))
                setItems(udata)
            } else {
                localdata.push(newData)
                localStorage.setItem("medicines", JSON.stringify(localdata))
                setItems(localdata)
            }

        }


    };

    const handleDelete = (id) => {
        let localData = JSON.parse(localStorage.getItem("medicines"));

        let fdata = localData.filter((v, i) => v.id !== id)

        localStorage.setItem("medicines", JSON.stringify(fdata))

        setItems(fdata)
    }

    const handleupdate = (values) => {
        setupdate(values) 
    }


    const columns = [

        // { field: 'id', headerName: 'ID', width: 130 },
        { field: 'name', headerName: 'Name', width: 130 },
        { field: 'date', headerName: 'ExpiryDate', width: 130 },
        { field: 'price', headerName: 'Price', width: 130 },
        { field: 'desc', headerName: 'Description', width: 130 },
        {
            field: 'action',
            headerName: 'Action',
            width: 130,
            renderCell: (params) => (
                <>
                    <IconButton aria-label="delete" onClick={() => handleDelete(params.row.id)}>
                        <DeleteIcon />
                    </IconButton>

                    <IconButton aria-label="edit" onClick={() => handleupdate(params.row)}>
                        <EditIcon />
                    </IconButton>
                </>
            ),

        }

    ];


    return (

        <>
            <MedicineForm onhandlesubmit={handlesubmitdata} onupdate={update}/>

            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={items}
                    columns={columns}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                />
            </div>
        </>
    );
}

export default Medicine;