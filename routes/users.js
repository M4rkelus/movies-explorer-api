const router = require('express').Router();

const { getCurrentUser, updProfile } = require('../controllers/users');
const { userValidate } = require('../middlewares/validation');

router.get('/me', getCurrentUser);
router.patch('/me', userValidate, updProfile);

module.exports = router;
