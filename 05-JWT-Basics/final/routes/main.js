const express = require('express')
const router = express.Router()

const { login, dashboard } = require('../controllers/main')

const authMiddleware = require('../middleware/auth')

router.route('/dashboard').get(authMiddleware, dashboard)
router.route('/login').post(login)

module.exports = router
