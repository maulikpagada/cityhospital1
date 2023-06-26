import React, { useState } from 'react';
import * as Yup from 'yup'
import { useFormik } from 'formik';


function Auth(props) {

    const [authtype, setauthtype] = useState('login');

    let authSchema = Yup.object({
        name: Yup.string().required('Please enter your name').matches(/^[A-Za-z ]*$/, 'Please enter only Char'),
        email: Yup.string().email('Please enter valid email').required('Please enter your email'),
        password: Yup.string().required('Please enter your password'),
    });

    const formik = useFormik({
        validationSchema: authSchema,
        initialValues: {
            name: '',
            email: '',
            password: '',
        },
        onSubmit: values => {
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
                                    <input type="text"
                                        name="name"
                                        className="form-control"
                                        id="name"
                                        value={values.name}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="Your Name"
                                    />
                                    <div className="validate" />
                                    <span className='err'>{errors.name && touched.name ? errors.name : ''}</span>
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
                            <span className='err'>{errors.email && touched.email ? errors.email : ''}</span>
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
                                <span className='err'>{errors.password && touched.password ? errors.password : ''}</span>
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