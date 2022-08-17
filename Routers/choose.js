const { Router } = require("express");
const fs = require('fs');
const Table = require("../models/Table");
const router = Router()

router.get('/getData', (req, res) => {
    const { tableId } = req.query
    Table.findById(tableId).then(table => {
        if (!table) {
            res.status(400).json({
                message: 'table not found'
            })
            return
        }
        res.status(200).json(table)
    }, err => {
        res.status(501).json({
            message: 'database err',
            err: err
        })
    })
    // fs.readFile("./map.json", "utf8",(err,data)=>{
    //     res.status(200).json(data)
    // })

})
router.post('/saveCards', (req, res) => {
    const { Ids, user, keyField, tableId } = req.body
    Table.findById(tableId).then(table => {
        if (!table) {
            res.status(401).json({
                message: 'Таблица не найдена'
            })
            return
        }
        var cards = JSON.parse(JSON.stringify(table.data))
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
        if (filledCards.length == 0) {
            table.data = cards
            table.save().then(result => {
                res.status(200).json({
                    message: 'success'
                })
            }, err => {
                res.status(501).json({
                    message: 'card saving error',
                    err
                })
            })

        } else {
            res.status(401).json({
                success: false,
                message: 'Этот магазин уже занят',
                alreadyBusyShops: filledCards
            })
        }
    })


})



module.exports = router