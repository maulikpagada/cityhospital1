import React, { useContext } from 'react';
import { ThemeContext } from '../../../context/ThemeContext';
import * as Yup from 'yup'
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { addApt } from '../../../redux/slice/appointmentSlice';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

function Appointment(props) {
    const [value, setValue] = React.useState(0);

    const handleChangee = (event, newValue) => {
        setValue(newValue);
    };
    const dispatch = useDispatch()
    const theme = useContext(ThemeContext)

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
            dispatch(addApt(values))
            action.resetForm();
        },
    });

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = formik;



    return (
        <section id="appointment" className={`appointment ${theme.theme}`}>
            <div className="container">
                <div className="section-title">
                    <h2 className={`${theme.theme}`}>Make an Appointment
                    <Tabs value={value} onChange={handleChangee} aria-label="icon label tabs example">
                        <Tab 
                            icon={<FavoriteIcon />} 
                            label="FAVORITES"
                            />
                    </Tabs>
                    </h2>
                    
                    <p>Aenean enim orci, suscipit vitae sodales ac, semper in ex. Nunc aliquam eget nibh eu euismod. Donec dapibus
                        blandit quam volutpat sollicitudin. Fusce tincidunt sit amet ex in volutpat. Donec lacinia finibus tortor.
                        Curabitur luctus eleifend odio. Phasellus placerat mi et suscipit pulvinar.</p>
                </div>
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
            </div>
        </section>

    );
}

export default Appointment;
