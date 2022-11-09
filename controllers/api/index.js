const router = require('express').Router();

const userRoutes = require('./userRoutes');
// include page routes in here at some points

router.use('/user', userRoutes);

module.exports = router;