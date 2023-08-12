import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

function PrivateRoute(props) {

    // let loginstatus = localStorage.getItem('loginstatus')

    let auth = useSelector(state => state.auth)

    return (
        auth.user ? <Outlet /> : <Navigate to='/auth' replace />
    );
}

export default PrivateRoute;