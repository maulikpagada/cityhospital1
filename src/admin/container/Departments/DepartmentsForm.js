import React, { useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import * as yup from 'yup'
import Button from '@mui/material/Button';
import { useFormik } from 'formik';


function DepartmentsForm({ onhandlesubmit, onupdate }) {
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


    let departmentsschema = yup.object({
        name: yup.string().required(),
        desc: yup.string().required(),
        prec: yup.mixed().required("Please Upload to File")
    });

    const formik = useFormik({
        validationSchema: departmentsschema,

        initialValues: {
            name: '',
            desc: '',
            prec: ''
        },
        onSubmit: (values, action) => {
            console.log(values);
            action.resetForm()
            handleClose()
            onhandlesubmit(values)
        },

    });


    const { values, errors, touched, handleBlur, handleChange, handleSubmit, setValues, setFieldValue } = formik;


    return (
        <>
            <h1>departments</h1>
            <Button variant="outlined" onClick={handleClickOpen}>
                Open form departments
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>departments</DialogTitle>
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
                            label="departments Description"
                            name='desc'
                            multiline
                            rows={4}
                            type="address"
                            fullWidth
                            variant="standard"
                            value={values.desc}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <span style={{ color: 'red' }}>{errors.desc && touched.desc ? errors.desc : null} </span>

                        <TextField
                            margin="dense"
                            label="prec"
                            name='prec'
                            type="file"
                            fullWidth
                            variant="standard"
                            onChange={(e) => setFieldValue('prec', e.target.files[0])}
                        />
                        {/* <img
                            src={typeof values.prec === 'string' ? values.prec : URL.createObjectURL(values.prec)}
                            className="img-fluid"
                            alt=""
                        /> */}
                        <span style={{ color: 'red' }}>{errors.prec && touched.prec ? errors.prec : null} </span>


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

export default DepartmentsForm;