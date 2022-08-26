import React from 'react'
import './index.css';
import { useRoutes } from './Routes';
import { BrowserRouter } from 'react-router-dom'
import { useAuth } from './hooks/auth.hook';
import { AuthContext } from './context/AuthContext';
import { ToastContainer} from 'react-toastify';
import { useTranslation } from "react-i18next";
import Header from './header/Header';
import 'react-toastify/dist/ReactToastify.css';
import Loader from './loader/Loader';
import Footer from './footer/Footer';

function App() {
  const { t, i18n } = useTranslation();
  // console.log(i18n.language)
  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };

  const { login, logout, userId, token, ready } = useAuth()
  var isAutheficated = !!token
  const routes = useRoutes(isAutheficated)
  if(!ready){
    return <Loader/>
  }
  return (
    <AuthContext.Provider value={{
      login, logout, userId, token, isAutheficated
    }}>
      <button onClick={() => changeLanguage("en")}>EN</button>
      <button onClick={() => changeLanguage("ru")}>RU</button>
      <div>{t("test")}</div>
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
