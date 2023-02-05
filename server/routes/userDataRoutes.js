const express = require('express');
const router = express.Router();
const userDataController = require('../controllers/userDataController');

router.route('/userData')
    .get(userDataController.getUsersData)
    .post(userDataController.createUsersData)
    .put(userDataController.updateUserData)

router.get('/verify/:id', userDataController.verify)

module.exports = router;

