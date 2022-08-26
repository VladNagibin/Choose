import React, { useEffect, useState } from 'react'
import { useRef } from 'react'
import { v4 as uuidv4 } from 'uuid';
import UserFields from '../../userFields/UserFields';
import JSONFields from '../../JSONfields/JSONFields';
import { useTranslation } from 'react-i18next';
export default function Settings({ fields, userFields, settings, settingsHandler }) {
    const { t } = useTranslation();
    const [newFields, SetFields] = useState([])
    const [newUserFields, SetUserFields] = useState([])
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

    function getFields() {
        var fieldSettings = []
        newFields.forEach(field => {
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
    function setFieldsData() {
        //console.log(newFields)
        newFields.forEach(field => {
            var tr = document.getElementById(field.id)
            if (tr) {
                var tds = tr.getElementsByTagName('td')
                var inputs = tr.getElementsByTagName('input')
                tds[0].innerHTML = field.name
                inputs[0].value = field.header
                inputs[1].checked = field.show
                inputs[2].checked = field.sort
                inputs[3].checked = field.key
            }

        })
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
            alert('Заполните оба поля')
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
        var newUserFields = [...newUserFields]
        var index = newUserFields.findIndex(el => el.id = id)
        SetUserFields([...newUserFields.slice(0, index), ...newUserFields.slice(index + 1)])
    }
    function hideFilledHandler() {
        SetForm({ ...form, hideFilled: !form.hideFilled })
    }
    async function SaveSettings() {
        settingsHandler({
            fields: getFields(),
            userFields: newUserFields,
            settings: form
        })


    }
    function drawSettings() {
        if (newUserFields.length > 0) {
            return (
                <>
                    <div className='user-fields'>
                        <h2>{t("new-table.JSON-settings.user-fields.h2")}</h2>
                        <input ref={userFieldNameRef} placeholder={t("new-table.JSON-settings.JSON-field.name")} type='text' className='user-field-input' />
                        <input ref={userFieldHeaderRef} placeholder={t("new-table.JSON-settings.JSON-field.header")} type='text' className='user-field-input' />
                        <select ref={userFieldTypeRef} >
                            {/* <option disabled>Тип данных</option> */}
                            <option value='text'>{t("new-table.JSON-settings.user-fields.options.text")}</option>
                            <option value='number'>{t("new-table.JSON-settings.user-fields.options.number")}</option>
                            <option value='date'>{t("new-table.JSON-settings.user-fields.options.date")}</option>
                            <option value='checkbox'>{t("new-table.JSON-settings.user-fields.options.checkbox")}</option>
                            <option value='email'>{t("new-table.JSON-settings.user-fields.options.email")}</option>
                            <option value='color'>{t("new-table.JSON-settings.user-fields.options.color")}</option>
                        </select>
                        {/* <input ref={userFieldTypeRef} placeholder='Тип данных' type='text' /> */}
                        <button onClick={handleAddUserField} className='user-field-button'>{t("new-table.JSON-settings.user-fields.add-button")}</button>
                        <UserFields userFields={newUserFields} deleteUserField={deleteUserField} />
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
                            <input id='hideFilled' name='hideFilled' type='checkbox' className='custom-checkbox' checked={form.hideFilled} onChange={hideFilledHandler} ></input><label htmlFor='hidefilled' onClick={hideFilledHandler}/>
                        </div>
                        {/* <input name='key' type='radio' value={form.toChoose} onChange={formHandler} /> */}
                    </div>
                    <button className='createNewTable' onClick={SaveSettings}>{t("new-table.JSON-settings.last-settings.new-table")}</button>
                </>
            )
        } else {
            return <></>
        }
    }

    useEffect(() => {
        setFieldsData()
    }, [newFields])

    useEffect(() => {
        SetFields(fields)
        SetUserFields(userFields)
        SetForm(settings)
    }, [fields])
    return (
        <>
            <div className='JSONSettings'>
                <JSONFields fields={newFields} />
                {drawSettings()}
            </div>
        </>

    )
}
