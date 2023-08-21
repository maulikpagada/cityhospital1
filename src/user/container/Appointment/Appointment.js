import React, { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../../../context/ThemeContext';
import * as Yup from 'yup'
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { addApt, aptgetData, deleteApt, getApt, updateApt } from '../../../redux/slice/appointmentSlice';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import BookOnlineIcon from '@mui/icons-material/BookOnline';
import ListIcon from '@mui/icons-material/List';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));



function Appointment(props) {
    const [value, setValue] = React.useState(0);
    const [update, setupdate] = useState(false)

    const dispatch = useDispatch()
    const apt = useSelector(state => state.apt);
    console.log(apt);

    const theme = useContext(ThemeContext)

    useEffect(() => {
        dispatch(getApt())
    }, [])

    const handleDelete = (data) => {
        console.log(data);
        dispatch(deleteApt(data));
    }

    const handleupdate = (data) => {
        console.log(data);
        setupdate(true);
        setValue(0);
        setValues(data);
    }

    const handleChangeTab = (event, newValue) => {
        setValue(newValue);
        console.log(value);
    };


    var d = new Date();
    let nd = new Date(d.setDate(d.getDate() - 1));


    let appointmentSchema = Yup.object({
        name: Yup.string().required('Enter your name'),
        email: Yup.string().email('Please enter valid email').required('Please enter email'),
        phone: Yup.string().required('Please enter your number'),
        date: Yup.date().min(nd, 'enter valid date').required('Please enter date'),
        department: Yup.string().required('Please select your country'),
        msg: Yup.string().required()
            .test('msg', 'maxmium 3 word allowed.',
                function (val) {
                    let arr = val.split(" ")

                    if (arr.length > 3) {
                        return false
                    } else {
                        return true
                    }
                }),
        prec: Yup.mixed().required('Please enter precipitation')
    });

    const formik = useFormik({
        validationSchema: appointmentSchema,
        initialValues: {
            name: '',
            email: '',
            phone: '',
            date: '',
            department: '',
            msg: '',
            prec: '',
        },
        onSubmit: (values, action) => {
            console.log(values);
            setValue(1);
            if (update) {
                dispatch(updateApt(values))
            } else {
                dispatch(addApt(values))
            }
            action.resetForm();
            setupdate(false)
        },
    });

    const { values, errors, touched, handleBlur, handleChange, handleSubmit, setValues, setFieldValue } = formik;

    console.log(errors);



    return (
        <section id="appointment" className={`appointment ${theme.theme}`}>
            <div className="container">
                <div className="section-title">
                    <h2 className={`${theme.theme}`}>Make an Appointment</h2>
                    <p>Aenean enim orci, suscipit vitae sodales ac, semper in ex. Nunc aliquam eget nibh eu euismod. Donec dapibus
                        blandit quam volutpat sollicitudin. Fusce tincidunt sit amet ex in volutpat. Donec lacinia finibus tortor.
                        Curabitur luctus eleifend odio. Phasellus placerat mi et suscipit pulvinar.</p>
                </div>
                <div className='section-title d-flex justify-content-center'>
                    <Tabs value={value} onChange={handleChangeTab} aria-label="icon label tabs example">
                        <Tab icon={<BookOnlineIcon />} label="Book Appiontment" />
                        <Tab icon={<ListIcon />} label="List Appiontment" />
                    </Tabs>
                </div>

                {
                    value === 0 &&
                    <form action method="post" role="form" className="php-email-form" onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-md-4 form-group">
                                <input
                                    type="text"
                                    name="name"
                                    className="form-control"
                                    id="name"
                                    placeholder="Your Name"
                                    value={values.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={errors.name && touched.name ? errors.name : ''}
                                />
                                <div className="validate" />
                                <span className='error'>{errors.name && touched.name ? errors.name : ''}</span>
                            </div>
                            <div className="col-md-4 form-group mt-3 mt-md-0">
                                <input
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    id="email"
                                    placeholder="Your Email"
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={errors.email && touched.email ? errors.email : ''}
                                />
                                <div className="validate" />
                                <span className='error'>{errors.email && touched.email ? errors.email : ''}</span>
                            </div>
                            <div className="col-md-4 form-group mt-3 mt-md-0">
                                <input
                                    type="tel"
                                    className="form-control"
                                    name="phone"
                                    id="phone"
                                    placeholder="Your Phone"
                                    value={values.phone}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={errors.phone && touched.phone ? errors.phone : ''}
                                />
                                <div className="validate" />
                                <span className='error'>{errors.phone && touched.phone ? errors.phone : ''}</span>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4 form-group mt-3">
                                <input
                                    type="date"
                                    name="date"
                                    className="form-control datepicker"
                                    id="date"
                                    placeholder="Appointment Date"
                                    value={values.date}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={errors.date && touched.date ? errors.date : ''}
                                />
                                <div className="validate" />
                                <span className='error'>{errors.date && touched.date ? errors.date : ''}</span>
                            </div>
                            <div className="col-md-4 form-group mt-3">
                                <select
                                    name="department"
                                    id="department"
                                    className="form-select"
                                    value={values.department}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={errors.department && touched.department ? errors.department : ''}
                                >
                                    <option value="">Select Department</option>
                                    <option value="Dep1">Department 1</option>
                                    <option value="Dep2">Department 2</option>
                                    <option value="Dep3">Department 3</option>
                                </select>
                                <div className="validate" />
                                <span className='error'>{errors.department && touched.department ? errors.department : ''}</span>
                            </div>

                            <div className="col-md-4 form-group mt-3">
                                <span>precipitation</span>
                                <input
                                    type='file'
                                    name='prec'
                                    onChange={(event) => setFieldValue("prec", event.target.files[0])}
                                />
                                {
                                    values.prec === '' ? '' : <img src={typeof values.prec === "string" ? values.prec : URL.createObjectURL(values.prec)} width={"50px"} height={"50px"} />
                                }
                                <div className="validate" />
                                <span className='error'>{errors.prec && touched.prec ? errors.prec : ''}</span>
                            </div>
                        </div>
                        <div className="form-group mt-3">
                            <textarea
                                className="form-control"
                                name="msg"
                                rows={5}
                                placeholder="Message (Optional)"
                                defaultValue={""}
                                value={values.msg}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={errors.msg && touched.msg ? errors.msg : ''}
                            />
                            <div className="validate" />
                            <span className='error'>{errors.msg && touched.msg ? errors.msg : ''}</span>
                        </div>
                        <div className="mb-3">
                            <div className="loading">Loading</div>
                            <div className="error-message" />
                            <div className="sent-message">Your appointment request has been sent successfully. Thank you!</div>
                        </div>
                        {/* <div className="text-center"><CustomButton val={'Make an Appointment'} /></div> */}
                        <div className="text-center"><button type="submit">Make an Appointment</button></div>
                    </form>
                }

                {
                    value === 1 &&

                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 700 }} aria-label="customized table">
                            <>
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell>Book Apoointment (Name)</StyledTableCell>
                                        <StyledTableCell >email</StyledTableCell>
                                        <StyledTableCell >Mobile no.</StyledTableCell>
                                        <StyledTableCell >Apt Date</StyledTableCell>
                                        <StyledTableCell >Apt Department</StyledTableCell>
                                        <StyledTableCell >Message</StyledTableCell>
                                        <StyledTableCell >Image</StyledTableCell>
                                        <StyledTableCell >Action</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        apt.apt.map((v) => (
                                            <StyledTableRow >
                                                <StyledTableCell >{v.name}</StyledTableCell>
                                                <StyledTableCell >{v.email}</StyledTableCell>
                                                <StyledTableCell >{v.phone}</StyledTableCell>
                                                <StyledTableCell >{v.date}</StyledTableCell>
                                                <StyledTableCell >{v.department}</StyledTableCell>
                                                <StyledTableCell >{v.msg}</StyledTableCell>
                                                <StyledTableCell ><img src={v.prec} height="70px" width="50px"></img></StyledTableCell>
                                                <IconButton aria-label="delete" onClick={() => handleDelete(v)}>
                                                    <DeleteIcon />
                                                </IconButton>

                                                <IconButton aria-label="edit" onClick={() => handleupdate(v)}>
                                                    <EditIcon />
                                                </IconButton>
                                            </StyledTableRow>
                                        ))
                                    }
                                </TableBody>
                            </>
                        </Table>
                    </TableContainer>
                }
            </div>
        </section>
    );
}

export default Appointment;
