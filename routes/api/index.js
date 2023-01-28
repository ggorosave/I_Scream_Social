// api folder router index
const router = require('express').Router();
const userRoutes = require('./userRoutes');
const screamRoutes = require('./screamRoutes');

// /api
router.use('/users', userRoutes);
router.use('/screams', screamRoutes);



module.exports = router;