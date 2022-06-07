const express = require('express') // Init express
const router = express.Router() // Init express.Router() middleware
const { 
    getExercises,
    newExercise,
    deleteExercises 
} = require('../controllers/exerciseController') //import express functions for desired routes from exerciseController.js
const protect = require('../middleware/authMiddleware')

router.route('/').get(protect, getExercises).post(protect, newExercise) // GET/POST req sent to exerciseController.js
router.delete('/', protect, deleteExercises) // DELETE request that currently clears exercise API


module.exports = router //export router for index.js