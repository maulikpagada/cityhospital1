import React from 'react';
import Layout from '../admin/component/Layout/Layout';
import { Route, Routes } from 'react-router-dom';
import Doctor from '../admin/container/Doctor/Doctor';
import Product from '../admin/container/Product/Product';
import Medicine from '../admin/container/Medicine/Medicine';
import Appointment from '../admin/container/Appointment/Appointment';

function Adminroutes(props) {
    return (
        <Layout>
            <Routes>
                {/* <Route path='/Doctor' element={<Doctor />} /> */}
                <Route path='/Product' element={<Product />} />
                <Route path='/Medicine' element={<Medicine />} />
                {/* <Route path='/Appointment' element={<Appointment />} /> */}
            </Routes>
        </Layout>
    );
}

export default Adminroutes;