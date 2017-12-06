const express = require('express');
const router = express.Router();
const jwt = require('../helper/jsonWebToken');

const answerCtrl = require('../controllers/answerControllers')
const questionCtrl = require('../controllers/questionControllers');

router.get('/', answerCtrl.alls)
router.get('/find/:id_question', answerCtrl.findByIdQuestion)
router.post('/', jwt.isLogin, answerCtrl.add, questionCtrl.pushAnswer)
router.delete('/:id', answerCtrl.remove, questionCtrl.pullAnswer)
router.put('/:id/voteup', jwt.isLogin, answerCtrl.voteUp, answerCtrl.findByIdQuestion)
router.put('/:id/votedown', jwt.isLogin, answerCtrl.voteDown, answerCtrl.findByIdQuestion)

module.exports = router;
