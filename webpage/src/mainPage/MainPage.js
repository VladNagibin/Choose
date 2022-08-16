import React, { useState, useEffect } from 'react'
import { useHttp } from '../hooks/http.hook';
import { useNavigate } from 'react-router-dom'
import ChooseForm from './mainPageComponents/ChooseForm';
import Shops from './mainPageComponents/Shops';


export default function MainPage() {
  const { loading, request, error, CleanErrors } = useHttp()
  let navigate = useNavigate()
  const [selected, setSelected] = useState([])
  const [available, setAvailable] = useState([])
  const [settings, setSettings] = useState({
    fields: [],
    userFields: [],
    settings: {}
  })
  const keyField = getKeyField()
  function getKeyField() {
    if (settings.fields.length) {
      return settings.fields.filter(elem => elem.key == true)[0].name
    } else {
      return ''
    }
  }
  function select(card) {
    // alert(event.target.name)
    console.log(settings.settings.toChoose)
    if (selected.length == settings.settings.toChoose && settings.settings.toChoose != 0) {
      alert('Вы выбрали достаточно элементов')
      return false
    }
    var newCards = selected
    newCards.push(card[keyField])
    setSelected(newCards)
    return true
  }
  function decline(card) {
    var Index = selected.findIndex(el => el == card.id)
    var newCards = [...selected.slice(0, Index), ...selected.slice(Index + 1)]
    setSelected(newCards)
    // console.log(newCards)
  }
  async function getData() {
    var data = await request('/choose/getData', 'GET')
    // console.log(typeof(data))
    setAvailable(JSON.parse(data))
  }
  async function getSettings() {
    var data = await request('/settings/getSettings', 'GET')
    // console.log(typeof(data))
    setSettings(JSON.parse(data))
  }

  async function accept(form) {
    if (form.fio == "" || form.phone == "") {
      alert("Заполните данные о себе")
      return false
    }
    if (selected.length < settings.settings.toChoose) {
      alert("Выберите еще "+(settings.settings.toChoose-selected.length))
      return false
    }
    //alert(shop.id)
    var headers = {}
    headers['Content-type'] = 'application/json'
    try {
      var data = await request('/choose/saveCards', 'POST', {
        Ids: selected,
        user: form,
        keyField:keyField
      })
    } catch (e) {
      var errText = "Эти магазины уже заняты:"
      e.alreadyBusyShops.forEach(element => {
        errText = errText + '\n' + element
      })
      alert(errText)
      return false
    }
    getData()
    alert("Cпасибо за участие")
    navigate('/settings')
    return true
  }
  function drawCards() {
    if (settings.fields.length > 0) {
      return <Shops cards={available} setCard={select} declineCard={decline} settings={settings.settings} fields={settings.fields} keyField={keyField} />
    }
  }
  useEffect(() => {
    getData()
    getSettings()
  }, [])

  return (
    <div className='app'>
      <div className='table-name'>
        <h1>{settings.settings.name}</h1>
        <h1>Выбери {settings.settings.toChoose == 0 ? 'сколько угодно' : settings.settings.toChoose}</h1>
        <h1>{settings.settings.description}</h1>
      </div>
      <ChooseForm acceptShops={accept} userFields={settings.userFields} />
      {drawCards()}
    </div>
  );
}