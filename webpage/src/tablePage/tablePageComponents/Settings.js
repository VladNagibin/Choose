import React, { useContext, useEffect, useState } from 'react'
import { useHttp } from '../../hooks/http.hook'
import { useRef } from 'react'
import { v4 as uuidv4 } from 'uuid';
import UserFields from '../../userFields/UserFields';
import JSONFields from '../../JSONfields/JSONFields';
import { AuthContext } from '../../context/AuthContext';
export default function Settings({ fields, userFields, settings, settingsHandler }) {

    const { request } = useHttp()
   
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
                        <h1>Добавьте поля для пользователей</h1>
                        <input ref={userFieldNameRef} placeholder='Имя' type='text' />
                        <input ref={userFieldHeaderRef} placeholder='Заголовок' type='text' />
                        <select ref={userFieldTypeRef} >
                            {/* <option disabled>Тип данных</option> */}
                            <option value='text'>Текст</option>
                            <option value='number'>Число</option>
                            <option value='data'>Дата</option>
                            <option value='checkbox'>Чек бокс</option>
                            <option value='email'>email</option>
                            <option value='color'>Цвет</option>
                        </select>
                        {/* <input ref={userFieldTypeRef} placeholder='Тип данных' type='text' /> */}
                        <button onClick={handleAddUserField}>Добавить</button>
                        <UserFields userFields={newUserFields} deleteUserField={deleteUserField} />
                    </div>
                    <div className='last-settings'>
                        <h1>Общие настройки</h1>
                        <label htmlFor='name'>Имя таблицы
                            <input id='name' name='name' type='text' value={form.name} onChange={formHandler} />
                        </label>
                        <label htmlFor='description'>Описание
                            <input id='description' name='description' type='text' placeholder='Описание таблицы' value={form.description} onChange={formHandler} />
                        </label>
                        <label htmlFor='toChoose'>Сколько нужно выбрать(0=бесконечно)
                            <input id='toChoose' name='toChoose' type='number' value={form.toChoose} onChange={formHandler} />
                        </label>
                        <label htmlFor='maxInCard'>Максимум в одной карточке(0=бесконечно)
                            <input id='maxInCard' name='maxInCard' type='number' value={form.maxInCard} onChange={formHandler} />
                        </label>
                        <label htmlFor='hideFilled'>Скрывать поля с максимальным числом пользователей
                            <input id='hideFilled' name='hideFilled' type='checkbox' checked={form.hideFilled} onChange={hideFilledHandler} />
                        </label>
                        {/* <input name='key' type='radio' value={form.toChoose} onChange={formHandler} /> */}
                    </div>
                    <button className='createNewTable' onClick={SaveSettings}>Сохранить изменения</button>
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
        <div className='set-new-json'>
            <div className='json-fields'>
                <JSONFields fields={newFields} />
            </div>
            {drawSettings()}
        </div>
    )
}
