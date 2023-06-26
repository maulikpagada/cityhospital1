import React, { useState } from 'react';
import * as yup from 'yup'
import { useFormik } from 'formik';


function Auth(props) {

    const [authtype, setauthtype] = useState('login');

    let authobj = {}; let authval = {}

    if (authtype === 'login') {
        authobj = {
            email: yup.string().email('Please enter valid email').required('Please enter your email'),
            password: yup.string().required("Please enter your password")
            .matches(
                /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
                "Password must contain at least 8 characters, one uppercase, one number and one special case character"
            ),
        }

        authval = {
            email: '',
            password: '',
        }
    } else if (authtype === 'signup') {
        authobj = {
            name: yup.string()
                .min(2)
                .max(40)
                .matches(/^[A-Za-z ]*$/, 'Please enter valid name')
                .test("Fullname", "Enter valid name", function (value) {
                    let arr = value.split(" ");

                    if (arr.length > 3) {
                        return false
                    } else if (arr.length > 3) {
                        return false
                    } else {
                        return true
                    }
                })
                .required(),
            email: yup.string().email('Please enter valid email').required('Please enter your email'),
            password: yup.string().required("Please enter your password")
            .matches(
                /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
                "Password must contain at least 8 characters, one uppercase, one number and one special case character"
            ),
        }
        authval = {
            name: '',
            email: '',
            password: '',
        }
    } else {
        authobj = {
            email: yup.string().email('Please enter valid email').required('Please enter your email'),
        }
        authval = {
            email: '',
        }
    }

    let authSchema = yup.object(authobj);

    const formik = useFormik({
        initialValues: authval,
        validationSchema: authSchema,
        enableReinitialize: true,
        onSubmit: (values, action) => {
            action.resetForm()
            console.log(values);
        },
    });

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = formik;


    return (
        <section id="appointment" className="appointment">
            <div className="container">
                <div className="section-title">
                    {
                        authtype === 'login' ? <h2>Login</h2>
                            : authtype === 'signup' ? <h2>Signup</h2> : <h2>Reset Password</h2>
                    }
                </div>
                <form action method="post" role="form" className="php-email-form" onSubmit={handleSubmit}>
                    <div className="row justify-content-center ">
                        {
                            authtype === 'login' || authtype === 'forget' ? null :

                                <div className="col-md-7 form-group">
                                    <input
                                        type="text"
                                        name="name"
                                        className="form-control"
                                        id="name"
                                        value={values.name}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="Your Name"
                                    />
                                    <div className="validate" />
                                    <span className='error'>{errors.name && touched.name ? errors.name : ''}</span>
                                </div>
                        }
                        <div className="col-md-7 form-group mt-3 mt-md-0">
                            <input type="email"
                                className="form-control"
                                name="email" id="email"
                                value={values.email}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                placeholder="Your Email"
                            />
                            <div className="validate" />
                            <span className='error'>{errors.email && touched.email ? errors.email : ''}</span>
                        </div>
                        {
                            authtype !== 'forget' ? <div className="col-md-7 form-group mt-3 mt-md-0">
                                <input type="password"
                                    className="form-control"
                                    name="password"
                                    id="password"
                                    value={values.password}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    placeholder="Your Password"
                                />
                                <div className="validate" />
                                <span className='error'>{errors.password && touched.password ? errors.password : ''}</span>
                            </div> : null
                        }
                        <div className="text-center m-2">
                            {
                                authtype === 'login' ? <a href='#' onClick={(() => setauthtype('forget'))}>Forgot password?</a>
                                    : null
                            }
                        </div>
                    </div>
                    {
                        authtype === 'login' ? <div className="text-center"><button type="submit">Login</button></div>
                            : authtype === 'signup' ? <div className="text-center"><button type="submit">Signup</button></div>
                                : <div className="text-center"><button type="submit">Send OTP</button></div>
                    }
                    <div className="text-center m-2">
                        {
                            authtype === 'login' ? <span>Don't have an account <a href='#' onClick={() => setauthtype('signup')}>Signup</a></span>
                                : <span>Already have an account <a href='#' onClick={() => setauthtype('login')}>Login</a></span>
                        }
                    </div>
                </form>
            </div>
        </section>

    );
}

export default Auth;