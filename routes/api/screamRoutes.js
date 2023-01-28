const router = require('express').Router();
const {
    getScreams,
    createScream,
    getSingleScream,
    updateScream,
    deleteScream,
    addReaction
} = require('../../controllers/screamController');

// /api/screams
router.route('/').get(getScreams).post(createScream);

// /api/screams/:screamId
router('/:screamId').get(getSingleScream).put(updateScream).delete(deleteScream);

// /api/screams/:screamId/reactions
router('/:screamId/reactions').post(addReaction)