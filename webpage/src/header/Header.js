import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { AuthContext } from '../context/AuthContext'

export default function Header() {
    const { isAutheficated, logout } = useContext(AuthContext)
    if (isAutheficated) {
        return (
            <div className='header'>

                <div className='buttons'>
                    <Link to={'/'}><span className="material-symbols-outlined material-icons">
                    <div className='icons-hover'>Домой</div>home
                    </span></Link>
                    <Link to={'/table'}><span className="material-symbols-outlined material-icons">
                        add<div className='icons-hover'>Создать</div>
                    </span></Link>
                </div>
                <div>
                    <img className='logo' src='/logo.png' />
                </div>
                <div className='buttons'>
                    <Link to={'/profile'}><span className="material-symbols-outlined material-icons">
                        <div className='icons-hover'>Аккаунт</div>account_circle
                    </span></Link>
                    <a><span className="material-symbols-outlined material-icons" onClick={() => {
                        logout()
                        toast.info('Вы вышли из аккаунта')
                    }}>
                        logout<div className='icons-hover'>Выйти</div>
                    </span></a>
                </div>


            </div>)
    } else {
        return (
            <div className='header'>
                <div className='buttons'>
                    <Link to={'/'}><span className="material-symbols-outlined material-icons">
                    <div className='icons-hover'>Домой</div>home
                    </span></Link>
                </div>
                <div>
                    <img className='logo' src='/logo.png' />
                </div>
                <div className='buttons'>
                    <Link to={'/login'}><span className="material-symbols-outlined material-icons">
                    <div className='icons-hover'>Вход</div>login
                    </span></Link>
                    <Link to={'/registration'}><span className="material-symbols-outlined material-icons">
                        app_registration<div className='icons-hover'>Регистрация</div>
                    </span></Link>
                </div>

            </div>)
    }
}
