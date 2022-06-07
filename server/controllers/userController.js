const jwt = require('jsonwebtoken') // Init Json Web Token
const bcrypt = require('bcryptjs') //Init Bcrypt to encrypt password
const asyncHandler = require('express-async-handler') // Inits asyncHandler which allows express to handle asyncronous promises from Mongoose
const User = require('../models/userModel') // Import model "User" from userModel.js

// @desc       Get Users 
// @route      GET api/users
// @access     Private
const getUsers = asyncHandler( async(req, res) => {
    const Users = await User.find().select("-password")
    res.status(200).json(Users)
})

// @desc        Register a new, unique user
// @route       POST api/users
// @access      Public
const registerUser = asyncHandler ( async(req, res) => {
    const { name, email, password } = req.body // Sets request components to reusable values

    if(!name || !email || !password ) { //if there is no name, email or password in the request, send a 400 bad request error
        res.status(400)
        throw new Error('please add all fields')
    }

    // Check if user exists
    
    const userExists = await User.findOne({email}) // Searches database for email that matches the one sent in request

    if(userExists) { // Thorws a 400 bad request error if the email is already found in the database
        res.status(400)
        throw new Error('email already in use')
    }

    // hash password
    const salt = await bcrypt.genSalt(10) // Generates a unique salt, which is a 10 symbol value generated to be put on the password
    const hashedPassword = await bcrypt.hash(password, salt) // Hashes password with the salt. This makes it so two of the same passwords result in a different hashed value

    const user = await User.create({ // Create new user for the database using the user model created in userModel.js
        name,
        email,
        password: hashedPassword, // Saves encrypted password in the database for security
    })

    if(user) { // Current successful register user POST request response
        res.status(201).json({
            _id: user.id,
            name : user.name,
            email: user.email,
            token: generateToken(user._id) // Generates a JWT token based on the ID for authentication.
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

    const userExists = await User.findOne({email}) // Checks database to see if user exists

    if(userExists && (await bcrypt.compare(password, userExists.password))) { // If user exists AND the hashed password and the entered password match, then user is allowed to continue bcrypt.compare returns a true or false value
        res.json({
            _id: userExists.id,
            name : userExists.name,
            email: userExists.email,
            token: generateToken(userExists.id) //Generates JWT token for authentication
        })
    } else {
        throw new Error('invalid credentials')
    }
})

const generateToken = (id) => { // Generates a JWT token using the user id and the JWT_SECRET placed in environmental variables. JWT then hashes this information. The token expires in 30 days.
    return jwt.sign( {id} , process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}

module.exports = {
    registerUser,
    getUsers,
    loginUser
}