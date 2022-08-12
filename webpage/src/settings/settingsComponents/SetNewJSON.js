import React, { useEffect, useRef, useState } from 'react'
import JSONFields from './JSONFields'
import { v4 as uuidv4 } from 'uuid';
import UserFields from './UserFields';
import { useHttp } from '../../hooks/http.hook';
export default function SetNewJSON() {
  const {request} = useHttp()
  const [data, SetData] = useState({})
  const [fields, SetFields] = useState([])
  const [userFields, SetUserFields] = useState([])
  const [form, SetForm] = useState({
    toChoose: 0,
    description: '',
    name: ''
  })
  const userFieldNameRef = useRef()
  const userFieldTypeRef = useRef()


  const handleJSONChange = event => {
    let reader = new FileReader()
    let file = event.target.files[0]
    reader.onloadend = () => {
      try {
        SetData(JSON.parse(reader.result))
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
        name: tds[0].innerHTML,
        header: inputs[0].value,
        show: inputs[1].checked,
        sort: inputs[2].checked,
      })

    })
    return fieldSettings
    // SetFieldSettings(fieldSettings)
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
  useEffect(() => {
    SetFields(getJSONfields(data))
  }, [data])



  const formHandler = event => {
    SetForm({ ...form, [event.target.name]: event.target.value })
  }

  function handleAddUserField() {
    const name = userFieldNameRef.current.value
    const type = userFieldTypeRef.current.value
    if (name == "" || type == "") {
      alert('Заполните оба поля')
      return
    }
    SetUserFields(prevUserFields => {
      return [...prevUserFields, { id: uuidv4(), name: name, type: type }]
    })
    userFieldNameRef.current.value = ''
    userFieldTypeRef.current.value = ''
  }
  function deleteUserField(id) {
    var newUserFields = [...userFields]
    var index = userFields.findIndex(el=>el.id = id)
    SetUserFields([...newUserFields.slice(0,index),...newUserFields.slice(index+1)])
  }
  async function CreateNewTable(){
    var data = await request('/settings/saveSettings','POST',{
      fields:getFields(),
      userFields,
      settings:form
    })
    if (!data.success){
      alert('Error')
    }

  }
  function drawSettings() {
    if (data.length > 0) {
      return (
        <>
          <div className='user-fields'>
            <h1>Добавьте поля для пользователей</h1>
            <input ref={userFieldNameRef} placeholder='Имя' type='text' />
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
            <input name='name' type='text' placeholder='Имя таблицы' value={form.name} onChange={formHandler} />
            <input name='description' type='text' placeholder='Описание таблицы' value={form.description} onChange={formHandler} />
            <input name='toChoose' type='number' value={form.toChoose} onChange={formHandler} />
          </div>
          <button className='createNewTable' onClick={CreateNewTable}>Создать новую таблицу</button>
        </>
      )
    } else {
      return <></>
    }
  }
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
