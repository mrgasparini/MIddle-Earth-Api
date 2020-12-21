const express = require('express');
const authRouter = require('./authRouter');
const statusHealthRouter = require('./statusHealthRouter');
const userRouter = require('./userRouter');
const placeRouter = require('./placeRouter');
const voteRouter = require('./voteRouter');
const router = express.Router();

router.use('/auth', authRouter);
router.use('/status-health', statusHealthRouter);
router.use('/user', userRouter);
router.use('/place', placeRouter);
router.use('/vote', voteRouter);

module.exports = router;