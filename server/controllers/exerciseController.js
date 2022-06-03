const asyncHandler = require('express-async-handler') // Allows express to use ASYNC AWAIT shit for mongoose
const Exercise = require('../models/exerciseModel') //Imported mongoDB Exercise Schema in models
const newExerciseDocument = require('../testDocuments/newExerciseDocument') //Test document for mongoDB and mongoose

// @desc        Get exercises JSON
// @route       GET /api/exercises
// @access      Private
const getExercises = asyncHandler( async (req, res) => {
    const Goals = await Exercise.find()
    res.status(200).json(Goals)
})

// @desc        New exercise document
// @route       POST /api/exercises
// @access      Private
const newExercise = asyncHandler( async (req, res) => {
    try{
        const goal = await Exercise.create(newExerciseDocument)

        res.status(200).send(`goal recieved! goal is ${goal}`)
    }
    catch (error) {
        console.log(error)
    }
})

module.exports = { //Export resulting functions from desired routes for exerciseRoutes.js
    getExercises,
    newExercise
} 