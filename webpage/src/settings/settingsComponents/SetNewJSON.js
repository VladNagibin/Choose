import React, { useContext, useEffect, useRef, useState } from 'react'
import JSONFields from '../../JSONfields/JSONFields'
import { v4 as uuidv4 } from 'uuid';
import * as XLSX from 'xlsx/xlsx.mjs';
import UserFields from '../../userFields/UserFields';
import { useHttp } from '../../hooks/http.hook';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import JSONSettings from './JSONSettings';
export default function SetNewJSON() {
  const [data, SetData] = useState({})
  const [fields, SetFields] = useState([])
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

  const handleExcelChange = (event) => {
    let reader = new FileReader()
    let file = event.target.files[0]
    reader.onloadend = () => {
      try {
        SetData(readExcel(reader.result))
      } catch(e) {
        console.log(e)
        alert('Невалидный JSON')
      }
    }
    reader.readAsArrayBuffer(file)
  }

  function readExcel(file) {
    var workbook = XLSX.read(file, { type: 'string' });
    var data = XLSX.utils.sheet_to_json(workbook.Sheets.Data)
    return data
  }

  function drawSettings() {
    if (fields.length > 0) {
      return <JSONSettings data={data} fields={fields} />
    } else {
      return <></>
    }
  }

  useEffect(() => {
    SetFields(getJSONfields(data))
  }, [data])

  return (
    <div className='set-new-json'>
      <div className='json-fields'>
        <label htmlFor='json'>
          Загрузить новый JSON
          <input id='json' type='file' onChange={handleJSONChange} accept='.json' placeholder={"Выберите файл"}></input>
        </label>
        <label htmlFor='excel'>
          Загрузить новый Excel
          <input id='excel' type='file' onChange={handleExcelChange} accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" placeholder={"Выберите файл"}></input>
        </label>


        
      </div>
      {drawSettings()}
    </div>
  )
}
