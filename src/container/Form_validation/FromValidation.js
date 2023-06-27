import { useFormik } from 'formik';
import React from 'react';
import * as yup from 'yup'

function FromValidation(props) {

    let userSchema = yup.object().shape({
        Fullname: yup.string()
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
        // Fullname: yup.string().matches(/^[A-Za-z ]*$/, 'Please enter valid name').max(10).required("Please enter Name"),
        Email: yup.string().email('Invalid email').required("Please enter Email"),
        Password: yup.string().required("Please enter your password")
            .matches(
                /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
                "Password must contain at least 8 characters, one uppercase, one number and one special case character"
            ),
        // ConfPassword: yup.string().oneOf([yup.ref('Password'), null], 'Passwords must match'),
        ConfPassword: yup
            .string()
            .required("Please enter match Password")
            .test("ConfPassword", "Please must be match", function(val){
                if(this.parent.Password === val){
                    return true;
                } else {
                    return false;
                }
            }),
        PhoneNumber: yup.number().required("please enter your number").test('PhoneNumber', 'Must be exactly 10 number.', (value) => { if (value) { return value.toString().length === 10 } }),
        Age: yup.number().required("Please enter your age").min(0, "You must be at least 0 years").max(150, "You must be at most 150 years"),
        Gender: yup.string().required(),
        Country: yup.string().required(),
        Hobby: yup.array().min(2, "Please enter minimum 2 hobby select ").required().of(yup.string().required()).required(),
        
        // Hobby: yup.array().min(2).of(yup.string().required()).required(),
        Address: yup.string().required('Please enter your massage').test('Address', 'maxmium 5 word allowed.', function (val) {
            let arr = val.split(" ");

            if (arr.length > 5) {
                return false
            } else {
                return true
            }
        }),
        Date: yup.date().max(new Date(), "Enter Valid Date").required(),
        Accept: yup.bool().oneOf([true], 'Accept Terms is required')
    })

    const formik = useFormik({
        initialValues: {
            Fullname: '',
            Email: '',
            Password: '',
            ConfPassword: '',
            PhoneNumber: '',
            Age: '',
            Gender: '',
            Country: '',
            Hobby: '',
            Address: '',
            Date: '',
            Accept: false,
        },

        validationSchema: userSchema,
        onSubmit: values => {
            // alert(JSON.stringify(values, null, 2));

        },
    })


    const { handleBlur, handleChange, handleSubmit, values, errors, touched } = formik
    console.log(errors);

    return (

        <div className="col-lg-8 mt-5 mt-lg-0">
            <form onSubmit={handleSubmit} className="php-email-form">
                <div className="row">
                    <div className="col-md-12 form-group">
                        Fullname:-
                        <input
                            type="text"
                            name="Fullname"
                            className="form-control"
                            id="Fullname"
                            placeholder="Your Name"
                            value={values.Fullname}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <span className='error'>{errors.Fullname && touched.Fullname ? errors.Fullname : ''}</span>
                    </div>

                    <div className="col-md-12 form-group">
                        Email:-
                        <input
                            type="text"
                            name="Email"
                            className="form-control"
                            id="Email"
                            placeholder="Your Email"
                            value={values.Email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <span className='error'>{errors.Email && touched.Email ? errors.Email : ''}</span>

                    </div>

                    <div className="col-md-12 form-group">
                        Password:-
                        <input
                            type="text"
                            name="Password"
                            className="form-control"
                            id="Password"
                            placeholder="Your Password"
                            value={values.Password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <span className='error'>{errors.Password && touched.Password ? errors.Password : ''}</span>
                    </div>

                    <div className="col-md-12 form-group">

                        ConfPassword:-
                        <input
                            type="text"
                            name="ConfPassword"
                            className="form-control"
                            id="ConfPassword"
                            placeholder="Your ConfPassword"
                            value={values.ConfPassword}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <span className='error'>{errors.ConfPassword && touched.ConfPassword ? errors.ConfPassword : ''}</span>
                    </div>

                    <div className="col-md-12 form-group">
                        Phonenumber:-
                        <input
                            id='PhoneNumber'
                            name='PhoneNumber'
                            placeholder='PhoneNumber'
                            type='text'
                            value={values.PhoneNumber}
                            onBlur={handleBlur}
                            onChange={handleChange}
                        /> <br />
                        <span className='error'>{errors.PhoneNumber && touched.PhoneNumber ? errors.PhoneNumber : ''}</span>
                    </div>

                    <div className="col-md-12 form-group">
                        Age:-
                        <input
                            type="number"
                            name="Age"
                            id="Age"
                            placeholder="Your Age"
                            value={values.Age}
                            onChange={handleChange}
                            onBlur={handleBlur}

                        />
                        <span className='error'>{errors.Age && touched.Age ? errors.Age : ''}</span>
                    </div>

                    <div className="col-md-12 form-group">
                        Gender:-
                        <input
                            type="radio"
                            name="Gender"
                            value={"Male"}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />Male
                        <input
                            type="radio"
                            name="Female"
                            value={"Female"}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />Female<br />
                        <span className='error'>{errors.Gender && touched.Gender ? errors.Gender : ''}</span>
                    </div>

                    <div className="col-md-12 form-group">
                        Country:-
                        <select
                            id='Country'
                            name='Country'
                            value={values.Country}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        >

                            <option value="">Select A Country</option>
                            <option value="Surat">Surat</option>
                            <option value="Bardoli">Bardoli</option>
                            <option value="Navsari">Navsari</option>
                        </select><br />
                        <span className='error'>{errors.Country && touched.Country ? errors.Country : ''}</span>
                    </div>

                    <div className="col-md-12 form-group">
                        Hobby:-
                        <input
                            type={"checkbox"}
                            name='Hobby'
                            value={"Music"}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />Music

                        <input
                            type={"checkbox"}
                            name='Hobby'
                            value={"Cricket"}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />Cricket


                        <input
                            type={"checkbox"}
                            name='Hobby'
                            value={"Coding"}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />Coding

                        <input
                            type={"checkbox"}
                            name='Hobby'
                            value={"Gaming"}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />Gaming
                        <span className='error'>{errors.Hobby && touched.Hobby ? errors.Hobby : ''}</span>
                    </div>

                    <div className="col-md-12 form-group">
                        Address:-
                        <textarea
                            className="form-control"
                            name="Address"
                            rows={5}
                            placeholder="Your Address"
                            value={values.Address}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <span className='error'>{errors.Address && touched.Address ? errors.Address : ''}</span>

                    </div>

                    <div className="col-md-12 form-group">
                        Date Of Birth:-
                        <input
                            type="date"
                            name="Date"
                            className="form-control"
                            id="Date"
                        />
                        <span className='error'>{errors.Date && touched.Date ? errors.Date : ''}</span>
                    </div>

                    <div className="col-md-12 form-group">
                        <input
                            name='Accept'
                            id='Accept'
                            type='checkbox'
                            value={values.Accept}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <p>  I agree to the Terms and Conditions</p>
                        <span className='error'>{errors.Accept && touched.Accept ? errors.Accept : ''}</span>
                    </div>

                    <div className="text-center"><button type="submit">Send Message</button></div>
                </div>
            </form>
        </div>
    );
}

export default FromValidation;