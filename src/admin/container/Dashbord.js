import React from 'react';
import { useNavigate } from 'react-router-dom';

function Dashbord(props) {
    
    let naigate = useNavigate()

    return (
        <div>
            <h1>Welcome to Dashbord</h1>
        </div>
    );
}

export default Dashbord;