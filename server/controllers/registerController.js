const User = require('../models/User')

const bcrypt = require('bcrypt')
const mongoose = require('mongoose')

const handleNewUser =async (req,res)=>{
    const {user,pwd} = req.body;
    if(!user || !pwd) {
        return res.status(400).json({'message':'Username and password are required field.'})
    }
    const duplicateUser = await User.findOne({username:user}).exec()
    if(duplicateUser){
        return res.sendStatus(409)
    }
    try{
        const hashedPassword = await bcrypt.hash(pwd,10)
        const result = await User.create({
        username:user,
        password: hashedPassword
    })
        res.status(200).json({'message':`user ${user} created`})
    }catch(err){
        res.status(500).json({'message':err.message})
    }
}

module.exports = {handleNewUser}