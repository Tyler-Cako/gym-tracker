const mongoose = require('mongoose')
const { Schema, model } = mongoose

const exerciseSchema = new Schema({
    Type: String,
    Exercise: String,
    Weight: Number,
    Reps: Number,
})

const Exercise = model('Exercise', exerciseSchema);

module.exports = Exercise