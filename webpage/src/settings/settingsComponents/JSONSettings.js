import React, { useContext, useRef, useState } from 'react'
import JSONFields from '../../JSONfields/JSONFields'
import { v4 as uuidv4 } from 'uuid';
import UserFields from '../../userFields/UserFields';
import { useHttp } from '../../hooks/http.hook';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

export default function JSONSettings({ data, fields }) {
    const { request } = useHttp()
    const { t } = useTranslation();
    const { userId } = useContext(AuthContext)
    const [userFields, SetUserFields] = useState([])
    const [form, SetForm] = useState({
        toChoose: 0,
        description: '',
        name: '',
        maxInCard: 0,
        hideFilled: false
    })
    const userFieldNameRef = useRef()
    const userFieldTypeRef = useRef()
    const userFieldHeaderRef = useRef()
    const navigate = useNavigate()

    function getFields() {
        var fieldSettings = []
        fields.forEach(field => {
            var tr = document.getElementById(field.id)
            var tds = tr.getElementsByTagName('td')
            var inputs = tr.getElementsByTagName('input')
            fieldSettings.push({
                id: field.id,
                name: tds[0].innerHTML,
                header: inputs[0].value,
                show: inputs[1].checked,
                sort: inputs[2].checked,
                key: inputs[3].checked
            })

        })
        return fieldSettings
        // SetFieldSettings(fieldSettings)
    }

    const formHandler = event => {
        SetForm({ ...form, [event.target.name]: event.target.value })
        console.log(event.target)
    }

    function handleAddUserField() {
        const name = userFieldNameRef.current.value
        const header = userFieldHeaderRef.current.value
        const type = userFieldTypeRef.current.value
        if (name == "" || type == "") {
            toast.warn('Заполните оба поля')
            return
        }
        SetUserFields(prevUserFields => {
            return [...prevUserFields, { id: uuidv4(), header: header, name: name, type: type }]
        })
        userFieldNameRef.current.value = ''
        userFieldTypeRef.current.value = ''
        userFieldHeaderRef.current.value = ''
    }
    function deleteUserField(id) {
        var newUserFields = [...userFields]
        var index = userFields.findIndex(el => el.id === id)
        SetUserFields([...newUserFields.slice(0, index), ...newUserFields.slice(index + 1)])
    }
    function hideFilledHandler() {
        SetForm({ ...form, hideFilled: !form.hideFilled })
    }
    async function CreateNewTable() {
        try {
            var reqData = await request('/settings/createNewtable', 'POST', {
                fields: getFields(),
                userFields,
                settings: form,
                data,
                userId
            })
            navigate('/table/' + reqData.tableId)
        } catch (e) {
            toast.error(e)
        }



    }


    return (
        <div>
            <h1>{t("new-table.JSON-settings.h1")}</h1>
            <div>
                <JSONFields fields={fields} />
                <div className='user-fields'>
                    <h2>{t("new-table.JSON-settings.user-fields.h2")}</h2>
                    <input ref={userFieldNameRef} placeholder={t("new-table.JSON-settings.JSON-field.name")} type='text' className='user-field-input' />
                    <input ref={userFieldHeaderRef} placeholder={t("new-table.JSON-settings.JSON-field.header")} className='user-field-input' type='text' />
                    <select ref={userFieldTypeRef} >
                        {/* <option disabled>Тип данных</option> */}
                        <option value='text'>{t("new-table.JSON-settings.user-fields.options.text")}</option>
                        <option value='number'>{t("new-table.JSON-settings.user-fields.options.number")}</option>
                        <option value='data'>{t("new-table.JSON-settings.user-fields.options.date")}</option>
                        <option value='checkbox'>{t("new-table.JSON-settings.user-fields.options.checkbox")}</option>
                        <option value='email'>{t("new-table.JSON-settings.user-fields.options.email")}</option>
                        <option value='color'>{t("new-table.JSON-settings.user-fields.options.color")}</option>
                    </select>
                    {/* <input ref={userFieldTypeRef} placeholder='Тип данных' type='text' /> */}
                    <button onClick={handleAddUserField} className='user-field-button'>{t("new-table.JSON-settings.user-fields.add-button")}</button>
                    <UserFields userFields={userFields} deleteUserField={deleteUserField} />
                </div>
                <div className='last-settings'>
                    <h2>{t("new-table.JSON-settings.last-settings.h2")}</h2>
                    <div>
                        <label htmlFor='name'>{t("new-table.JSON-settings.last-settings.name")}</label>
                        <input id='name' name='name' type='text' value={form.name} onChange={formHandler} />
                    </div>
                    <div>
                        <label htmlFor='description'>{t("new-table.JSON-settings.last-settings.description")}</label>
                        <input id='description' name='description' type='text' value={form.description} onChange={formHandler} />
                    </div>
                    <div>
                        <label htmlFor='toChoose'>{t("new-table.JSON-settings.last-settings.to-choose")}</label>
                        <input id='toChoose' name='toChoose' type='number' value={form.toChoose} onChange={formHandler} />
                    </div>
                    <div>
                        <label htmlFor='maxInCard'>{t("new-table.JSON-settings.last-settings.max-in-card")}</label>
                        <input id='maxInCard' name='maxInCard' type='number' value={form.maxInCard} onChange={formHandler} />
                    </div>
                    <div>
                        <label htmlFor='hideFilled'>{t("new-table.JSON-settings.last-settings.hide-filled")}</label>
                        <input id='hideFilled' name='hideFilled' type='checkbox' className='custom-checkbox' checked={form.hideFilled} readOnly /><label htmlFor='hidefilled' onClick={hideFilledHandler}></label>
                    </div>

                    {/* <input name='key' type='radio' value={form.toChoose} onChange={formHandler} /> */}
                </div>
                <button className='createNewTable' onClick={CreateNewTable}>{t("new-table.JSON-settings.last-settings.new-table")}</button>
            </div>

        </div >
    )
}
