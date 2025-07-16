const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    username:{
        type:String,
        required: true
    },
    password:{
        type:String,
        required: true
    },
    refreshToken:{
        type:String
    },
    totalExpense:{
        type: Number
    }
})

module.exports = mongoose.model('User',UserSchema)