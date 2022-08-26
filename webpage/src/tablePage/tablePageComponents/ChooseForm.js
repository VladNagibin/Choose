import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';

export default function ChooseForm({ acceptShops,userFields }) {
    const [form, setform] = useState({})
    const { t } = useTranslation();

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
        <div className='form choose-form'>
            {
                userFields.map(field=>{
                    return <input key={field.name} type={field.type} placeholder={field.header} name={field.name} value={form[field.name]?form[field.name]:''} onChange={formHandler}></input>
                })
            }
            <button onClick={apply}>{t("table.apply")}</button>
        </div>
    )
}
