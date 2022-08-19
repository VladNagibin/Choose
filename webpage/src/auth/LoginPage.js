import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { AuthContext } from '../context/AuthContext'
import { useHttp } from '../hooks/http.hook'

export default function LoginPage() {
    const { login } = useContext(AuthContext)
    const { request, loading } = useHttp()
    const navigate = useNavigate()
    const [form, setForm] = useState({
        userLogin: '',
        password: ''
    })
    async function enter() {
        var data = await request('/auth/login', 'POST', form)
        try {
            login(data.token, data.userId)
            toast.success('Вы вошли в аккаунт')
            navigate('/')
        } catch (e) {
            toast.error(data.message)
        }
    }
    const changeForm = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
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
                        <input type='text' name='userLogin' id='userLogin' placeholder='Логин' value={form.userLogin} onChange={changeForm}></input>
                        <input type='password' name='password' id='password' placeholder='Пароль' value={form.password} onChange={changeForm}></input>
                        <button disabled={loading} onClick={enter}>Войти</button>
                    </div>

                </div>
            </div>
        </div>
    )
}
