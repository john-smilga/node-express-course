const express = require("express");
const router = express.Router();
const {
  getAllTasks,
  creatNewTask,
  getSingleTask,
  updateTask,
  deleteTasks,
} = require("../controllers/tasks");

router.route("/").get(getAllTasks).post(creatNewTask).patch(updateTask);
router.route("/:id").get(getSingleTask).delete(deleteTasks);

module.exports = router;
