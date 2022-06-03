const express = require('express') //initialize express
const app = express()
const dotenv = require('dotenv').config() //initialize environmental variables
const Exercise = require('./models/exerciseModel') // Import exercise schema from models folder
const connectDB = require('./config/db') //Database configuration imported
const port = 5000 || process.env.port

connectDB() // Calls mongoose configuration function in config/db.js

// app.use(express.json()) // Express.json middleware, which parses JSON in the REQ object
app.use(express.urlencoded({ extended: false })) // express.urlencoded middleware, which parses ENCODED JSON from the REQ object so that undefined isn't returned
app.use('/api/exercises', require('./routes/exerciseRoutes')) //Uses express routing middleware to cleanup code and put routes in exerciseRoutes.js

app.listen(port, () => { //App listening on defined port, also works well for debugging and checking port
    console.log(`listening on port ${port}`)
}) 