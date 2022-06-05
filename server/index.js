const express = require('express') //initialize express
const app = express()
const path = require('path') //Initialize path from nodeJS
const dotenv = require('dotenv').config() //initialize environmental variables
const connectDB = require('./config/db') //Database configuration imported
const port = 5000 || process.env.port

connectDB() // Calls mongoose configuration function in config/db.js

app.use(express.json()) // Express.json middleware, which parses JSON in the REQ object
app.use(express.urlencoded({ extended: false })) // express.urlencoded middleware, which parses ENCODED JSON from the REQ object so that undefined isn't returned

app.use('/api/exercises', require('./routes/exerciseRoutes')) //Uses express routing middleware to cleanup code and put routes in exerciseRoutes.js
app.use('/api/users', require('./routes/userRoutes')) //Routing instead to userRoutes.js

app.use(express.static(path.join(__dirname, '../testclient')))

app.listen(port, () => { //App listening on defined port, also works well for debugging and checking port
    console.log(`listening on port ${port}`)
}) 