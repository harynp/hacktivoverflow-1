const question = require('../models/questionModel')

class questionControllers {
  static findAll(req, res) {
    question.find({})
      .populate('id_user', '_id username email')
      .then(data => {
        res.status(200).send(data)
      })
      .catch(err => {
        res.status(500).send(err)
      })
  }

  static findById(req, res) {
    question.findById({_id: req.params.id})
      .populate('id_user', '_id username email')
      .then(data => {
        res.status(200).send(data)
      })
      .catch(err => {
        res.status(500).send(err)
      })
  }

  static create(req, res) {
    question.create({
        id_user  : req.body.id_user,
        title    : req.body.title,
        content  : req.body.content
        // imgUrl	 : req.file.cloudStoragePublicUrl
      })
      .then(data => {
        res.status(200).send(data)
      })
  }

  static edit(req, res) {
    question.findOneAndUpdate({
        _id: req.params.id
      }, {
        $set: {
          title     : req.body.title,
          content   : req.body.content
          // imgUrl	  : req.file.cloudStoragePublicUrl
        }
      })
      .then(result => {
        res.status(200).send(result)
      })
      .catch(err => {
        res.status(500).send(err)
      })
  }

  static delete(req, res) {
    question.remove({
        _id: req.params.id
      })
      .then(result => {
        console.log(result);
        res.status(200).send(result)
      })
      .catch(err => {
        res.status(500).send(err)
      })
  }

  static deleteAll (req,res) {
    question.remove({})
    .then(result => {
      res.status(200).send(result)
    })
    .catch(err => {
      res.status(500).send(err)
    })
  }
}

module.exports = questionControllers
