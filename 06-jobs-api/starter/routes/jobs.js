const express = require("express");
const router = express.Router();
const {
  getAlljobs,
  updateJob,
  createJob,
  deleteJob,
  getJob,
} = require("../controllers/jobs");

router.route("/").post(createJob).get(getAlljobs);
router.route("/:id").get(getJob).delete(deleteJob).put(updateJob);

module.exports = router;
