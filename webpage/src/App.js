import React from 'react'
import './index.css';
import { useRoutes } from './Routes';
import { BrowserRouter } from 'react-router-dom'
import { useAuth } from './hooks/auth.hook';
import { AuthContext } from './context/AuthContext';
import { ToastContainer} from 'react-toastify';
import Header from './header/Header';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const { login, logout, userId, token, ready } = useAuth()
  var isAutheficated = !!token
  const routes = useRoutes(isAutheficated)
  return (
    <AuthContext.Provider value={{
      login, logout, userId, token, isAutheficated
    }}>

      <BrowserRouter>

        <div className='app'>
          <Header />
          {routes}
          <ToastContainer />
        </div>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
