const express = require('express')
const router = express.Router()


const { authUser, logoutUser, registerUser } = require('../controllers/userControllers')

router.post('/auth', authUser)

router.post('/logout', logoutUser)

router.post('/', registerUser)

module.exports = router