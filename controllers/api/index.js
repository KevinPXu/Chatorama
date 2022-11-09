const router = require('express').Router();

const userRoutes = require('./userRoutes');
const messageRoutes = require('./messageRoutes');
// include page routes in here at some points

router.use('/user', userRoutes);
router.use('/message', messageRoutes);

module.exports = router;