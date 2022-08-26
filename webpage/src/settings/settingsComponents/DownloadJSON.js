import React from 'react'
import { useHttp } from '../../hooks/http.hook';
import * as XLSX from 'xlsx/xlsx.mjs';
import { useTranslation } from 'react-i18next';

export default function DownloadJSON({ tableId }) {
  const { request } = useHttp()
  const { t } = useTranslation();
  async function downloadJSON() {
    var table = await request('/choose/getData?tableId=' + tableId, 'GET')
    let a = document.createElement("a");
    let file = new Blob([JSON.stringify(table.data)], { type: 'application/json' });
    a.href = URL.createObjectURL(file);
    a.download = "data.json";
    a.click();
    // console.log(typeof(data))
  }
  async function downloadExcel() {
    var table = await request('/choose/getData?tableId=' + tableId, 'GET')
    let a = document.createElement("a");
    var file = new Blob([writeToExcel(table.data)], { type: "application/octet-stream" });
    a.href = URL.createObjectURL(file);
    a.download = "data.xlsx";
    a.click();
    // console.log(typeof(data))
  }

  function writeToExcel(data) {
    var newData = []
    data.forEach(el=>{
      newData.push({
        ...el,
        usersInShop:JSON.stringify(el.usersInShop)
      })
    })
    const worksheet = XLSX.utils.json_to_sheet(newData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data");
    return XLSX.write(workbook,{ type: "array", bookType: "xlsx" });

  }

  return (
    <div className='set-new-json'>
      <button className='download' onClick={downloadJSON}>{t("table.download.JSON")}</button>
      <button className='download' onClick={downloadExcel}>{t("table.download.Excel")}</button>
    </div>

  )
}
