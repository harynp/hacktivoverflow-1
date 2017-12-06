var router = require('express').Router();
const questionCtrl = require('../controllers/questionControllers')
const jwt = require('../helper/jsonWebToken');


router.get('/', questionCtrl.findAll)
router.get('/:id', questionCtrl.findById)
router.post('/', jwt.isLogin, questionCtrl.create)
router.put('/:id', questionCtrl.edit)
router.delete('/:id', questionCtrl.delete)
router.delete('/', questionCtrl.deleteAll)
router.put('/:id/voteup', jwt.isLogin, questionCtrl.voteUp, questionCtrl.findAll)
router.put('/:id/votedown', jwt.isLogin, questionCtrl.voteDown, questionCtrl.findAll)

module.exports = router;
