const mongoose = require('mongoose') // Initialize mongoose

const userSchema = mongoose.Schema({ // Create new schema from mongoose class
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please add a password']
    },
},
{
    timestamps: true // Gives timestamps for every new document created with model
})

module.exports = mongoose.model('User', userSchema) // Makes new model with the name "User". Exported for to register users