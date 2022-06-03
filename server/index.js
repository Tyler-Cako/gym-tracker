const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
const Exercise = require('./models/exercise')
const port = 5000 || process.env.port

mongoose.connect(process.env.MONGO_URI)

app.get('/', () => {
    
})
const benchPress = new Exercise({
    Type: 'push',
    Exercise: 'Bench Press',
    Weight: 115,
    Reps: 8
})

app.use('/api/exercises', require('./routes/exerciseRoutes'))


app.listen(port, () => {
    console.log(`listening on port ${port}`)
})