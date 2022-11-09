const router = require('express').Router();

const apiRoutes = require('./api');
// include page routes in here at some points

router.use('/api', apiRoutes);

module.exports = router;