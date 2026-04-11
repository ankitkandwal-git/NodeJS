const express = require('express')
const db = require('./config/db')
const app = express()
db()
app.listen(3000,() =>{
    console.log('Server is running on port 3000')
})