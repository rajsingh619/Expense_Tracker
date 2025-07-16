const express = require('express')
const app = express();
const cors = require('cors')
require('dotenv').config();
const mongoose = require('mongoose')
const connectDB = require('./config/dbConn')
const cookieParser = require('cookie-parser')
const verifyJWT = require('./middleware/verifyJWT')

app.use(cors())

app.use(express.json())

app.use(cookieParser())

connectDB();



app.use('/register',require('./routes/register'))
app.use('/auth',require('./routes/auth'))
app.use('/refresh',require('./routes/refresh'))

app.use(verifyJWT)
app.use('/users',require('./routes/api/users'))

mongoose.connection.once('open',()=>{
    console.log('Database connected')
    app.listen(5000,()=>{
    console.log('server running on port 5000')
})
})

