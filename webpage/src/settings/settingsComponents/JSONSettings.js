import React, { useContext, useRef, useState } from 'react'
import JSONFields from '../../JSONfields/JSONFields'
import { v4 as uuidv4 } from 'uuid';
import UserFields from '../../userFields/UserFields';
import { useHttp } from '../../hooks/http.hook';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function JSONSettings({ data, fields }) {
    const { request } = useHttp()
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
            <h1>Выберите параметры таблицы</h1>
            <div>
                <JSONFields fields={fields} />
                <div className='user-fields'>
                    <h2>Добавьте поля для пользователей</h2>
                    <input ref={userFieldNameRef} placeholder='Имя' type='text' className='user-field-input' />
                    <input ref={userFieldHeaderRef} placeholder='Заголовок' className='user-field-input' type='text' />
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
                    <UserFields userFields={userFields} deleteUserField={deleteUserField} />
                </div>
                <div className='last-settings'>
                    <h2>Общие настройки</h2>
                    <div>
                        <label htmlFor='name'>Имя таблицы</label>
                        <input id='name' name='name' type='text' value={form.name} onChange={formHandler} />
                    </div>
                    <div>
                        <label htmlFor='name'>Описание</label>
                        <input id='description' name='description' type='text' placeholder='Описание таблицы' value={form.description} onChange={formHandler} />
                    </div>
                    <div>
                        <label htmlFor='name'>Сколько нужно выбрать(0=бесконечно)</label>
                        <input id='toChoose' name='toChoose' type='number' value={form.toChoose} onChange={formHandler} />
                    </div>
                    <div>
                        <label htmlFor='maxInCard'>Максимум в одной карточке(0=бесконечно)</label>
                        <input id='maxInCard' name='maxInCard' type='number' value={form.maxInCard} onChange={formHandler} />
                    </div>
                    <div>
                        <label htmlFor='name'>Скрывать поля с максимальным числом пользователей</label>
                        <input id='hideFilled' name='hideFilled' type='checkbox' className='custom-checkbox' checked={form.hideFilled} readOnly /><label htmlFor='hidefilled' onClick={hideFilledHandler}></label>
                    </div>

                    {/* <input name='key' type='radio' value={form.toChoose} onChange={formHandler} /> */}
                </div>
                <button className='createNewTable' onClick={CreateNewTable}>Создать новую таблицу</button>
            </div>

        </div >
    )
}
