const express = require('express');
const router = express.Router();
const userDataController = require('../controllers/userDataController');

router.route('/userData')
    .get(userDataController.getUsersData)
    .post(userDataController.createUsersData)
    .update(userDataController.deleteUserData)

router.get('/verify/:id', userDataController.verify)

module.exports = router;

