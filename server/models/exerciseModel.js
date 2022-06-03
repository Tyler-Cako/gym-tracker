const mongoose = require('mongoose') // Init mongoose
const { Schema, model } = mongoose // Import mongoose utility

const exerciseSchema = new Schema({ //Define exerciseSchema for Exercise MongoDB documents
    Type: String,
    Exercise: String,
    Weight: Number,
    Reps: Number,
},
{
    timestamps: true //Adds timestamps to every new Exercise document
})

const Exercise = model('Exercise', exerciseSchema); //Name schema/model

module.exports = Exercise //Export for use in exerciseController.js