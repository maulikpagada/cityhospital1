import Header from '../user/component/Header'
import Footer from '../user/component/Footer';
import Home from '../user/container/Home/Home';
import { Route, Routes } from 'react-router-dom';
import About from '../user/container/About/About';
import Appointment from '../user/container/Appointment/Appointment';
import Contact from '../user/container/Contact/Contact';
import Departments from '../user/container/Departments/Departments';
import Doctors from '../user/container/Doctors/Doctors';
import Doctor from '../user/container/Doctor/Doctor';
import VistingDoctor from '../user/container/Visting_Doctor/VistingDoctor';
import NotFound from '../user/container/NotFound/NotFound';
import Auth from '../user/container/Auth/Auth';
import FromValidation from '../user/container/Form_validation/FromValidation';
import Medicine from '../user/container/Medicine/Medicine';
import PrivateRoute from './PrivateRoute';
import Counter from '../user/container/Counter/Counter';
import { configureStore } from '../redux/store';
import { Provider, useSelector } from 'react-redux';
import Cart from '../user/container/Cart/Cart';
import Cart1 from '../user/container/Cart1/Cart1';
import Medicine1 from '../user/container/Medicine1/Medicine1';
import Myfav from '../user/container/myFav/Myfav';
import { useState } from 'react';
import CallBackExa from '../user/container/Examples/CallBackExa';
import UseRefEmaple from '../user/container/Examples/UseRefEmaple';
import QuizApp from '../user/QuizApp';
// import PrivateRoute from '../utils/PrivateRoute';

function Userroutes(props) {
    const [cartcount, setcartcount] = useState(0);


    return (
        <>
            <Header cartcount1={cartcount} />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/about' element={<About />} />
                <Route path='/contact' element={<Contact />} />
                <Route path='/departments' element={<Departments />} />
                <Route path='/doctors' element={<Doctors />} />
                <Route path='/doctor/:id' element={<Doctor />} />
                <Route path='/doctor/vistingdoctor' element={<VistingDoctor />} />
                <Route path='*' element={<NotFound />} />

                <Route path='/formvalidation' element={<FromValidation />} />

                <Route path='/doctor'>
                    <Route path='/doctor/:id' element={<Doctor />} />
                    <Route path='/doctor/vistingdoctor' element={<VistingDoctor />} />
                </Route>

                <Route element={<PrivateRoute />}>
                    <Route path='/medicine' element={<Medicine />} />
                    <Route path='/medicine1' element={<Medicine1 setcartcount={setcartcount} />} />
                    <Route path='/appointment' element={<Appointment />} />

                </Route>
                <Route path='/auth' element={<Auth />} />
                {/* <Route path='/counter' element={<Counter />} /> */}
                {/* <Route path='/CallBackExa' element={<CallBackExa />} /> */}
                <Route path='/UseRefEmaple' element={<UseRefEmaple />} />
                <Route path='/cart' element={<Cart />} />
                <Route path='/cart1' element={<Cart1 />} />
                <Route path='/myfav' element={<Myfav />} />
                <Route path='/QUZ' element={<QuizApp />} />
            </Routes>
            <Footer />
        </>
    );
}

export default Userroutes;