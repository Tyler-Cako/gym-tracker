const mongoose = require('mongoose') // Init mongoose
const { Schema, model } = mongoose // Import mongoose utility

const exerciseSchema = new Schema({ //Define exerciseSchema for Exercise MongoDB documents
    type: {
        type: String,
        required: [true, 'Please add an exerise type']
    },
    exercise: {
        type: String,
        required: [true, 'Please add an excercise']
    },
    weight: {
        type: Number,
        required: [true, 'Please add a weight']
    },
    reps: {
        type: Number,
        required: [true, 'please add number of reps']
    },
},
{
    timestamps: true //Adds timestamps to every new Exercise document
})

const Exercise = model('Exercise', exerciseSchema); //Name schema/model

module.exports = Exercise //Export for use in exerciseController.js