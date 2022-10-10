import { t } from 'i18next'
import React, { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

export default function Shop({ cardData, regInCard, declineCard, fields, keyField, settings }) {
    const [chosed, setChosed] = useState(false)
    const [card, setCard] = useState(cardData)
    const available = useCallback(() => {
        var unavailable = ('freePlaces' in cardData && cardData.freePlaces < 1)
        console.log(unavailable)
        console.log(cardData)
        return !unavailable 

    },[cardData])

    async function chose() {
        // console.log(cardData)
        if (cardData.freePlaces && cardData.freePlaces < 1) {
            return
        }
        if (chosed) {
            declineCard(card)
            setChosed(false)
            if (card.freePlaces || card.freePlaces == 0) {
                setCard({ ...card, freePlaces: card.freePlaces + 1 })
            }
            document.getElementById(cardData[keyField]).classList.remove('chosen')
        } else {
            var success = await regInCard(card)
            if (success) {
                document.getElementById(cardData[keyField]).classList.add('chosen')
                setChosed(success)
                if (card.freePlaces) {
                    setCard({ ...card, freePlaces: card.freePlaces - 1 })
                }
            }

        }

    }

    // function buttonType() {
    //     if (chosed) {
    //         return <div className='imhere' onClick={unChose}>Я тут</div>
    //     } else {
    //         return <button onClick={send}>Я сюда</button>
    //     }
    // }
    function freePlaces() {
        if (card.freePlaces || card.freePlaces == 0) {
            return <div>Осталось мест : {card.freePlaces}</div>
        } else {
            return <></>
        }
    }
    function draw() {
        if (cardData.freePlaces == 0 && settings.hideFilled) {
            return <></>
        } else {
            return (
                <div className={available() ? 'shop' : 'filled shop'} onClick={() => {
                    if (available()) {
                        chose()
                    }else{
                        toast.warn(t("notifications.no-places"))
                    }
                }} id={cardData[keyField]}>
                    {
                        fields.filter(elem => elem.show == true).map(field => {
                            return <div key={field.name}>{field.header==''?'':`${field.header} :`}  {card[field.name]}</div>
                        })
                    }
                    {freePlaces()}
                    {/* {buttonType()} */}
                </div>)
        }
    }
    return (
        draw()

    )
}
