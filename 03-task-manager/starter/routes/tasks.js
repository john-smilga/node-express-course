const express = require('express');
const router = express.Router();

const {getAllTasks} = require('../controlers/tasks')

router.route('/').get(getAllTasks)

module.exports = router