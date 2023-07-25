import React from 'react';
import Layout from '../admin/component/Layout/Layout';
import { Route, Routes } from 'react-router-dom';
import Product from '../admin/container/Product/Product';
import Medicine from '../admin/container/Medicine/Medicine';
import Dashbord from '../admin/container/Dashbord';
import Doctors from '../admin/container/Doctors/Doctors';
import { configureStore } from '../redux/store';
import { Provider } from 'react-redux';
import MedRedux from '../admin/container/MedRedux/MedRedux';

function Adminroutes(props) {
    let store = configureStore()
    return (
        <Provider store={store}>
        <Layout>
            <Routes>

                <Route path='/' element={<Dashbord />} />
                <Route path='/Doctors' element={<Doctors />} />
                <Route path='/Product' element={<Product />} />
                <Route path='/Medicine' element={<Medicine />} />
                <Route path='MedRedux' element={<MedRedux />} />
                {/* <Route path='/Appointment' element={<Appointment />} /> */}
            </Routes>
        </Layout>
        </Provider>
    );
}

export default Adminroutes;