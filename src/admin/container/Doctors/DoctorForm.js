import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import * as yup from 'yup'
import Button from '@mui/material/Button';


function DoctorForm({ onhandlesubmit, onupdate }) {

    const [open, setOpen] = React.useState(false);

    useEffect(() => {
        if (onupdate) {
            formik.setValues(onupdate)
            handleClickOpen()
        }
    }, [onupdate])

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    let d = new Date();
    let nd = new Date(d.setDate(d.getDate() - 1))

    let medicineschema = yup.object({
        name: yup.string().required(),
        price: yup.number().required(),
    });

    const formik = useFormik({
        validationSchema: medicineschema,

        initialValues: {
            name: '',
            price: '',
        },
        onSubmit: (values, action) => {
            // handlesubmitdata(values)
            action.resetForm()
            handleClose()
            onhandlesubmit(values)
        },

    });

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = formik;



    return (
        <>
            <h1>Doctor</h1>
            <Button variant="outlined" onClick={handleClickOpen}>
                Open form Doctor
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Doctor</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            margin="dense"
                            id="name"
                            label="name"
                            name='name'
                            type="text"
                            fullWidth
                            variant="standard"
                            value={values.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <span style={{ color: 'red' }}>{errors.name && touched.name ? errors.name : null}  </span>
                        <TextField
                            margin="dense"
                            id="name"
                            label="Price"
                            name='price'
                            type="text"
                            fullWidth
                            variant="standard"
                            value={values.price}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <span style={{ color: 'red' }}>{errors.price && touched.price ? errors.price : null} </span>
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button type='submit' >submit</Button>
                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
}

export default DoctorForm;