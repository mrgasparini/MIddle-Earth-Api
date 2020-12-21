const express = require('express');
const placeController = require('../controller/placeController');
const authController = require('../controller/authController');
const router = express.Router();

router.route('/register').post(authController.VerifyAuthorization, placeController.RegisterPlace);
router.route('/update').post(authController.VerifyAuthorization, placeController.UpdatePlace);
router.route('/:id').delete(authController.VerifyAuthorization, placeController.DeletePlace);
router.route('').get(placeController.GetAllPlaces);

module.exports = router;