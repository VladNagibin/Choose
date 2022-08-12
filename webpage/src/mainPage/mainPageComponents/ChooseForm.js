import React, { useEffect, useState } from 'react'

export default function ChooseForm({ acceptShops,userFields }) {
    const [form, setform] = useState({})
    function setFormFields(){
        var newForm = {}
        userFields.forEach(field=>{
            newForm[field.name] = null
        })
        setform(newForm)
    }
    function apply() {
        acceptShops(form)
    }
    const formHandler = (event) => {
        setform({ ...form, [event.target.name]: event.target.value })
    }
    useEffect(()=>{
        setFormFields()
    },[])
    return (
        <div className='form'>
            {
                userFields.map(field=>{
                    return <input type={field.type} placeholder={field.header} name={field.name} value={form[field.name]} onChange={formHandler}></input>
                })
            }
            <button onClick={apply}>Подтвердить</button>
        </div>
    )
}
