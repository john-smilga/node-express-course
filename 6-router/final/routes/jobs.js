const express = require('express')
const router = express.Router()

const {
  getJobs,
  createJob,
  getSingleJob,
  updateJob,
  deleteJob,
} = require('../controllers/jobs')

// router.get('/', getJobs)
// router.post('/', createJob)
// router.get('/:id', getSingleJob)
// router.put('/:id', updateJob)
// router.delete('/:id', deleteJob)

router.route('/').get(getJobs).post(createJob)
router.route('/:id').get(getSingleJob).put(updateJob).delete(deleteJob)

module.exports = router
