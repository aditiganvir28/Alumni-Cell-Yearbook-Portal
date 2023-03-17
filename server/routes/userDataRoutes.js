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
router.post('/searchword', userDataController.getSearchWord);
router.post('/findAUser', userDataController.findAUser);
router.post('/myComments', userDataController.myComments);
router.post('/newComments', userDataController.newComments);
router.post('/getmyComments', userDataController.getMyComments);
router.post('/getNewComments', userDataController.getNewComments);
router.post('/approvedComments', userDataController.approvedComments);
router.post('/rejectedComments', userDataController.rejectedComments);
router.post('/getApprovedComments', userDataController.getApprovedComments);
router.post('/getRejectedComments', userDataController.getRejectedComments);
router.post("/verify", userDataController.verifyPhoneOtp);
router.post("/resendOTP", userDataController.resendOTP);
router.post("/resendMail", userDataController.resendMail);


module.exports = router;

