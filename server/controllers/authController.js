const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const handleLogin =async (req,res)=>{
    const {user,pwd} = req.body;
    if(!user || !pwd ){
        return res.status(400).json({'message':'username and password are required field'})
    }
    const foundUser = await User.findOne({username: user}).exec()
    if(!foundUser){
        return res.sendStatus(401)
    }
    const match = await bcrypt.compare(pwd,foundUser.password)
    if(match){
        const ACCESS_TOKEN = jwt.sign(
            {username: foundUser.username},
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: '5m'}
        )
        const REFRESH_TOKEN = jwt.sign(
            {username: foundUser.username},
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn:'1d'}
        )
        foundUser.refreshToken = REFRESH_TOKEN;
        await foundUser.save()
        res.cookie('jwt',REFRESH_TOKEN,{ httpOnly: true, sameSite: 'None',  maxAge: 24 * 60 * 60 * 1000 })
        res.status(200).json({ACCESS_TOKEN})
    }
    else{
       res.sendStatus(401)
    }  
}

module.exports = {handleLogin}