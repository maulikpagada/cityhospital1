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
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';


function Product(props) {

    const [open, setOpen] = React.useState(false);
    const [data, setdata] = React.useState([]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    React.useEffect(() => {
        let localdata = JSON.parse(localStorage.getItem("product"));

        if (localdata !== null) {
            setdata(localdata)
        }
    }, [])


    const handleAdd = (data) => {
        let localdata = JSON.parse(localStorage.getItem("product"));

        let rno = Math.floor(Math.random() * 100);
        let newData = { id: rno, ...data };

        if (localdata === null) {
            localStorage.setItem("product", JSON.stringify([newData]))
            setdata([newData])
        } else {
            localStorage.setItem("product", JSON.stringify(localdata))
            localdata.push(newData)
            setdata(localdata)
        }
        handleClose()
    }

    let userSchema = yup.object().shape({
        name: yup.string().matches(/^[A-Za-z ]*$/, 'Please enter valid name').max(10).required("Please enter Name"),
        qua: yup.number().required("please enter Quantity").positive().integer(),
        price: yup.number().required("please enter Price").positive().integer(),
        year: yup.number().required("please enter Year").positive().integer(),
    })

    const formik = useFormik({
        initialValues: {
            name: '',
            qua: '',
            price: '',
            year: ''
        },

        validationSchema: userSchema,
        onSubmit: (values, action) => {
            action.resetForm()
            handleAdd(values)
        },
    })

    const handledelete = (id) => {
        let localData = JSON.parse(localStorage.getItem("medicine"));

        let dData = localData.filter((a, i) => a.id !== id)

        localStorage.setItem("medicine", JSON.stringify(dData));

        setdata(dData)
    }

    const columns = [
        { field: 'name', headerName: 'First name', width: 130 },
        { field: 'qua', headerName: 'Quantity', width: 130 },
        { field: 'price', headerName: 'Price', width: 130 },
        { field: 'year', headerName: 'Year', width: 130 },
        {
            field: 'Action',
            headerName: 'Action',
            width: 130,
            renderCell: (params) => (
                <IconButton aria-label="delete" onClick={() => handledelete(params.row.id)}>
                    <DeleteIcon />
                </IconButton>
            )
        }
    ];


    const { handleBlur, handleChange, handleSubmit, values, errors, touched } = formik
    console.log(errors);

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Add Product
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle> Add Product</DialogTitle>
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
                                id="qua"
                                label="Qua"
                                type="number"
                                name='qua'
                                fullWidth
                                variant="filled"

                                value={values.qua}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <span className='error'>{errors.qua && touched.qua ? errors.qua : ''}</span>

                            <TextField
                                margin="dense"
                                id="price"
                                label="price"
                                type="number"
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
                                id="year"
                                label="year"
                                type="number"
                                name='year'
                                fullWidth
                                variant="filled"

                                value={values.year}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <span className='error'>{errors.year && touched.year ? errors.year : ''}</span>

                            <DialogActions>
                                <Button onClick={handleClose}>Cancel</Button>
                                <Button type="submit">Add</Button>
                            </DialogActions>
                        </Form>
                    </Formik>
                </DialogContent>
            </Dialog>

            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={data}
                    columns={columns}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                />
            </div>
        </div>
    );
}

export default Product;