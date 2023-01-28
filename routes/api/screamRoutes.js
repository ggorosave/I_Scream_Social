const router = require('express').Router();
const {
    getScreams,
    createScream,
    getSingleScream,
    updateScream
} = require('../../controllers/screamController');

// /api/screams
router.route('/').get(getScreams).post(createScream);

// /api/screams/:screamId
router('/:screamId').get(getSingleScream).put(updateScream)