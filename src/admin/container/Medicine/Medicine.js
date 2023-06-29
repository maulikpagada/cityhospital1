import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import * as yup from 'yup'
import { Form, Formik, useFormik } from 'formik';


function Medicine(props) {

    let userSchema = yup.object().shape({
        name: yup.string().matches(/^[A-Za-z ]*$/, 'Please enter valid name').max(10).required("Please enter Name"),
        e_date:yup.date().max(new Date(), "Enter Valid Date").required(),
        price: yup.number().required("please enter Price").positive().integer(),
        Description: yup.string().required('Please enter your massage').test('Description', 'maxmium 5 word allowed.', function (val) {
            let arr = val.split(" ");

            if (arr.length > 10) {
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

        validationSchema: userSchema,
        onSubmit: values => {
            // alert(JSON.stringify(values, null, 2));

        },
    })

    const { handleChange, handleBlur, handleSubmit, values, errors, touched } = formik


    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Add  Medicine
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle> Add  Medicine</DialogTitle>
                <DialogContent>
                    <Formik values={formik}>
                        <Form onSubmit={handleSubmit}>
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
                        </Form>
                    </Formik>
                </DialogContent>

            </Dialog>
        </div>
    );
}

export default Medicine;