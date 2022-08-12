import React,{useState,useEffect} from 'react'
import { useHttp } from '../hooks/http.hook';
import ChooseForm from './mainPageComponents/ChooseForm';
import Shops from './mainPageComponents/Shops';


export default function MainPage() {
  const { loading, request, error, CleanErrors } = useHttp()
  const [selected, setSelected] = useState([])
  const [available, setAvailable] = useState([])
  const [settings, setSettings] = useState({
    fields:[],
    userFields:[],
    settings:{}
  })

  function select(card) {
    // alert(event.target.name)
    var newCards = selected
    newCards.push(card.id)
    setSelected(newCards)
    return true
  }
  function decline(card) {
    var Index = selected.findIndex(el => el == card.id)
    var newCards = [...selected.slice(0, Index), ...selected.slice(Index + 1)]
    setSelected(newCards)
    console.log(newCards)
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
    //alert(shop.id)
    var headers = {}
    headers['Content-type'] = 'application/json'
    try {
      var data = await request('/choose/chooseMag', 'POST', JSON.stringify({
        shopIds: selected,
        user: form
      }))
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
    return true
  }
  useEffect(() => {
    getData()
    getSettings()
  }, [])

  return (
    <div className='app'>
      <ChooseForm acceptShops={accept} userFields = {settings.userFields}/>
      <Shops cards={available} setCard={select} declineCard={decline} fields = {settings.fields}/>
    </div>
  );
}