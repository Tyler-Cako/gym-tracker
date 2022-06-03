const Exercise = require('../models/exerciseModel') //Test exercise document for models

const newExerciseModel = new Exercise({
    Type: 'push',
    Exercise: 'Bench Press',
    Weight: 115,
    Reps: 8
})

module.exports = newExerciseModel