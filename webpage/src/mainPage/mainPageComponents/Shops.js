import React from 'react'
import Shop from './Shop'

export default function Shops({cards,setCard,declineCard,fields}) {
  return (
    <div className='shops'>{
        cards.map(element => {
        return <Shop key = {element.id} cardData={element} regInCard={setCard} declineCard={declineCard} fields={fields}/>
      })}</div>
  )
}
