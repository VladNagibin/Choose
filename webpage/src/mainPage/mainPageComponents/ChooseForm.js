import React, { useState } from 'react'

export default function ChooseForm({ acceptShops }) {
    const [form, setform] = useState({
        fio: '',
        phone: ''
    })
    function apply() {
        acceptShops(form)
    }
    const formHandler = (event) => {
        setform({ ...form, [event.target.name]: event.target.value })
    }
    return (
        <div className='form'>
            <input type='text' placeholder='ФИО' name='fio' value={form.fio} onChange={formHandler}></input>
            <input type='text' placeholder='Телефон' name='phone' value={form.phone} onChange={formHandler}></input>
            <button onClick={apply}>Подтвердить</button>
        </div>
    )
}
