const { Router } =require("express");
const fs = require('fs')
const router = Router()

router.get('/getData', (req, res) => {
    fs.readFile("./map.json", "utf8",(err,data)=>{
        res.status(200).json(data)
    })
    
})
router.post('/saveCards', (req, res) => {
    const { Ids, user,keyField } = req.body
    fs.readFile("./map.json", "utf8",
        function (error, data) {
            if (error) throw error; // если возникла ошибка
            var cards = JSON.parse(data)
            var filledCards = []
            Ids.forEach(cardId => {
                var i = cards.findIndex(el => el[keyField] == cardId)
                if (cards[i].freePlaces < 1) {
                    filledCards.push(cards[i])
                } else {
                    cards[i].freePlaces = cards[i].freePlaces - 1
                    cards[i].usersInShop.push(user)
                   
                    
                }
            });
            if(filledCards.length == 0){
                fs.writeFileSync("./map.json", JSON.stringify(cards))
                res.status(200).json({
                    success: true
                })
            }else{
                res.status(301).json({
                    success: false,
                    message: 'Этот магазин уже занят',
                    alreadyBusyShops: filledCards
                })
            }
        });
})



module.exports = router