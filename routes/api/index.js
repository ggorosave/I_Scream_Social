// api folder router index
const router = require('express').Router();
// import user and scream routers here
const userRoutes = require('./userRoutes');

// define routes here
router.use('/users', userRoutes);


module.exports = router;