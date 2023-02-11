const express = require('express');
const router = express.Router();
const userDataController = require('../controllers/userDataController');

router.route('/userData')
    .get(userDataController.getUsersData)
    .post(userDataController.createUsersData)
    .put(userDataController.updateUserData)

router.get('/verify/:id', userDataController.verify);
router.post('/profile', userDataController.getProfileData);
router.post('/wordEntered', userDataController.getWordEntered);
router.post('/searchword', userDataController.getSearchWord)

module.exports = router;

