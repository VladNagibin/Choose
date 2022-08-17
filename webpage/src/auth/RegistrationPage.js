import React, { useCallback, useEffect, useState, } from 'react'
import { Navigate } from 'react-router-dom'
import { useHttp } from '../hooks/http.hook'


export default function RegistrationPage() {
    const { request, loading, error,CleanErrors } = useHttp()
    const navigate = Navigate()
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
            alert(data.message)
            navigate('/login')
        } catch (e) {
            alert(error)
            CleanErrors()
        }
    }
    return (
        <div>
            <input type='text' name='login' value={form.login} onChange={changeForm}></input>
            <input type='password' name='password' value={form.password} onChange={changeForm}></input>
            <button disabled = {!loading} onClick={regUser}>Зарегистрироваться</button>
        </div>
    )
}
