const express = require('express');
const router = express.Router();
const {
    getTasks, 
    postTasks,
    getSingleTask,
    updateTask,
    deleteTask
    } = require('../controllers/task')




router.route('/').get(getTasks).post(postTasks)
router.route('/:id').get(getSingleTask).patch(updateTask).delete(deleteTask)




module.exports = router