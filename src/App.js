import Header from './component/Header';
import Footer from './component/Footer';
import Home from './container/Home/Home';
import { Route, Routes } from 'react-router-dom';
import About from './container/About/About';
import Appointment from './container/Appointment/Appointment';
import Contact from './container/Contact/Contact';
import Departments from './container/Departments/Departments';
import Doctors from './container/Doctors/Doctors';
import Doctor from './container/Doctor/Doctor';
import VistingDoctor from './container/Visting_Doctor/VistingDoctor';
import NotFound from './container/NotFound/NotFound';
import Auth from './container/Auth/Auth';

function App() {
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
        <Route path='*' element={<NotFound />}/>
        <Route path='/auth' element={<Auth />} />

        {/* <Route path='/doctor'>
          <Route path='/doctor/:id' element={<Doctor />} />
          <Route path='/doctor/vistingdoctor' element={<VistingDoctor />} />
        </Route> */}
      </Routes>
      <Footer />
    </>
  );
}

export default App;