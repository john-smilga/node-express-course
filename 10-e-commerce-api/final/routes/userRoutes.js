const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
} = require('../controllers/userController');

const {
  authenticateUser,
  authorizeRoles,
} = require('../middleware/authentication');

router.route('/').get([authenticateUser, authorizeRoles('admin')], getAllUsers);

// placement important || also can place in auth
router.route('/showMe').get(authenticateUser, showCurrentUser);

router
  .route('/:id')
  .get([authenticateUser, authorizeRoles('admin')], getSingleUser);

module.exports = router;
