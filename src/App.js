import { Route, Routes } from 'react-router-dom';
import Userroutes from './routes/Userroutes';
import Adminroutes from './routes/Adminroutes';
import PrivateRoute from './routes/PrivateRoute';


function App() {
  return (
    <Routes>
      <Route path='/*' element={<Userroutes />} />
      <Route element={<PrivateRoute />}>
        <Route path='/admin/*' element={<Adminroutes />} />
      </Route>
    </Routes>
  );
}

export default App;