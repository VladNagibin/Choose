const express = require('express')
const jwt = require('jsonwebtoken')
function validToken(req,res,next){
    const {token} = req.headers
    try{
        jwt.verify(token,process.env.JWT_SECRET)
        next()
    }catch(e){
        res.status(401).json({
            message:'invalid token'
        })
    }
}
module.exports = {validToken}