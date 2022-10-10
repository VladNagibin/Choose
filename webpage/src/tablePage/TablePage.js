import React, { useState, useEffect, useContext, useCallback } from 'react'
import { useHttp } from '../hooks/http.hook';
import { Link, useNavigate, useParams } from 'react-router-dom'
import ChooseForm from './tablePageComponents/ChooseForm';
import Shops from './tablePageComponents/Shops';
import Settings from './tablePageComponents/Settings';
import SettingsPanel from './tablePageComponents/SettingsPanel';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';

import styled, { keyframes } from 'styled-components';
import { slideInLeft, slideInUp } from 'react-animations';
import Loader from '../loader/Loader';
import { useTranslation } from 'react-i18next';

const openAnimation = keyframes`${slideInLeft}`;

const SlideLeftDiv = styled.div`
  animation: 1s ${openAnimation};
`;
const openAnimationDown = keyframes`${slideInUp}`;

const BottomSlideDiv = styled.div`
  animation: 0.5s ${openAnimationDown};
`;

export default function TablePage() {
  const { loading, request, error, CleanErrors } = useHttp()
  let navigate = useNavigate()
  const { t } = useTranslation();
  const { userId, token, ready } = useContext(AuthContext)
  const [selected, setSelected] = useState([])
  const [available, setAvailable] = useState([])
  const [settings, setSettings] = useState({
    fields: [],
    userFields: [],
    settings: {},
    isAdmin: false
  })
  const [hideAcceptPanel, setHideAcceptPanel] = useState(true)
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
      toast.warn(t("notifications.enough-elements"))
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
  const getData = useCallback(async (controller) => {
    try {
      console.log(tableId)
      var table = await request('/choose/getData?tableId=' + tableId, 'GET', null, { token: token }, controller.signal)
    } catch (e) {
      if (e.name != 'AbortError') {
        throw e
      }
      return
    }
    setAvailable(table.data)
    setSettings({
      fields: table.fields,
      userFields: table.userFields,
      settings: table.settings,
      isAdmin: table.isAdmin
    })
  }, [tableId, token])

  async function accept(form) {
    var dataIsFilled = true
    for (var key in form) {
      if (form[key] == '') {
        dataIsFilled = false
      }
    }
    if (!dataIsFilled) {
      toast.warn(t("notifications.fill-all-fields"))
      return false
    }
    if (selected.length < settings.settings.toChoose) {
      toast.warn(t("notifications.not-enough-elements") + (settings.settings.toChoose - selected.length))
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
      return false
    }
    getData()
    toast.success(t("notifications.thank-you"))
    navigate('/')
    return true
  }
  function drawCards() {
    if (settings.fields.length > 0) {
      return <Shops cards={available} setCard={select} declineCard={decline} settings={settings.settings} fields={settings.fields} keyField={keyField} />
    }
  }


  function drawSettings() {
    if (settings.isAdmin) {
      return <SettingsPanel settings={settings} settingsHandler={settingsHandler} tableId={tableId} />
    } else {
      return <></>
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
    let controller = new AbortController()
    getData(controller)
    return (() => {
      controller.abort()
    })
  }, [getData])
  useEffect(() => {
    if (error) {
      if (error != 'The user aborted a request') {
        toast.error(error)
        CleanErrors()
      }

    }

  }, [error])


  function pageRender() {
    if (!available.length) {
      return <Loader />
    }
    return (
      <div className='app table-page'>
        <div className='top-panel'>
          <SlideLeftDiv className='table-name'>
            <h1>{settings.settings.name}</h1>
            <h1>{t("table.choose")} {settings.settings.toChoose == 0 ? t("table.no-max") : settings.settings.toChoose}</h1>
            <h1>{settings.settings.description}</h1>

          </SlideLeftDiv>

          {drawSettings()}
        </div>
        
        <SlideLeftDiv><ChooseForm acceptShops={()=>setHideAcceptPanel(false)} userFields={settings.userFields} /></SlideLeftDiv>
        {
          hideAcceptPanel?<></>:<div className='accept-panel'>
          <div>
           Вы уверены?
          </div>
          <div>
            <button onClick={accept}>Да</button>
            <button onClick={()=>setHideAcceptPanel(true)}>Скрыть</button>
          </div>
        </div>
        }
        
        <BottomSlideDiv>
          {drawCards()}
        </BottomSlideDiv>
      </div>
    )
  }

  return pageRender();
}