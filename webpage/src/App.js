import React from 'react'
import './index.css';
import { useRoutes } from './Routes';
import { BrowserRouter } from 'react-router-dom'
import { useAuth } from './hooks/auth.hook';
import { AuthContext } from './context/AuthContext';
import Header from './header/Header';

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
        </div>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
