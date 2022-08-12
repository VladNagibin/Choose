import React, { useEffect, useState } from 'react'
import { useHttp } from '../../hooks/http.hook';

export default function DownloadJSON() {
  const {request} = useHttp()
  async function downloadJSON() {
    var data = await request('/choose/getData', 'GET')
    let a = document.createElement("a");
    let file = new Blob([data], {type: 'application/json'});
    a.href = URL.createObjectURL(file);
    a.download = "data.json";
    a.click();
    // console.log(typeof(data))
  }
  return (
    <div className='downloadJSON'>
      <button onClick={downloadJSON}>Скачать JSON</button>
    </div>
  )
}
