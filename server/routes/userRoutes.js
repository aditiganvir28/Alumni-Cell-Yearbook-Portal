const express = require('express');
const router = express.Router();
const userController = require('../controllers/userDataController');

router.route('/auth')
    .get(userController.getAllusers)
    .post(userController.createUser)

module.exports = router;
