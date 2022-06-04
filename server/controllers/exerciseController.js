const asyncHandler = require('express-async-handler') // Allows express to use ASYNC AWAIT shit for mongoose
const Exercise = require('../models/exerciseModel') //Imported mongoDB Exercise Schema in models
const newExerciseDocument = require('../testDocuments/newExerciseDocument') //Test document for mongoDB and mongoose

// @desc        Get exercises JSON
// @route       GET /api/exercises
// @access      Private
const getExercises = asyncHandler( async (req, res) => {
    const Exercises = await Exercise.find()
    res.status(200).json(Exercises)
})

// @desc        New exercise document
// @route       POST /api/exercises
// @access      Private
const newExercise = asyncHandler( async (req, res) => {
    try {
        // const goal = await Exercise.create(newExerciseDocument)
        const Exer = await Exercise.create({
            type: req.body.type,
            exercise: req.body.name,
            weight: req.body.weight,
            reps: req.body.reps
        })
        res.status(200).json(Exer)
    }
    catch (error) {
        console.log(error)
    }
})

// @desc        Delete all API exercise documents. Clears api
//@route        DELETE /api/exercises
//@access       Private
const deleteExercises = asyncHandler( async (req, res) => {
    try {
        // const goal = await Exercise.create(newExerciseDocument)
        const Exer = await Exercise.deleteMany({ })
        res.send(Exer)
    }
    catch (error) {
        console.log(error)
    }
})

module.exports = { //Export resulting functions from desired routes for exerciseRoutes.js
    getExercises,
    newExercise,
    deleteExercises
} 