const router = require('express').Router();
const userController = require('../controller/UserController');
const verifyToken = require('../middleware/verifyToken');
const superAdmin = require('../middleware/isSuperAdmin');

router.get('/users', verifyToken,superAdmin, userController.getAll);
// router.post('/users', userController.getCreate);
router.get('/users/:id', verifyToken,superAdmin,userController.getById);
router.delete('/users/:id', userController.delete);


module.exports = router;