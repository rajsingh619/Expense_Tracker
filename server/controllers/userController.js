const User = require('../models/User')

const getUser = async(req,res)=>{
    const users = await User.find().exec()
    res.json({users})
}

module.exports = {getUser}