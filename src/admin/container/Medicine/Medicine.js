import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import * as yup from 'yup'
import { Form, Formik, useFormik } from 'formik';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';

function Medicine(props) {
    const [open, setOpen] = React.useState(false);
    const [ProData, setProData] = useState([]);


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        let localData = JSON.parse(localStorage.getItem("medicine"));

        if (localData !== null) {
            setProData(localData)
        }
    }, [])

    const handledelete = (id) => {
        let localData = JSON.parse(localStorage.getItem("medicine"));

        let dData = localData.filter((a, i) => a.id !== id)

        localStorage.setItem("medicine", JSON.stringify(dData));

        setProData(dData)
    }


    const columns = [
        { field: 'name', headerName: 'Name', width: 130 },
        { field: 'e_date', headerName: 'Expiry_date', width: 130 },
        { field: 'price', headerName: 'price', width: 130 },
        { field: 'Description', headerName: 'Description', width: 130 },
        {
            field: 'Action',
            headerName: 'Action',
            width: 130,
            renderCell: (params) => (
                <>
                    <IconButton aria-label="delete" onClick={() => handledelete(params.row.id)}>
                        <DeleteIcon />
                    </IconButton>

                    <IconButton aria-label="delete">
                            <ModeEditIcon />
                        </IconButton>
                </>
            )
        }
    ];

    const handleAdd = (data) => {

        let localdata = JSON.parse(localStorage.getItem("medicine"));

        let rno = Math.floor(Math.random() * 100);
        let newData = { id: rno, ...data };

        if (localdata === null) {
            localStorage.setItem("medicine", JSON.stringify([newData]))
            setProData([newData])
        } else {
            localdata.push(newData)
            setProData(localdata)
            localStorage.setItem("medicine", JSON.stringify(localdata))
        }
        handleClose()
    }

    let d = new Date()
    let nd = new Date(d.setDate(d.getDate() - 1))

    let medicineSchema = yup.object().shape({
        name: yup.string().matches(/^[A-Za-z ]*$/, 'Please enter valid name').max(10).required("Please enter Name"),
        e_date: yup.date().min(nd, "Enter Valid Date").required(),
        price: yup.number().required("please enter Price").positive().integer(),
        Description: yup.string().required('Please enter your Description').test('Description', 'maxmium 5 word allowed.', function (val) {
            let arr = val.split(" ");

            if (arr.length > 3) {
                return false
            } else {
                return true
            }
        }),
    })

    const formik = useFormik({
        initialValues: {
            name: '',
            e_date: '',
            price: '',
            Description: '',
        },

        validationSchema: medicineSchema,
        onSubmit: (values, action) => {
            action.resetForm()
            handleAdd(values)
            ProData(values)
            setOpen(false);
        },

    })

    const { handleChange, handleBlur, handleSubmit, values, errors, touched } = formik



    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Add  Medicine
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle> Add  Medicine</DialogTitle>
                <DialogContent>

                    <form onSubmit={handleSubmit}>
                        <TextField
                            margin="dense"
                            id="name"
                            label="product Name"
                            type="text"
                            name='name'
                            fullWidth
                            variant="filled"
                            value={values.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />

                        <span className='error'>{errors.name && touched.name ? errors.name : ''}</span>

                        <TextField
                            margin="dense"
                            id="date"
                            type="date"
                            name='e_date'
                            fullWidth
                            variant="filled"
                            value={values.e_date}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />

                        <span className='error'>{errors.e_date && touched.e_date ? errors.e_date : ''}</span>

                        <TextField
                            margin="dense"
                            id="price"
                            label="product price"
                            type="text"
                            name='price'
                            fullWidth
                            variant="filled"
                            value={values.price}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />

                        <span className='error'>{errors.price && touched.price ? errors.price : ''}</span>


                        <TextField
                            margin="dense"
                            id="Description"
                            label="product Description"
                            type="text"
                            multiline
                            rows={4}
                            name='Description'
                            fullWidth
                            variant="filled"
                            value={values.Description}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />

                        <span className='error'>{errors.Description && touched.Description ? errors.Description : ''}</span>


                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button type="submit">Add</Button>
                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog>

            <div style={{ height: 400, width: '80%', margin: '0px auto 0px auto' }}>
                <DataGrid
                    rows={ProData}
                    columns={columns}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                />
            </div>
        </div>
    );
}

export default Medicine;