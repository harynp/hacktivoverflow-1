const question = require('../models/questionModel')

class questionControllers {
  static findAll(req, res) {
    question.find({})
      .populate('id_user')
      .then(data => {
        console.log('ISI DATA GET QUESTION', data);
        res.status(200).send(data)
      })
      .catch(err => {
        res.status(500).send(err)
      })
  }

  static findById(req, res) {
    question.findById({_id: req.params.id})
      .populate('id_user', 'id username email')
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
        }
      }, {new: true})
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

  static voteUp(req,res,next){
    question.findByIdAndUpdate({_id:req.params.id},
    {$addToSet:{"vote_up": req.body.userId}
    })
    .then(rows=>{
      res.status(200).send(rows);
    })
    .catch(err=>{
      res.status(400).json(err)
    })
  }

  static voteDown(req,res,next){
    question.findByIdAndUpdate({_id:req.params.id},
    {$pull:{"vote_up": req.body.userId}
    })
    .then(rows=>{
      res.status(200).send(rows);
    })
    .catch(err=>{
      res.status(400).json(err)
    })
  }

  static pushAnswer (req,res) {
    question.update(
      { _id: req.body.id_question },
      {
        $push: { answer: req.body.id_answer }
      })
      .then(resultQuestion => {
        res.send(resultQuestion)
      })
      .catch(err => { console.log(err) })
  }

  static pullAnswer (req,res) {
    question.update(
      { _id: req.body.id_question },
      {
        $pull: { answer: req.params.id }
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
