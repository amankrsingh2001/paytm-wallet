const express = require('express')
const { getAccountBalance, transferAmount } = require("../controller/accountController")
const { authMiddleware } = require("../middlewares/auth")

const router = express.Router()




router.get('/getbalance', authMiddleware, getAccountBalance)
router.post('/transfer', authMiddleware, transferAmount)

module.exports = router

