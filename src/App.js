import { Route, Routes } from 'react-router-dom';
import Userroutes from './routes/Userroutes';
import Adminroutes from './routes/Adminroutes';
import PrivateRoute from './routes/PrivateRoute';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import { ThemeProvider } from './context/ThemeContext';
import { persistor, store } from './redux/store';
import Alert from './user/component/Alert/Alert';
import { SnackbarProvider } from 'notistack';
import './rsuite.css';


function App() {

  return (
    <SnackbarProvider maxSnack={3}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ThemeProvider>
            <Alert />
            <Routes>
              <Route path='/*' element={<Userroutes />} />
              <Route element={<PrivateRoute />}>
                <Route path='/admin/*' element={<Adminroutes />} />
              </Route>
            </Routes>
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </SnackbarProvider>
  );
}

export default App;