var router = require('express').Router();
const questionCtrl = require('../controllers/questionControllers')
const images = require('../helper/images')
const jwt = require('../helper/jsonWebToken');


router.get('/', questionCtrl.findAll)
router.get('/:id', questionCtrl.findById)
router.post('/', images.multer.single('imgUrl'), images.sendUploadToGCS, questionCtrl.create)
router.put('/:id', questionCtrl.edit)
router.delete('/:id', questionCtrl.delete)
router.delete('/', questionCtrl.deleteAll)

module.exports = router;
