import React, { useState } from 'react'
import { useHttp } from '../../hooks/http.hook';
import * as XLSX from 'xlsx/xlsx.mjs';
import { useTranslation } from 'react-i18next';

export default function DownloadJSON({ tableId }) {
  const [downloadOnlyFilled, setDownloadOnlyFilled] = useState(false)
  const { request } = useHttp()
  const { t } = useTranslation();
  async function downloadJSON() {
    var table = await request('/choose/getData?tableId=' + tableId, 'GET')
    let a = document.createElement("a");
    var data = []
    if(downloadOnlyFilled){
      table.data.forEach(el=>{
        if(el.usersInCard.length){
          data.push(el)
        }
      })
    }else{
      data = table.data
    }
    let file = new Blob([JSON.stringify(data)], { type: 'application/json' });
    a.href = URL.createObjectURL(file);
    a.download = "data.json";
    a.click();
    // console.log(typeof(data))
  }
  async function downloadExcel() {
    var table = await request('/choose/getData?tableId=' + tableId, 'GET')
    let a = document.createElement("a");
    var data = []
    if(downloadOnlyFilled){
      table.data.forEach(el=>{
        if(el.usersInCard.length){
          data.push(el)
        }
      })
    }else{
      data = table.data
    }
    var file = new Blob([writeToExcel(table.data)], { type: "application/octet-stream" });
    a.href = URL.createObjectURL(file);
    a.download = "data.xlsx";
    a.click();
    // console.log(typeof(data))
  }

  function writeToExcel(data) {
    var newData = []
    data.forEach(el => {
      newData.push({
        ...el,
        usersInCard: JSON.stringify(el.usersInCard)
      })
    })
    const worksheet = XLSX.utils.json_to_sheet(newData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data");
    return XLSX.write(workbook, { type: "array", bookType: "xlsx" });

  }

  return (
    <div className='set-new-json'>
      <button className='download' onClick={downloadJSON}>{t("table.download.JSON")}</button>
      <button className='download' onClick={downloadExcel}>{t("table.download.Excel")}</button>
      <div className='what-to-download'>
        <label htmlFor='OnlyWithVotes'>{t("table.download.Only-with-votes")}</label>
        <input id='OnlyWithVotes' name='OnlyWithVotes' type='checkbox' className='custom-checkbox' checked={downloadOnlyFilled} readOnly /><label htmlFor='OnlyWithVotes' onClick={()=>setDownloadOnlyFilled(!downloadOnlyFilled)}></label>
      </div>
    </div>

  )
}
