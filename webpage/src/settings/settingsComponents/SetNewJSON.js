import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import * as XLSX from 'xlsx/xlsx.mjs';
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
        toast.success('JSON обработан')
      } catch {
        toast.error('Невалидный JSON')
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
        toast.success('Excel обработан')
      } catch (e) {
        toast.error('Невалидный Excel')
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
      return <div className='JSONSettings'><JSONSettings data={data} fields={fields} /></div>
    } else {
      return <div className='JSONSettings'>
        <h1>Выберите параметры таблицы</h1>
        <div className='no-data'>
          <h2>Данных пока нет</h2>
          <span className="material-symbols-outlined material-icons">
            mood_bad
          </span>
        </div></div>
    }
  }

  useEffect(() => {
    SetFields(getJSONfields(data))
  }, [data])

  return (
    <>
      <div className='set-new-json'>
        <h1>Загрузите ваши данные</h1>
        <div className='buttons'>
          <label htmlFor='json'>
            Загрузить JSON
            <input id='json' type='file' onChange={handleJSONChange} accept='.json' placeholder={"Выберите файл"}></input>
          </label>
          <div className='format'>
            формат
            <span className="material-symbols-outlined material-icons">
              help
            </span>
          </div>
          <label htmlFor='excel'>
            Загрузить Excel
            <input id='excel' type='file' onChange={handleExcelChange} accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" placeholder={"Выберите файл"}></input>
          </label>
          <div className='format'>
            формат
            <span className="material-symbols-outlined material-icons">
              help
            </span>
          </div>
        </div>
      </div>
      {drawSettings()}
    </>
  )
}
