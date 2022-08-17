const { Router } = require('express')
const router = Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
router.post('/registration', (req, res) => {
    const { login, password } = req.body
    bcrypt.hash(password, 10).then(function(hashPassword) {
        const user = new User({
            login,
            password:hashPassword
        })
        user.save().then(result => {
            res.status(200).json({
                message:'user created'
            })
        }, err => {
            res.status(401).json({
                message:'registration fail',
                err: err
            })
        })
    });
    

})

router.post('/login',(req,res)=>{
    const {userLogin,password} = req.body
    User.findOne({login:userLogin}).then(user=>{
        if (!user) {
            res.status(401).json({ message: 'user not exist' })
            return
        }
        const isValid = bcrypt.compareSync(password,user.password)
        if (isValid){
            const token = jwt.sign(user._id.toString(),process.env.JWT_SECRET)
            res.status(200).json({
                message:'success',
                userId:user._id,
                token:token
            })
        }else{
            res.status(401).json({
                message:'invalid password'
            })
        }
    })
})
module.exports = router