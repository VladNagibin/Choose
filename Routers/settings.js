const { Router } = require("express");
const fs = require('fs')
const router = Router()

router.post('/saveSettings',(req, res) => {
    const { fields, userFields, settings } = req.body
    fs.writeFileSync("./settings.json", JSON.stringify({
        fields,
        userFields,
        settings
    }))
    res.status(200).json({
        success: true
    })
})

router.post('/createNewTable', (req, res) => {
    const { fields, userFields, settings, data } = req.body
    fs.writeFileSync("./settings.json", JSON.stringify({
        fields,
        userFields,
        settings
    }))
    newData = []
    data.forEach(element => {
        if(settings.maxInCard==0){
            newData.push({
                ...element,
                usersInShop: []
            })
        }else{
            newData.push({
                ...element,
                freePlaces: settings.maxInCard,
                usersInShop: []
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
    fs.writeFileSync("./map.json", JSON.stringify(newData))

})

router.get('/getSettings', (req, res) => {
    fs.readFile("./settings.json", "utf8", (err, data) => {
        res.status(200).json(data)
    })
})

module.exports = router