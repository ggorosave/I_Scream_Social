const router = require('express').Router();
// imports controller methods
const {
    getUsers,
    createUser
} = require('../../controllers/userController');

// /api/users
router.route('/').get(getUsers).post(createUser);

module.exports = router;