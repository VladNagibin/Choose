const { Router } = require("express");
const fs = require('fs')
const router = Router()
const Table = require('../models/Table')
const jwt = require('jsonwebtoken')
router.post('/saveSettings', (req, res) => {
    const { fields, userFields, settings, tableId } = req.body
    const { token } = req.headers
    try {
        var userId = jwt.verify(token, process.env.JWT_SECRET)
    } catch (e) {
        res.status(403).json({
            message:'invalid token'
        })
        return
    }
    Table.findById(tableId).then(table => {
        if (table.adminId !== userId) {
            res.status(403).json({
                message: 'this user is not an admin of that table'
            })
            return
        }
        table.fields = fields
        table.userFields = userFields
        table.settings = settings
        table.save().then(result => {
            res.status(200).json({
                message: 'success'
            })
        }, err => {
            res.status(501).json({
                message: 'settings saving error',
                err
            })
        })
    })
})

router.post('/createNewTable', (req, res) => {
    const { fields, userFields, settings, data, userId } = req.body
    newData = []
    data.forEach(element => {
        if (settings.maxInCard == 0) {
            newData.push({
                ...element,
                usersInCard: []
            })
        } else {
            newData.push({
                ...element,
                freePlaces: settings.maxInCard,
                usersInCard: []
            })
        }
    })
    fieldsToSort = fields.filter(elem => elem.sort == true)
    if (fieldsToSort.length) {
        fieldsToSort.forEach(field => {
            newData = newData.sort((a, b) => {
                if (a[field.name] > b[field.name]) {
                    return 1
                }
                if (a[field.name] < b[field.name]) {
                    return -1
                }
                return 0
            })
        })

    }
    const table = new Table({
        adminId: userId,
        data: newData,
        fields,
        settings,
        userFields
    })
    table.save().then(result => {
        res.status(200).json({
            message: 'success',
            tableId: result._id.toString()
        })
    }, err => {
        res.status(501).json({
            message: 'table creating fail',
            err: err
        })
    })
    //fs.writeFileSync("./map.json", JSON.stringify(newData))

})

router.get('/getSettings', (req, res) => {
    fs.readFile("./settings.json", "utf8", (err, data) => {
        res.status(200).json(data)
    })
})

module.exports = router