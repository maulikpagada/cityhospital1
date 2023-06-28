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

function Userroutes(props) {
    return (
        <>
            <Header />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/about' element={<About />} />
                <Route path='/appointment' element={<Appointment />} />
                <Route path='/contact' element={<Contact />} />
                <Route path='/departments' element={<Departments />} />
                <Route path='/doctors' element={<Doctors />} />
                <Route path='/doctor/:id' element={<Doctor />} />
                <Route path='/doctor/vistingdoctor' element={<VistingDoctor />} />
                <Route path='*' element={<NotFound />} />
                <Route path='/auth' element={<Auth />} />
                <Route path='/formvalidation' element={<FromValidation />} />

                <Route path='/doctor'>
                    <Route path='/doctor/:id' element={<Doctor />} />
                    <Route path='/doctor/vistingdoctor' element={<VistingDoctor />} />
                </Route>
            </Routes>
            <Footer />
        </>
    );
}

export default Userroutes;