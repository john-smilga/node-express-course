const Task = require('../models/Task')
const asyncWrapper = require('../middleware/async')
const { createCustomError } = require('../errors/custom-error')

const createTask = asyncWrapper(async (req, res, next) => {
  const task = await Task.create(req.body)
  res.status(201).json({ task })
})

const getAllTasks = asyncWrapper(async (req, res, next) => {
  const tasks = await Task.find({})
  res.status(200).json({ tasks, amount: tasks.length })
})
const getTask = asyncWrapper(async (req, res, next) => {
  const { id: taskId } = req.params

  const task = await Task.findOne({ _id: taskId })
  if (!task) {
    return next(createCustomError(`No task with id : ${taskId}`, 404))
  }
  res.status(200).json({ task })
})

const updateTask = asyncWrapper(async (req, res, next) => {
  const { id: taskId } = req.params
  console.log(req.body)
  const task = await Task.findOneAndUpdate({ _id: taskId }, req.body, {
    new: true,
    runValidators: true,
  })

  if (!task) {
    return next(createCustomError(`No task with id : ${taskId}`, 404))
  }

  res.status(200).json({ task })
})
const deleteTask = asyncWrapper(async (req, res, next) => {
  const { id: taskId } = req.params

  const task = await Task.findOneAndDelete({ _id: taskId })
  if (!task) {
    return next(createCustomError(`No task with id : ${taskId}`, 404))
  }
  res.status(200).json({ task: null })
})

module.exports = { createTask, getAllTasks, getTask, updateTask, deleteTask }
