var router = require('express').Router();
const jwt = require('../helper/jsonWebToken');
const userCtrl = require('../controllers/usersControllers')

router.get('/', userCtrl.all)
router.get('/info', jwt.isLogin, userCtrl.userInfo)
router.post('/register', userCtrl.register)
router.delete('/', userCtrl.remove)
router.post('/login', userCtrl.login)

module.exports = router;
