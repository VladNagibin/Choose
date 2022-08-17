import React, { useContext,useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { useHttp } from '../hooks/http.hook'

export default function LoginPage() {
    const { login } = useContext(AuthContext)
    const {request,loading} = useHttp()
    const navigate = useNavigate()
    const [form, setForm] = useState({
        userLogin: '',
        password: ''
    })
    async function enter(){
        var data = await request('/auth/login','POST',form)
        try{
            alert(data.message)
            login(data.token,data.userId)
            navigate('/')
        }catch(e){
            alert(data.message)
        }
    }
    const changeForm = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }
    return (
        <div>
            <input type='text' name='userLogin' value={form.userLogin} onChange={changeForm}></input>
            <input type='password' name='password' value={form.password} onChange={changeForm}></input>
            <button disabled={loading} onClick={enter}>Войти</button>
        </div>
    )
}
