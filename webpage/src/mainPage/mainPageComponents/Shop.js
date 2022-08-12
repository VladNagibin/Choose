import React, { useState } from 'react'

export default function Shop({ shopData, regInShop, declineShop}) {
    const [chosed, setChosed] = useState(false)
    const [shop, setShop] = useState(shopData)
    async function sendShop() {
        var success = await regInShop(shop)
        setChosed(success)
        setShop({ ...shop, freePlaces: shop.freePlaces - 1 })
    }
    function unChoseShop(){
        declineShop(shop)
        setChosed(false)
        setShop({ ...shop, freePlaces: shop.freePlaces + 1 })
    }
    function buttonType() {
        if (chosed) {
            return <div className='imhere' onClick={unChoseShop}>Я тут</div>
        } else {
            return <button onClick={sendShop}>Я сюда</button>
        }
    }
    function drawShop() {
        if (shopData.freePlaces == 0) {
            return <></>
        } else {
            return (<div className='shop'>
                <div>{shop.name}</div>
                <div>Осталось мест: {shop.freePlaces}</div>
                {buttonType()}
            </div>)
        }
    }
    return (
        drawShop()
    
  )
}
