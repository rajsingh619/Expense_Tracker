const mongoose = require('mongoose')
require('dotenv').config()

const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.DATABASE_URI)
    }catch(err){
        console.error(err)
    }
}

module.exports = connectDB