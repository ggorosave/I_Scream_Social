const router = require('express').Router();
const {
    getScreams,
    createScream,
    getSingleScream,
    updateScream,
    deleteScream,
    addReaction,
    removeReaction
} = require('../../controllers/screamController');

// /api/screams
router.route('/').get(getScreams).post(createScream);

// /api/screams/:screamId
router.route('/:screamId').get(getSingleScream).put(updateScream).delete(deleteScream);

// /api/screams/:screamId/reactions
router.route('/:screamId/reactions').post(addReaction);

// /api/screams/:screamId/reactions/:reactionId
router.route('/:screamId/reactions/:reactionId').delete(removeReaction);

module.exports = router;