import React, { useCallback, useEffect, useState, } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useHttp } from '../hooks/http.hook'


export default function RegistrationPage() {
    const { request, loading, error, CleanErrors } = useHttp()
    const navigate = useNavigate()
    const [form, setForm] = useState({
        login: '',
        password: ''
    })
    const changeForm = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }
    async function regUser() {
        try {
            var data = await request('/auth/registration', 'POST', form)
            toast.success(data.message)
            navigate('/login')
        } catch (e) {
            toast.error(error)
            CleanErrors()
        }
    }
    return (
        <div className='container'>
            <div className='authefication'>
                <div className='banner'>

                </div>
                <div className='data'>
                    <div className='logo'>
                        <img className='logo-pic' src='/logo-small.png' />
                    </div>
                    <div className='form'>
                        <input type='text' name='login' value={form.login} onChange={changeForm} placeholder='Логин'></input>
                        <input type='password' name='password' value={form.password} onChange={changeForm} placeholder='Пароль'></input>
                        <button disabled={loading} onClick={regUser}>Зарегистрироваться</button>
                    </div>

                </div>
            </div>
        </div>
    )
}
