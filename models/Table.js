const {model,Schema} = require('mongoose')

const schema = new Schema({
    adminId:{
        type:String,
        required:true
    },
    data:{
        type:Array,
        required:true
    },
    fields:{
        type:Array,
        required:true
    },
    userFields:{
        type:Array,
        required:true
    },
    settings:{
        type:Object,
        required:true
    }

})

module.exports = model('table',schema)