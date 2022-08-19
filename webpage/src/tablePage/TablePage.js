import React, { useState, useEffect, useContext } from 'react'
import { useHttp } from '../hooks/http.hook';
import { Link, useNavigate, useParams } from 'react-router-dom'
import ChooseForm from './tablePageComponents/ChooseForm';
import Shops from './tablePageComponents/Shops';
import Settings from './tablePageComponents/Settings';
import SettingsPanel from './tablePageComponents/SettingsPanel';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';

export default function TablePage() {
  const { loading, request, error, CleanErrors } = useHttp()
  let navigate = useNavigate()
  const { userId, token } = useContext(AuthContext)
  const [selected, setSelected] = useState([])
  const [available, setAvailable] = useState([])
  const [settings, setSettings] = useState({
    fields: [],
    userFields: [],
    settings: {}
  })
  const tableId = useParams().id
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
    if (selected.length == settings.settings.toChoose && settings.settings.toChoose != 0) {
      toast.warn('Вы выбрали достаточно элементов')
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
    var table = await request('/choose/getData?tableId=' + tableId, 'GET')
    //console.log(table)
    setAvailable(table.data)
    setSettings({
      fields: table.fields,
      userFields: table.userFields,
      settings: table.settings
    })
  }

  async function accept(form) {
    var dataIsFilled = true
    for (var key in form) {
      if(form[key]==''){
        dataIsFilled = false
      }
    }
    if (!dataIsFilled) {
      toast.warn("Заполните данные о себе")
      return false
    }
    if (selected.length < settings.settings.toChoose) {
      toast.warn("Выберите еще " + (settings.settings.toChoose - selected.length))
      return false
    }
    //alert(shop.id)
    var headers = {}
    headers['Content-type'] = 'application/json'
    try {
      var data = await request('/choose/saveCards', 'POST', {
        Ids: selected,
        user: form,
        keyField: keyField,
        tableId: tableId
      })
    } catch (e) {
      if (e.alreadyBusyShops) {
        var errText = "Эти магазины уже заняты:"
        e.alreadyBusyShops.forEach(element => {
          errText = errText + '\n' + element
        })
        toast.error(errText)
      } else {
        toast.error(e)
      }

      return false
    }
    getData()
    toast.success("Cпасибо за участие")
    navigate('/')
    return true
  }
  function drawCards() {
    if (settings.fields.length > 0) {
      return <Shops cards={available} setCard={select} declineCard={decline} settings={settings.settings} fields={settings.fields} keyField={keyField} />
    }
  }
  async function settingsHandler(newSettings) {

    try {
      var reqData = await request('/settings/saveSettings', 'POST', {
        ...newSettings,
        tableId: tableId
      }, { token: token })
      toast.success(reqData.message)
      setSettings(newSettings)
      return true
    } catch (e) {
      toast.error(reqData.message)
      return false
    }


  }
  useEffect(() => {
    getData()
  }, [])

  return (
    <div className='app'>
      <div className='top-panel'>
        <div className='table-name'>
          <h1>{settings.settings.name}</h1>
          <h1>Выбери {settings.settings.toChoose == 0 ? 'сколько угодно' : settings.settings.toChoose}</h1>
          <h1>{settings.settings.description}</h1>

        </div>
        <div>
        {/* <img className='logo' src='/logo-small.png' /> */}
        </div>
        <SettingsPanel settings={settings} settingsHandler={settingsHandler} tableId={tableId} />

      </div>
      <ChooseForm acceptShops={accept} userFields={settings.userFields} />
      {drawCards()}
    </div>
  );
}