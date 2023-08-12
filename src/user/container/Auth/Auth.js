import React, { useState } from 'react';
import * as yup from 'yup'
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import Button from '../Ul/Button/Button';
import Input from '../Ul/Input/Input';
import Heading from '../Ul/Heading/Heading';
import { createUserWithEmailAndPassword, onAuthStateChanged, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../firebase';
import { useDispatch, useSelector } from 'react-redux';
import { forgetRequest, loginRequest, signupRequest } from '../../../redux/action/auth.action';
import { CircularProgress } from '@mui/material';


function Auth(props) {
    const dispatch = useDispatch()

    const [authtype, setauthtype] = useState('login');

    const authData = useSelector(state => state.auth);
    console.log(authData);

    let naigate = useNavigate()

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

    const handlelogin = (values) => {


        console.log(values);

        // localStorage.setItem("loginstatus", "true");
        // naigate('/')
        dispatch(loginRequest({
            data:values,
            callback: (route) => {
                naigate(route)
            }
        }))
    };

    const handlerigister = (values) => {
        console.log(values);

        dispatch(signupRequest(values));

    }

    const handleforget = (values) => {
        console.log(values);
        dispatch(forgetRequest(values))

    }


    let authSchema = yup.object(authobj);

    const formik = useFormik({
        initialValues: authval,
        validationSchema: authSchema,
        enableReinitialize: true,
        onSubmit: (values, action) => {
            if (authtype === 'login') {
                handlelogin(values)
            } else if (authtype === 'signup') {
                handlerigister(values)
            } else if (authtype === 'forget') {
                handleforget(values)
            }
            action.resetForm()
        },
    });

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = formik;


    return (
        <section id="appointment" className="appointment">
            <div className="container">
                <div className="section-title">
                    {
                        authtype === 'login' ? <Heading>Login</Heading>
                            : authtype === 'signup' ? <Heading>Signup</Heading> : <Heading>Reset Password</Heading>
                    }
                </div>

                {/* {
                    authData.error ? <p className='error'>{authData.error}</p> : null
                } */}

                {
                    authData.isloading ? <CircularProgress color="secondary" /> :
                        <>
                            <form action method="post" role="form" className="php-email-form" onSubmit={handleSubmit}>
                                <div className="row justify-content-center ">
                                    {
                                        authtype === 'login' || authtype === 'forget' ? null :

                                            <div className="col-md-7 form-group">
                                                <Input
                                                    type="text"
                                                    name="name"
                                                    id="name"
                                                    value={values.name}
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    placeholder="Your Name"
                                                    errorText={errors.name && touched.name ? errors.name : ''}
                                                />
                                                <div className="validate" />
                                                {/* <span className='error'>{errors.name && touched.name ? errors.name : ''}</span> */}
                                            </div>
                                    }
                                    <div className="col-md-7 form-group mt-3 mt-md-0">
                                        <Input
                                            type="email"
                                            name="email" id="email"
                                            value={values.email}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            placeholder="Your Email"
                                            errorText={errors.email && touched.email ? errors.email : ''}
                                        />
                                        <div className="validate" />
                                        {/* <span className='error'>{errors.email && touched.email ? errors.email : ''}</span> */}
                                    </div>
                                    {
                                        authtype !== 'forget' ? <div className="col-md-7 form-group mt-3 mt-md-0">
                                            <Input
                                                type="password"
                                                name="password"
                                                id="password"
                                                value={values.password}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                placeholder="Your Password"
                                                errorText={errors.password && touched.password ? errors.password : ''}
                                            />
                                            <div className="validate" />
                                            {/* <span className='error'>{errors.password && touched.password ? errors.password : ''}</span> */}
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
                                    authtype === 'login' ? <div className="text-center"><Button type="primary" >Login</Button></div>
                                        : authtype === 'signup' ? <div className="text-center"><Button type="secondary" >Signup</Button></div>
                                            : <div className="text-center"><Button type="outlined">Send OTP</Button></div>
                                }

                                <div className="text-center m-2">
                                    {
                                        authtype === 'login' ? <span>Don't have an account <a href='#' onClick={() => setauthtype('signup')}>Signup</a></span>
                                            : <span>Already have an account <a href='#' onClick={() => setauthtype('login')}>Login</a></span>
                                    }
                                </div>

                            </form>

                        </>
                }
            </div>
        </section>

    );
}

export default Auth;