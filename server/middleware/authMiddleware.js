const jwt = require('jsonwebtoken') // Initializes jsonwebtoken for use in this middleware
const asyncHandler = require('express-async-handler') // asyncHandler because async processes occuring
const User = require('../models/userModel')

const protect = asyncHandler( async(req, res, next) => {
    let token

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) { // Run only if there is authorization that starts with BEARER
        try {
            token = req.headers.authorization.split(' ')[1] // Authorization token returns a value among the lines of: BEARER <Token>. This splits the token into the part we care about, and removed the BEARER component.

            console.log(token)
            
            const decoded = jwt.verify(token, process.env.JWT_SECRET) // Decodes the JWT token using the secret in the environmental variable
            console.log(decoded)
            req.user = await User.findById(decoded.id).select('-password') // Assigns the user component of a request with its corresponding ID identified from the decoded JWT token
            next() // This is middleware, therefore next() needs to be called for the rest of the code can be completed
        } catch(error) { // If authorization tokens do not match
            console.log(error)
            res.status(401)
            throw new Error('not authorized')
        }
    }

    if(!token) {
        res.status(401)
        throw new Error('Not authorized, no token')
    }
})

module.exports = protect