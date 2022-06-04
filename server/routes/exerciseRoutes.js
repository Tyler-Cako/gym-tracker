const express = require('express') // Init express
const router = express.Router() // Init express.Router() middleware
const { 
    getExercises,
    newExercise,
    deleteExercises 
} = require('../controllers/exerciseController') //import express functions for desired routes from exerciseController.js

router.route('/').get(getExercises).post(newExercise) // GET/POST req sent to exerciseController.js
router.delete('/', deleteExercises)


module.exports = router //export router for index.js