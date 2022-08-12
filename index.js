const express = require('express')
const fs = require('fs')
const chooseRouter = require('./Routers/choose')
const settingsRouter = require('./Routers/settings')
const app = express()
const path = require('path')
const PORT = 5000
app.use(express.json({ extended: true }))
app.use('/choose', chooseRouter)
app.use('/settings', settingsRouter)

// app.use('/',express.static(path.join(__dirname,'webpage','build')))
// app.get('*',(req,res)=>{
//     res.sendFile(path.resolve(__dirname,'webpage','build','index.html'))
// })

app.listen(PORT, () => {
    console.log('Back works')
})