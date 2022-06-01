const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
const Exercise = require('./models/exercise')
const port = 5000 || process.env.port

mongoose.connect(`mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@gymtrackcluster.8748p.mongodb.net/?retryWrites=true&w=majority`)

const benchPress = new Exercise({
    Type: 'push',
    Exercise: 'Bench Press',
    Weight: 115,
    Reps: 8
})

benchPress.save().then(result => {
    console.log('Exercise saved!')
    console.log(result)
})

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})