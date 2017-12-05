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

  static voteUp (req,res,next) {
    question.findOneAndUpdate(
      {_id:req.body.id_question},
      {$pull:{vote_down:req.body.id}}
    )
    .then(resultPull=>{
      question.findOneAndUpdate(
        { _id: req.body.id_question },
        {$addToSet: { vote_up: req.body.id }}
      )
        .then(resultPush => {
          next()
        })
        .catch(err => {
          res.send(err)
        })
    })
    .catch(err=>{
      res.send(err)
    })
  }

  static voteDown (req,res,next) {
    question.updateOne(
      { _id: req.body.id_question },
      { $pull: { vote_up: req.body.id } }
    )
    .then(resultPull =>{
      question.updateOne(
        { _id: req.body.id_question },
        { $addToSet: { vote_down: req.body.id } }
      )
        .then(resultPush => {
          next()
        })
        .catch(err => {
          res.send(err)
        })
    })
    .catch(err=>{
      res.send(err)
    })
  }

  static pushAnswer (req,res) { // called in answer routes
    question.update(
      { _id: req.body.id_question },//idQuestion
      {
        $push: { answer: req.body.id_answer }// idAnswer
      })
      .then(resultQuestion => {
        console.log('hahahahha ' + JSON.stringify(resultQuestion))
        res.send(resultQuestion)
      })
      .catch(err => { console.log(err) })
  }

  static pullAnswer (req,res) { // called in answer routes
    question.update(
      { _id: req.body.id_question }, // id question
      {
        $pull: { answer: req.params.id } // id answer
    })
    .then(hasil => {
      res.send(hasil)
    })
    .catch(err => {
      res.send('error')
    })
  }
}

module.exports = questionControllers
