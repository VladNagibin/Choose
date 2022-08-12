const { Router } = require("express");
const fs = require('fs')
const router = Router()

router.post('/saveSettings', (req, res) => {
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
router.get('/getSettings',(req,res)=>{
    fs.readFile("./settings.json", "utf8",(err,data)=>{
        res.status(200).json(data)
    })
})

module.exports = router