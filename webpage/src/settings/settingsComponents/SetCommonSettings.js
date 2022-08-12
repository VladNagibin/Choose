import React, { useContext, useState } from 'react'
import { SettingsContext } from '../SettingsContext'
export default function SetCommonSettings({SetCommonSettings}) {
    // const {SetCommonSettings} = useContext(SettingsContext)
    const [form,SetForm] = useState({
        toChoose:0,
        description:'',
        name:''
    })
    function saveSettings(){
        SetCommonSettings(form)
    }
    const formHandler = event =>{
        SetForm({...form,[event.target.name]:event.target.value})
    }
    return (
    <div>
      <input name='name' type='text' value={form.name} onChange={formHandler} />
      <input name='description' type='text' value={form.description} onChange={formHandler}/>
      <input name='toChoose' type='number' value={form.toChoose} onChange={formHandler}/>
      <button onClick={saveSettings}>Сохранить</button>
    </div>
  )
}
