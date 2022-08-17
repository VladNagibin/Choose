import React from 'react'
import Shop from './Shop'

export default function Shops({cards,setCard,settings,declineCard,fields, keyField}) {
  return (
    <div className='shops'>{
        cards.map(element => {
        return <Shop key = {element.id} cardData={element} settings = {settings} regInCard={setCard} declineCard={declineCard} fields={fields} keyField={keyField}/>
      })}</div>
  )
}
