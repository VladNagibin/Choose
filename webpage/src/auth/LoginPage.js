import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

export default function LoginPage() {
    const { login } = useContext(AuthContext)
    const [form, setForm] = useState({
        userLogin: '',
        password: ''
    })
    const changeForm = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }
    return (
        <div>
            <input type='text' name='login' value={form.userLogin} onChange={changeForm}></input>
            <input type='password' name='password' value={form.password} onChange={changeForm}></input>
            <button disabled={!loading} onClick={regUser}>Зарегистрироваться</button>
        </div>
    )
}
