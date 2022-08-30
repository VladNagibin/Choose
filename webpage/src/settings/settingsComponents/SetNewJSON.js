import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import * as XLSX from 'xlsx/xlsx.mjs';
import JSONSettings from './JSONSettings';
import styled, { keyframes } from 'styled-components';
import { fadeInUp } from 'react-animations';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const openAnimation = keyframes`${fadeInUp}`;

const OpenDiv = styled.div`
  animation: 0.5s ${openAnimation};
`;

export default function SetNewJSON() {
  const { t } = useTranslation();
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
        toast.success(t("notifications.JSON-set"))
      } catch {
        toast.error(t("notifications.invalid-JSON"))
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
        toast.success(t("notifications.JSON-set"))
      } catch (e) {
        toast.error(t("notifications.invalid-JSON"))
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
      return <OpenDiv className='JSONSettings'><JSONSettings data={data} fields={fields} /></OpenDiv>
    } else {
      return <div className='JSONSettings'>
        <h1>{t("new-table.JSON-settings.h1")}</h1>
        <div className='no-data'>
          <h2>{t("new-table.JSON-settings.no-data")}</h2>
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
        <h1>{t("new-table.h1")}</h1>
        <div className='buttons'>
          <label htmlFor='json'>
            {t("new-table.upload-buttons.JSON")}
            <input id='json' type='file' onChange={handleJSONChange} accept='.json' placeholder={"Выберите файл"}></input>
          </label>

          <div className='format'>
            <Link to='/docs/howToCreate'>{t("new-table.upload-buttons.format")}
              <span className="material-symbols-outlined material-icons">
                help
              </span></Link>
          </div>


          <label htmlFor='excel'>
          {t("new-table.upload-buttons.Excel")}
            <input id='excel' type='file' onChange={handleExcelChange} accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" placeholder={"Выберите файл"}></input>
          </label>
          <div className='format'>
            <Link to='/docs/howToCreate'>
            {t("new-table.upload-buttons.format")}
              <span className="material-symbols-outlined material-icons">
                help
              </span></Link>
          </div>
        </div>
      </div>
      {drawSettings()}
    </>
  )
}
