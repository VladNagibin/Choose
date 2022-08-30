const express = require('express')
const mongoose = require('mongoose')
const chooseRouter = require('./Routers/choose')
const settingsRouter = require('./Routers/settings')
const authRouter = require('./Routers/auth')
const app = express()
require('dotenv').config()
const path = require('path')
const PORT = process.env.NODE_ENV == 'production' ? process.env.PROD_PORT : process.env.DEV_PORT

app.use(express.json({ extended: true }))

app.use('/choose', chooseRouter)
app.use('/settings', settingsRouter)
app.use('/auth', authRouter)

if (process.env.NODE_ENV == 'production') {
    app.use('/', express.static(path.join(__dirname, 'webpage', 'build')))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'webpage', 'build', 'index.html'))
    })
}


async function start() {
    try {
        await mongoose.connect(process.env.DB_CONN)
        app.listen(PORT, () => {
            console.log('Back works on ' + PORT)
        })
    } catch (e) {
        console.log(e)
    }
}
start()
