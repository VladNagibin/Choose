import React, { useCallback, useEffect } from 'react'
import './index.css';
import { useRoutes } from './Routes';
import { BrowserRouter } from 'react-router-dom'
import { useAuth } from './hooks/auth.hook';
import { AuthContext } from './context/AuthContext';
import { ToastContainer } from 'react-toastify';
import { useTranslation } from "react-i18next";
import Header from './header/Header';
import 'react-toastify/dist/ReactToastify.css';
import Loader from './loader/Loader';
import Footer from './footer/Footer';
import { UseLanguage } from './hooks/language.hook';

function App() {


  const { changeLanguage, language, readyLanguage } = UseLanguage()
  const { login, logout, userId, token, ready } = useAuth()
  var isAutheficated = !!token
  const routes = useRoutes(isAutheficated)
  if (!ready || !readyLanguage) {
    return <Loader />
  }

  return (
    <AuthContext.Provider value={{
      login, logout, userId, token, isAutheficated
    }}>
      <div className='language'>
        <div>{language}</div>
        <button onClick={() => changeLanguage("en")}>EN</button>
        <button onClick={() => changeLanguage("ru")}>RU</button>
      </div>
      <BrowserRouter>

        <div className='app'>
          <Header />
          {routes}
          <ToastContainer />
          <Footer />
        </div>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
