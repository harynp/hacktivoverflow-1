const express = require('express');
const router = express.Router();
const jwt = require('../helper/jsonWebToken');

const answerCtrl = require('../controllers/answerControllers')
const questionCtrl = require('../controllers/questionControllers');

router.get('/', answerCtrl.alls)
router.get('/find/:id_question', answerCtrl.findByIdQuestion)
// router.post('/', jwt.isLogin, answerCtrl.add, questionCtrl.pushAnswer)

router.post('/', jwt.isLogin, answerCtrl.add, questionCtrl.pushAnswer)
router.delete('/:id', jwt.isLogin, jwt.authUser, answerCtrl.remove, questionCtrl.pullAnswer)
router.post('/voteup/:id_question', jwt.isLogin, answerCtrl.voteUp, answerCtrl.findByIdQuestion)
router.post('/votedown/:id_question', jwt.isLogin, answerCtrl.voteDown, answerCtrl.findByIdQuestion)

module.exports = router;
