const express = require("express");
const router = express.Router();
const {
  getAllTasks,
  creatNewTask,
  getSingleTask,
  updateTask,
  deleteTasks,
} = require("../controllers/tasks");

router.route("/").get(getAllTasks).post(creatNewTask);
router.route("/:id").get(getSingleTask).patch(updateTask).delete(deleteTasks);

module.exports = router;
