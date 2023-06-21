import React, { useState } from 'react';
import { Form, FormGroup, Container, Label, Input, Button } from 'reactstrap'


function Auth(props) {

    const [Auth, setAuthType] = useState('login')

    return (
        <section id="appointment" className="appointment">
            <div className="container">
                <div className="section-title">
                    <h2>Login/Signup</h2>
                    <p>Aenean enim orci, suscipit vitae sodales ac, semper in ex. Nunc aliquam eget nibh eu euismod. Donec dapibus
                        blandit quam volutpat sollicitudin. Fusce tincidunt sit amet ex in volutpat. Donec lacinia finibus tortor.
                        Curabitur luctus eleifend odio. Phasellus placerat mi et suscipit pulvinar.</p>
                </div>
                <form  className="php-email-form">
                    <div className="row justify-content-center">
                        <div className="col-md-7 form-group">
                            <input type="text" name="name" className="form-control" id="name" placeholder="Your Name" />
                            <div className="validate" />
                        </div>
                        <div className="col-md-7 form-group ">
                            <input type="email" className="form-control" name="email" id="email" placeholder="Your Email" />
                            <div className="validate" />
                        </div>
                        <div className="col-md-7 form-group ">
                            <input type="password" className="form-control" name="password" id="password" placeholder="Your password"/>
                            <div className="validate" />
                        </div>
                    </div>
                    <div className="text-center"><button type="submit">Signup</button></div>
                </form>
            </div>
        </section>

    );
}

export default Auth;