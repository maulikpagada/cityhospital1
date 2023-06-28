import { Route, Routes } from 'react-router-dom';
import Layout from './admin/component/Layout/Layout';
import Userroutes from './routes/Userroutes';
import Adminroutes from './routes/Adminroutes';


function App() {
  return (
      <Routes>
        <Route path='/*' element={<Userroutes />} />
        <Route path='/admin/*' element={<Adminroutes />} />
      </Routes>
  );
}

export default App;