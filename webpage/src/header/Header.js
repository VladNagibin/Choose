import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { AuthContext } from '../context/AuthContext'

export default function Header() {
    const { t } = useTranslation();
    const { isAutheficated, logout } = useContext(AuthContext)
    if (isAutheficated) {
        return (
            <div className='header'>

                <div className='buttons'>
                    <Link to={'/'}><span className="material-symbols-outlined material-icons">
                    <div className='icons-hover'>{t("header.home")}</div>home
                    </span></Link>
                    <Link to={'/table'}><span className="material-symbols-outlined material-icons">
                        add<div className='icons-hover'>{t("header.create")}</div>
                    </span></Link>
                </div>
                <div>
                    <img className='logo' src='/logo.png' />
                </div>
                <div className='buttons'>
                    <Link to={'/profile'}><span className="material-symbols-outlined material-icons">
                        <div className='icons-hover'>{t("header.account")}</div>account_circle
                    </span></Link>
                    <a><span className="material-symbols-outlined material-icons" onClick={() => {
                        logout()
                        toast.info(t("notifications.out"))
                    }}>
                        logout<div className='icons-hover'>{t("header.out")}</div>
                    </span></a>
                </div>


            </div>)
    } else {
        return (
            <div className='header'>
                <div className='buttons'>
                    <Link to={'/'}><span className="material-symbols-outlined material-icons">
                    <div className='icons-hover'>{t("header.home")}</div>home
                    </span></Link>
                </div>
                <div>
                    <img className='logo' src='/logo.png' />
                </div>
                <div className='buttons'>
                    <Link to={'/login'}><span className="material-symbols-outlined material-icons">
                    <div className='icons-hover'>{t("header.login")}</div>login
                    </span></Link>
                    <Link to={'/registration'}><span className="material-symbols-outlined material-icons">
                        app_registration<div className='icons-hover'>{t("header.registration")}</div>
                    </span></Link>
                </div>

            </div>)
    }
}
