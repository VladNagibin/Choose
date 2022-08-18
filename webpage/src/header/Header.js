import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

export default function Header() {
    const { isAutheficated, logout } = useContext(AuthContext)
    if (isAutheficated) {
        return (
            <div className='header'>

                <div className='buttons'>
                    <Link to={'/'}><span className="material-symbols-outlined material-icons">
                        home
                    </span></Link>
                    <Link to={'/table'}><span className="material-symbols-outlined material-icons">
                        add
                    </span></Link>
                </div>
                <div>
                    <img className='logo' src='/logo.png' />
                </div>
                <div className='buttons'>
                    <Link to={'/profile'}><span className="material-symbols-outlined material-icons">
                        account_circle
                    </span></Link>
                    <span className="material-symbols-outlined material-icons" onClick={logout}>
                        logout
                    </span>
                </div>


            </div>)
    } else {
        return (
            <div>
                <Link to={'/'}><span className="material-symbols-outlined material-icons">
                    home
                </span></Link>
                <Link to={'/login'}><span className="material-symbols-outlined material-icons">
                    login
                </span></Link>
                <Link to={'/registration'}><span className="material-symbols-outlined material-icons">
                    app_registration
                </span></Link>
            </div>)
    }
}
