const express = require('express')
const router = express.Router()

const {login, dashboard} = require('../controllers/main')

router.router('/dashboard').get(dashboard)

router.router('/login').post(login)

module.exports(router)