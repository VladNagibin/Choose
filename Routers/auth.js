const { Router } = require('express')
const router = Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')
const Table = require('../models/Table')
const jwt = require('jsonwebtoken')
router.post('/registration', (req, res) => {
    const { login, password } = req.body
    bcrypt.hash(password, 10).then(function (hashPassword) {
        const user = new User({
            login,
            password: hashPassword
        })
        user.save().then(result => {
            res.status(200).json({
                message: 'user created'
            })
        }, err => {
            res.status(401).json({
                message: 'registration fail',
                err: err
            })
        })
    });


})

router.post('/login', (req, res) => {
    const { userLogin, password } = req.body
    User.findOne({ login: userLogin }).then(user => {
        if (!user) {
            res.status(401).json({ message: 'user not exist' })
            return
        }
        const isValid = bcrypt.compareSync(password, user.password)
        if (isValid) {
            const token = jwt.sign(user._id.toString(), process.env.JWT_SECRET)
            res.status(200).json({
                message: 'success',
                userId: user._id,
                token: token
            })
        } else {
            res.status(401).json({
                message: 'invalid password'
            })
        }
    })
})

router.get('/getUserData', (req, res) => {
    const { token } = req.headers
    try {
        var userId = jwt.verify(token, process.env.JWT_SECRET)
        User.findById(userId).then(user => {
            if (!user) {
                res.status(403).json({
                    message: 'user not found'
                })
                return
            }
            Table.find({adminId:userId}).then(tables=>{
                var tableIds = []
                tables.forEach(table=>{
                    var peopleVote = 0
                    table.data.forEach(elem=>{
                        try{
                            peopleVote += elem.usersInCard.length
                        }catch{
                            peopleVote += elem.usersInShop.length
                        }
                        
                    })
                    tableIds.push({
                        id:table._id,
                        name:table.settings.name,
                        peopleVote
                    })
                })
                res.status(200).json({
                    message: 'success',
                    login:user.login,
                    tables:tableIds
                })
            })
        })
    } catch (e) {
        res.status(403).json({
            message: 'invalid token'
        })
    }


})

module.exports = router