const getAllTasks = (req, res) => {
  res.send('Get tasks')
}

const createTask = (req, res) => {
  const { name } = req.body
  res.json({ success: true, message: `welcome ${name}` })
}
const getTask = (req, res) => {
  const { id } = req.params
  res.send(`Get single task id: ${id}`)
}
const updateTask = (req, res) => {
  res.send('Update task')
}
const deleteTask = (req, res) => {
  res.send('Delete task')
}

module.exports = { getAllTasks, createTask, getTask, updateTask, deleteTask }
