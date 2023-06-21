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
      </Routes>
      <Footer />
    </>
  );
}

export default App;