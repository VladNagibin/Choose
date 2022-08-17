import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

export default function Header() {
    const { isAutheficated, logout } = useContext(AuthContext)
    if (isAutheficated) {
        return (
            <div>
                <Link to={'/table'}><span className="material-symbols-outlined material-icons">
                    add
                </span></Link>
                <span className="material-symbols-outlined material-icons" onClick={logout}>
                    logout
                </span>
            </div>)
    } else {
        return (
            <div>
                {/* <Link to={'/settings'}><span class="material-symbols-outlined material-icons">
                    settings
                </span></Link> */}
                <Link to={'/login'}><span className="material-symbols-outlined material-icons">
                    login
                </span></Link>
                <Link to={'/registration'}><span className="material-symbols-outlined material-icons">
                    app_registration
                </span></Link>
            </div>)
    }
}
