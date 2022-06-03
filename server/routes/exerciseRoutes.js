const express = require('express') // Init express
const router = express.Router() // Init express.Router() middleware
const { getExercises, newExercise } = require('../controllers/exerciseController') //import express functions for desired routes from exerciseController.js

router.get('/', getExercises) // Get req
router.post('/', newExercise) // Post req

module.exports = router //export router for index.js