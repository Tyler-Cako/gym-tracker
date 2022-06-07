const jwt = require('jsonwebtoken') // Init Json Web Token
const bcrypt = require('bcryptjs') //Init Bcrypt to encrypt password
const asyncHandler = require('express-async-handler') // Inits asyncHandler which allows express to handle asyncronous promises from Mongoose
const User = require('../models/userModel') // Import model "User" from userModel.js

// @desc       Get Users 
// @route      GET api/users
// @access     Private
const getUsers = asyncHandler( async(req, res) => {
    const Users = await User.find()
    res.status(200).json(Users)
})

// @desc        Register a new, unique user
// @route       POST api/users
// @access      Public
const registerUser = asyncHandler ( async(req, res) => {
    const { name, email, password } = req.body // Sets

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
        password: hashedPassword,
        token: generateToken(user._id)
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

// @desc        Login user
// @route       POST api/users/login
// @access      Public
const loginUser = asyncHandler( async(req, res) => {
    const { email, password } = req.body

    const userExists = await User.findOne({email})

    if(userExists && (await bcrypt.compare(password, userExists.password))) {
        res.json({
            _id: userExists.id,
            name : userExists.name,
            email: userExists.email,
            token: generateToken(userExists._id)
        })
    } else {
        throw new Error('invalid credentials')
    }
})

const generateToken = (id) => {
    return jwt.sign(id, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}

module.exports = {
    registerUser,
    getUsers,
    loginUser
}