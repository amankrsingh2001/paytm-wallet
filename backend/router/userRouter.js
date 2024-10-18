const express = require('express')
const { signUp, signIn, updateUser, bulkUser } = require("../controller/userController")
const { authMiddleware } = require("../middlewares/auth")

const router = express.Router()

router.post('/signup', signUp)
router.post('/signin', signIn)
router.put('/update',authMiddleware, updateUser)

router.get('/bulk',authMiddleware ,bulkUser)


module.exports = router
