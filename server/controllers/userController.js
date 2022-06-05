const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const registerUser = asyncHandler ( async(req, res) => {
    const { name, email, password } = req.body

    if(!name || !email || !password ) {
        res.status(400)
        throw new Error('please add all fields')
    }

    // Check if user exists
    
    const userExists = await User.findOne({email})

    if(userExists) {
        res.status(400)
        throw new Error('email already in use')
    }

    // hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
})

module.exports = {
    registerUser,
}