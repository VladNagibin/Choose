const express = require('express')
const mongoose = require('mongoose')
const chooseRouter = require('./Routers/choose')
const settingsRouter = require('./Routers/settings')
const authRouter = require('./Routers/auth')
const https = require("https")
const app = express()
const fs = require('fs')
require('dotenv').config()
const path = require('path')
const PORT = process.env.NODE_ENV == 'production' ? process.env.PROD_PORT_HTTPS : process.env.DEV_PORT
app.use(require('helmet')());
app.use(express.json({ extended: true }))

app.use('/choose', chooseRouter)
app.use('/settings', settingsRouter)
app.use('/auth', authRouter)

if (process.env.NODE_ENV == 'production') {
    app.use(express.static(path.join(__dirname, 'webpage', 'build')))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'webpage', 'build', 'index.html'))
    })
}
let privateKey = fs.readFileSync('../../etc/letsencrypt/live/choose-votes.ru/privkey.pem').toString();
let certificate = fs.readFileSync('../../etc/letsencrypt/live/choose-votes.ru/cert.pem').toString();

let credentials = {key: privateKey, cert: certificate};

async function start() {
    try {
        await mongoose.connect(process.env.DB_CONN)
        await https.createServer(credentials,app).listen(PORT)
        app.listen(process.env.PROD_PORT)
        console.log(`we are running on ${PORT}`)
    } catch (e) {
        console.log(e)
    }
}
start()
