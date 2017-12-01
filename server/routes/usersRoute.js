var router = require('express').Router();
const jwt = require('../helper/jsonWebToken');
const userCtrl = require('../controllers/usersControllers')

router.get('/', userCtrl.all)
router.get('/info', jwt.isLogin, userCtrl.userInfo)
router.post('/', userCtrl.register)
router.delete('/', userCtrl.remove)
router.post('/login', userCtrl.login)

module.exports = router;
