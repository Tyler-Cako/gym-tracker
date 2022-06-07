const express = require('express') // Initialize express
const router = express.Router() // Initialize router middlewear
const { 
registerUser,
getUsers,
loginUser
} = require('../controllers/userController') // Insert functions exported from userController.js
const authenticator = require('../middleware/authMiddleware') // Insert authentication middleware for private requests

router.get('/', authenticator, getUsers) // GET request for all users at /api/users. Private request so authenticator middleware is used
router.post('/', registerUser) // Register new user via POST request at /api/users
router.post('/login', loginUser) // Userlogin

module.exports = router