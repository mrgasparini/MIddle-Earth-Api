const express = require('express');
const statusHealthController = require('../controller/statusHealthController');
const router = express.Router();

router.route('/').get(statusHealthController.getStatus);

module.exports = router;