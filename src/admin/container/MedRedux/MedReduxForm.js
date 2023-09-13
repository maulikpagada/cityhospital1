import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import * as yup from 'yup'
import Button from '@mui/material/Button';

function MedReduxForm({ onhandlesubmit, onupdate }) {
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


    let medicineschema = yup.object({
        name: yup.string().required(),
        price: yup.number().required(),
        expiry: yup.number().required(),
        desc: yup.string().required(),
        prec: yup.mixed().required("Please Upload to File")

    });

    const formik = useFormik({
        validationSchema: medicineschema,

        initialValues: {
            name: '',
            price: '',
            expiry: '',
            desc: '',
            prec: ''
        },
        onSubmit: (values, action) => {
            // handlesubmitdata(values)
            action.resetForm()
            handleClose()
            onhandlesubmit(values)
        },

    });

    const { values, errors, touched, handleBlur, handleChange, handleSubmit,setFieldValue } = formik;


    return (
        <>
            <h1>medicine</h1>
            <Button variant="outlined" onClick={handleClickOpen}>
                Open form medicine
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>medicine</DialogTitle>
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

                        <TextField

                            margin="dense"
                            id="name"
                            label="expiry"
                            name='expiry'
                            type="expiry"
                            fullWidth
                            variant="standard"
                            value={values.expiry}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <span style={{ color: 'red' }}>{errors.expiry && touched.expiry ? errors.expiry : null} </span>

                        <TextField

                            margin="dense"
                            id="name"
                            label="Medicine Description"
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

export default MedReduxForm;