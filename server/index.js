const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
const Exercise = require('./models/exercise')
const port = 5000 || process.env.port

mongoose.connect(process.env.MONGO_URI)

app.get('/', () => {
    
})

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})