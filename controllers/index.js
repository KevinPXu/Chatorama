const router = require('express').Router();

const apiRoutes = require('./api');
// include page routes in here at some points
const homeRoutes = require('./homeRoutes');

router.use('/api', apiRoutes);
router.use('/', homeRoutes);

module.exports = router;