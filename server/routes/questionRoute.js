var router = require('express').Router();
const jwt = require('../helper/jsonWebToken');
const questionCtrl = require('../controllers/questionControllers')

router.get('/', questionCtrl.findAll)

module.exports = router;
