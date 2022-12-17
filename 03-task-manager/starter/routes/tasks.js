const express = require('express')
const {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
} = require('../controller/tasks')

const router = express.Router()

router.get('/', getAllTasks).post('/', createTask)
router.get('/:id', getTask).patch('/:id', updateTask).delete(':/id', deleteTask)

module.exports = router
