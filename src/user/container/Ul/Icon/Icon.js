import React from 'react';
import { Icons } from './Icon.style';

function Icon({...rest}) {
    return (
        <Icons {...rest}/>
       
    );
}

export default Icon;