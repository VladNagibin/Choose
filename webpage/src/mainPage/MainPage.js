import React,{useState,useEffect} from 'react'
import { useHttp } from '../hooks/http.hook';
import ChooseForm from './mainPageComponents/ChooseForm';
import Shops from './mainPageComponents/Shops';


export default function MainPage() {
  const { loading, request, error, CleanErrors } = useHttp()
  const [selectedShops, setselectedShops] = useState([])
  const [availableShops, setAvailableShops] = useState([])
  
  function selectShop(shop) {
    // alert(event.target.name)
    var newShops = selectedShops
    newShops.push(shop.id)
    setselectedShops(newShops)
    return true
  }
  function declineShop(shop) {
    var Index = selectedShops.findIndex(el => el == shop.id)
    var newShops = [...selectedShops.slice(0, Index), ...selectedShops.slice(Index + 1)]
    setselectedShops(newShops)
    console.log(newShops)
  }
  async function getData() {
    var data = await request('/choose/getData', 'GET')
    // console.log(typeof(data))
    setAvailableShops(JSON.parse(data))
  }
  async function acceptShops(form) {
    if (form.fio == "" || form.phone == "") {
      alert("Заполните данные о себе")
      return false
    }
    //alert(shop.id)
    var headers = {}
    headers['Content-type'] = 'application/json'
    try {
      var data = await request('/choose/chooseMag', 'POST', JSON.stringify({
        shopIds: selectedShops,
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
    alert("Магазины выбраны, спасибо за участие")
    return true
  }
  useEffect(() => {
    getData()
  }, [])

  return (
    <div className='app'>
      <ChooseForm acceptShops={acceptShops}/>
      <Shops shops={availableShops} setShop={selectShop} declineShop={declineShop} />
    </div>
  );
}