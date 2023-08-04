import { Route, Routes } from 'react-router-dom';
import Userroutes from './routes/Userroutes';
import Adminroutes from './routes/Adminroutes';
import PrivateRoute from './routes/PrivateRoute';
import { configureStore } from './redux/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import { ThemeProvider } from './context/ThemeContext';


function App() {

  let { store, persistor } = configureStore()
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider>
          <Routes>
            <Route path='/*' element={<Userroutes />} />
            <Route element={<PrivateRoute />}>
              <Route path='/admin/*' element={<Adminroutes />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;