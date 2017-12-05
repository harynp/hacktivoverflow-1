var router = require('express').Router();
const questionCtrl = require('../controllers/questionControllers')
const images = require('../helper/images')
const jwt = require('../helper/jsonWebToken');


router.get('/', questionCtrl.findAll)
router.get('/:id', questionCtrl.findById)
router.post('/', questionCtrl.create)
router.put('/:id', questionCtrl.edit)
router.delete('/:id', questionCtrl.delete)
router.delete('/', questionCtrl.deleteAll)
router.post('/voteup', jwt.isLogin, questionCtrl.voteUp, questionCtrl.findAll)
router.post('/votedown', jwt.isLogin, questionCtrl.voteDown, questionCtrl.findAll)
module.exports = router;
