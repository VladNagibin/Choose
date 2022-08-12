import React, { useState } from 'react'

export default function Shop({ cardData, regInCard, declineCard,fields}) {
    const [chosed, setChosed] = useState(false)
    const [card, setCard] = useState(cardData)
    async function send() {
        var success = await regInCard(card)
        setChosed(success)
        setCard({ ...card, freePlaces: card.freePlaces - 1 })
    }
    function unChose(){
        declineCard(card)
        setChosed(false)
        setCard({ ...card, freePlaces: card.freePlaces + 1 })
    }
    function buttonType() {
        if (chosed) {
            return <div className='imhere' onClick={unChose}>Я тут</div>
        } else {
            return <button onClick={send}>Я сюда</button>
        }
    }
    function draw() {
        if (cardData.freePlaces == 0) {
            return <></>
        } else {
            return (<div className='shop'>
                <div>{card.name}</div>
                <div>Осталось мест: {card.freePlaces}</div>
                {buttonType()}
            </div>)
        }
    }
    return (
        draw()
    
  )
}
