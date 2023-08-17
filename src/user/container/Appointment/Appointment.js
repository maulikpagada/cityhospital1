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

    const handleDelete = (id) => {
        console.log(id);
        dispatch(deleteApt(id));
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

    const { values, errors, touched, handleBlur, handleChange, handleSubmit,setValues } = formik;



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

                    <>
                        <h2>List Appiontment</h2>
                        <div className='row'>
                            {
                                apt.apt.map((a, i) => {
                                    return (
                                        <div className='col-md-3'>
                                            <p>{a.id} - {a.name}</p>
                                            {/* Email:-<p>{a.email}</p>
                                            Phone:-<p>{a.phone}</p>
                                            Date:-<p>{a.date}</p>
                                            Department:-<p>{a.department}</p>
                                            Msg:-<p>{a.msg}</p> */}
                                            <IconButton aria-label="delete" onClick={() => handleDelete(a.id)}>
                                                <DeleteIcon />
                                            </IconButton>

                                            <IconButton aria-label="edit" onClick={() => handleupdate(a)}>
                                                <EditIcon />
                                            </IconButton>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </>
                }
            </div>
        </section>
    );
}

export default Appointment;
