const {model, Schema} = require('mongoose')
const schema = new Schema({
    login:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    name:{
        type:String
    },
    mail:{
        type:String
    }
})

module.exports = model('user',schema)