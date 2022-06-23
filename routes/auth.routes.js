const router = require('express').Router();
const authController = require('../controller/AuthController');
const AuthController = require('../controller/AuthController');
const verifyToken = require('../middleware/verifyToken');

router.post('/auth/register', AuthController.getRegister);
router.post('/auth/login', AuthController.login);
router.get ('/auth/profile',verifyToken, authController.profile);
module.exports = router;