import React from 'react'
import Shop from './Shop'

export default function Shops({shops,setShop,declineShop}) {
  return (
    <div className='shops'>{
        shops.map(element => {
        return <Shop key = {element.id} shopData={element} regInShop={setShop} declineShop={declineShop}/>
      })}</div>
  )
}
