const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

// @desc       Get Users names and email
// @route      GET api/users
const getUsers = asyncHandler( async(req, res) => {
    const Users = await User.find()
    res.status(200).json({
        name: Users.name,
        email: Users.email
    })
})

// @desc        Register a new, unique user
// @route       GET api/users
// @access      Public
const registerUser = asyncHandler ( async(req, res) => {
    const { name, email, password } = req.body

   res.json(req.body)

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

    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })

    if(user) {
        res.status(201).json({
            _id: user.id,
             name : user.name,
             email: user.email
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})

module.exports = {
    registerUser,
    getUsers,
}