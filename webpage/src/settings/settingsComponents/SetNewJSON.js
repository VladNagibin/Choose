import React, { useEffect, useState } from 'react'
import JSONFields from './JSONFields'
import { v4 as uuidv4 } from 'uuid';
export default function SetNewJSON() {
  const [data,SetData] = useState({})
  const [fields,SetFields] = useState([])

  const handleJSONChange = event =>{
    let reader = new FileReader()
    let file = event.target.files[0]
    reader.onloadend = () =>{
      try{
        SetData(JSON.parse(reader.result))
      }catch{
        alert('Невалидный JSON')
      }
    }
    reader.readAsText(file)
  } 
  function saveNewFields(fieldsObj){
    console.log(document.getElementById(fields[0].id))
  }

  function getJSONfields(data){
    var arr = []
    for(var key in data[0]){
      arr.push({
        id:uuidv4(),
        name:key})
    }
    return arr

  }
  useEffect(()=>{
    SetFields(getJSONfields(data))
  },[data])

  return (
    <div>
      <input type='file' onChange={handleJSONChange} placeholder = {"Выберите файл"}></input>
      <JSONFields fields={fields} saveNewFields = {saveNewFields}/>
    </div>
  )
}
