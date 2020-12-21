const express = require('express');
const voteController = require('../controller/voteController');
const authController = require('../controller/authController');
const router = express.Router();

router.route('/register').post(authController.VerifyAuthorization, voteController.RegisterVote);
router.route('').get(voteController.GetVotes);
router.route('/user').get(authController.VerifyAuthorization, voteController.GetVoteByUserId);
router.route('/').delete(authController.VerifyAuthorization, voteController.DeleteVote);


module.exports = router;