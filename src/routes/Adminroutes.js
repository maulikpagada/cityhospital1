import React from 'react';
import Layout from '../admin/component/Layout/Layout';
import { Route, Routes } from 'react-router-dom';
import Product from '../admin/container/Product/Product';
import Medicine from '../admin/container/Medicine/Medicine';
import Dashbord from '../admin/container/Dashbord';

function Adminroutes(props) {
    return (
        <Layout>
            <Routes>
                
            <Route path='/' element={<Dashbord />} />
                {/* <Route path='/Doctor' element={<Doctor />} /> */}
                <Route path='/Product' element={<Product />} />
                <Route path='/Medicine' element={<Medicine />} />
                {/* <Route path='/Appointment' element={<Appointment />} /> */}
            </Routes>
        </Layout>
    );
}

export default Adminroutes;