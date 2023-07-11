import React from 'react';
import { Baseinput, Inputerror } from './Input.style';

function Input({ className = "form-control", errorText = { errorText }, ...rest }) {
    return (
        <>
            <Baseinput
                className="form-control"
                errorText={errorText}
                {...rest}
            />

            <Inputerror errorText={errorText}>
                {errorText}
            </Inputerror>
        </>
    );
}

export default Input;