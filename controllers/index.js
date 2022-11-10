const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
// include page routes in here at some points

router.use('/api', apiRoutes);
router.use('/', homeRoutes);

module.exports = router;