const router = require('express').Router();
const {
    getScreams,
    createScream
} = require('../../controllers/screamController');

// /api/screams
router.route('/').get(getScreams).post(createScream);