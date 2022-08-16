import React, { useEffect, useRef, useState } from 'react'
import JSONFields from './JSONFields'
import { v4 as uuidv4 } from 'uuid';
import UserFields from './UserFields';
import { useHttp } from '../../hooks/http.hook';
export default function ChangeSettings() {
  const { request } = useHttp()
  const [data, SetData] = useState({})
  const [fields, SetFields] = useState([])
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


  const handleJSONChange = event => {
    let reader = new FileReader()
    let file = event.target.files[0]
    reader.onloadend = () => {
      try {
        var newData = JSON.parse(reader.result)
        SetData(newData)
        SetFields(getJSONfields(newData))
      } catch {
        alert('Невалидный JSON')
      }
    }
    reader.readAsText(file)
  }
  function getFields() {
    var fieldSettings = []
    fields.forEach(field => {
      var tr = document.getElementById(field.id)
      var tds = tr.getElementsByTagName('td')
      var inputs = tr.getElementsByTagName('input')
      fieldSettings.push({
        id:field.id,
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
    console.log(fields)
    fields.forEach(field => {
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
  function getJSONfields(data) {
    var arr = []
    for (var key in data[0]) {
      arr.push({
        id: uuidv4(),
        name: key
      })
    }
    return arr

  }

  async function getData() {
    var data = await request('/choose/getData', 'GET')
    // console.log(typeof(data))
    SetData(JSON.parse(data))
  }
  async function getSettings() {
    var data = await request('/settings/getSettings', 'GET')
    // console.log(typeof(data))
    var settings = JSON.parse(data)
    SetFields(settings.fields)
    SetUserFields(settings.userFields)
    SetForm(settings.settings)
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
      return [...prevUserFields, { id: uuidv4(), header: header,name: name, type: type }]
    })
    userFieldNameRef.current.value = ''
    userFieldTypeRef.current.value = ''
    userFieldHeaderRef.current.value = ''
  }
  function deleteUserField(id) {
    var newUserFields = [...userFields]
    var index = userFields.findIndex(el => el.id = id)
    SetUserFields([...newUserFields.slice(0, index), ...newUserFields.slice(index + 1)])
  }
  function hideFilledHandler() {
    SetForm({ ...form, hideFilled: !form.hideFilled })
  }
  async function SaveSettings() {
    var reqData = await request('/settings/saveSettings', 'POST', {
      fields: getFields(),
      userFields,
      settings: form
    })
    if (!reqData.success) {
      alert('Error')
    } else {
      alert('saved!')
    }

  }
  function drawSettings() {
    if (data.length > 0) {
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
            <UserFields userFields={userFields} deleteUserField={deleteUserField} />
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
  }, [fields])

  useEffect(() => {
    getData()
    getSettings()
  }, [])
  return (
    <div className='set-new-json'>
      <div className='json-fields'>
        <label htmlFor='json'>
          Загрузить новый JSON
          <input id='json' type='file' onChange={handleJSONChange} placeholder={"Выберите файл"}></input>
        </label>

        <JSONFields fields={fields} />
      </div>
      {drawSettings()}
    </div>
  )
}
