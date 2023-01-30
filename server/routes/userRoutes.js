const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.route('/auth')
    .get(userController.getAllusers)
    .post(userController.createUsers)

module.exports = router;
