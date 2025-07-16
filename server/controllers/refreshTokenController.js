const User = require('../models/User')
const jwt = require('jsonwebtoken')

const handleRefresh = async(req,res)=>{
    const cookies = req.cookies
    if(!cookies?.jwt) res.sendStatus(401)
    const refreshToken = cookies.jwt
    
    const foundUser = await User.findOne({refreshToken}).exec()

    if(!foundUser) return  res.sendStatus(403)
    
    jwt.verify(refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err,decoded)=>{
            if(err || foundUser.username!= decoded.username)
                return res.sendStatus(403)
            const ACCESS_TOKEN = jwt.sign(
                {username: decoded.username},
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn:'5m'}
            )
             res.status(200).json({ACCESS_TOKEN})
        }
    )

   

}

module.exports = {handleRefresh}