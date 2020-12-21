const express = require('express');
const userController = require('../controller/userController');
const router = express.Router();

router.route('/register').post(userController.RegisterUser);

module.exports = router;