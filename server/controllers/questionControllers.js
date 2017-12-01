const question = require('../models/questionModel')

class questionControllers {
  static findAll (req,res) {
    question.find({})
    .populate('id_user', '_id username email')
    .populate('answer')
    .then(data=>{
      res.status(200).send(data)
    })
    .catch(err=>{
      res.status(500).send(err)
    })
  }

  static create (req,res) {
    question.create({
      id_user: req.body.id_user,
      title: req.body.title,
      content: req.body.content
    })
    .then(data => {
      res.status(200).send(data)
    })
  }
}

module.exports = questionControllers
