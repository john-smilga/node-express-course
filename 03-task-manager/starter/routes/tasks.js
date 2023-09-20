const express = require('express')
const router = express.Router()


const {
    getAllTask,
    deleteTask,
    updateTask,
    getTask,
    createTask
} = require('../controllers/tasks.js')

router.route('/').get(getAllTask).post(createTask)
router.route('/:id').get(getTask).patch(updateTask).delete(deleteTask)

module.exports = router