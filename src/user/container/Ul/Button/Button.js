import React from 'react';
import { outlinedbutton, primarybutton, secondarybutton } from './Button.style';

function Button({ children, type, ondisabled=false}) {

    const checktype = () => {
        switch (type) {
            case 'primary':
                return primarybutton

            case 'secondary':
                return secondarybutton

            case 'outlined':
                return outlinedbutton

            default:
                return primarybutton
        }
    }

    const Custombtn = checktype();

    return (
        <Custombtn disabled={ondisabled}>
            {children}
        </Custombtn>
    );
}

export default Button;