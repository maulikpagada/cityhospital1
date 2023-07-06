import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

function PrivateRoute(props) {

    let loginstatus = localStorage.getItem('loginstatus')

    return (
        loginstatus ? <Outlet /> : <Navigate to='/auth' replace />
    );
}

export default PrivateRoute;