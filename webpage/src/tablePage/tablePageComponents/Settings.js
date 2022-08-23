import React, { useEffect, useState } from 'react'
import { useRef } from 'react'
import { v4 as uuidv4 } from 'uuid';
import UserFields from '../../userFields/UserFields';
import JSONFields from '../../JSONfields/JSONFields';
export default function Settings({ fields, userFields, settings, settingsHandler }) {

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
                        <h2>Добавьте поля для пользователей</h2>
                        <input ref={userFieldNameRef} placeholder='Имя' type='text' className='user-field-input' />
                        <input ref={userFieldHeaderRef} placeholder='Заголовок' type='text' className='user-field-input' />
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
                        <button onClick={handleAddUserField} className='user-field-button'>Добавить</button>
                        <UserFields userFields={newUserFields} deleteUserField={deleteUserField} />
                    </div>
                    <div className='last-settings'>
                        <h2>Общие настройки</h2>
                        <div>
                            <label htmlFor='name'>Имя таблицы</label>
                            <input id='name' name='name' type='text' value={form.name} onChange={formHandler} />
                        </div>
                        <div>
                            <label htmlFor='description'>Описание</label>
                            <input id='description' name='description' type='text' placeholder='Описание таблицы' value={form.description} onChange={formHandler} />
                        </div>
                        <div>
                            <label htmlFor='toChoose'>Сколько нужно выбрать(0=бесконечно)</label>
                            <input id='toChoose' name='toChoose' type='number' value={form.toChoose} onChange={formHandler} />
                        </div>
                        <div>
                            <label htmlFor='maxInCard'>Максимум в одной карточке(0=бесконечно)</label>
                            <input id='maxInCard' name='maxInCard' type='number' value={form.maxInCard} onChange={formHandler} />
                        </div>
                        <div>
                            <label htmlFor='hideFilled'>Скрывать поля с максимальным числом пользователей</label>
                            <input id='hideFilled' name='hideFilled' type='checkbox' className='custom-checkbox' checked={form.hideFilled} onChange={hideFilledHandler} ></input><label htmlFor='hidefilled' onClick={hideFilledHandler}/>
                        </div>
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
        <>
            <div className='JSONSettings'>
                <JSONFields fields={newFields} />
                {drawSettings()}
            </div>
        </>

    )
}
