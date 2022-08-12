import React, { useEffect, useRef, useState } from 'react'
import JSONFields from './JSONFields'
import { v4 as uuidv4 } from 'uuid';
import UserFields from './UserFields';
export default function SetNewJSON() {
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
  function saveNewFields() {
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
    console.log('cock')
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
      <div className='user-fields'>
        <input ref={userFieldNameRef} type='text' />
        <input ref={userFieldTypeRef} type='text' />
        <button onClick={handleAddUserField}>Добавить</button>
        <UserFields userFields={userFields} deleteUserField={deleteUserField} />
      </div>
      <div className='last-settings'>
        <input name='name' type='text' value={form.name} onChange={formHandler} />
        <input name='description' type='text' value={form.description} onChange={formHandler} />
        <input name='toChoose' type='number' value={form.toChoose} onChange={formHandler} />

      </div>
      {/* <button onClick={saveNewFields}>Сохранить</button> */}
      <div>
        {/* <button onClick={saveSettings}>Сохранить</button> */}

      </div>
    </div>
  )
}
