const answer = require('../models/answerModel');
const question = require('../models/questionModel');
const jwt = require('../helper/jsonWebToken');

class answerController {
  static findByIdQuestion (req,res) {
    answer.find({
      id_question:req.params.id_question
    })
    .populate({path:'id_user', select: '_id username email'})
    .populate('id_question')
    .then(result => {
      console.log(result);
      res.send(result)
    })
    .catch(err =>{
      res.send(err)
    })
  }

  static add (req,res,next) {
    answer.create({
      id_user:req.locals.id,
      id_question:req.body.id_question,
      content: req.body.content
    })
    .then(result => {
      req.body.id_answer = result._id
      next()
    })
    .catch(err => {
      res.send(err)
    })
  }

  // static voteUp (req,res,next) {
  //   answer.findByIdAndUpdate(req.params.id,
  //   {$push:{"like": req.body._id}},
  //   {safe: true, upsert: true}
  // )
  // .then(rows=>{
  //   res.status(200).json({
  //     "message":"data updated",
  //     "data":rows
  //   });
  // })
  // .catch(err=>{
  //   res.status(400).json(err)
  // })
  // }

  static voteUp(req,res,next){
    answer.findByIdAndUpdate(req.params.id,
      {$push:{"vote_up": req.body._id}},
      {safe: true, upsert: true}
    )
    .then(rows=>{
      res.status(200).json({
        "message":"data updated",
        "data":rows
      });
    })
    .catch(err=>{
      res.status(400).json(err)
    })
  }

  static voteDown (req,res,next) {
    answer.findOneAndUpdate(
      { _id: req.body.id_answer },
      { $pull: { vote_up: req.body.id } }
    )
      .then(result => {
        answer.findOneAndUpdate(
          { _id: req.body.id_answer },
          { $addToSet: { vote_down: req.body.id } }
        )
          .then(result => {
            next()
          })
          .catch(err => {
            res.send(err)
          })
      })
      .catch(err => {
        res.send(err)
      })
  }

  static remove (req,res,next) {
    answer.remove({_id:req.params.id})
    .then(result => {
      next()
    })
    .catch(err => {
      res.send(err)
    })
  }

  static alls (req,res) {
    answer.find({})
    .populate('id_user')
    .populate('id_question')
    .then(result => {
      res.send(result)
    })
    .catch(err => {
      res.send('ERROR NIH')
    })
  }

  static destroyAll (req,res) {
    answer.remove({})
    .then(result => {
      res.send('sukses')
    })
    .catch(err => {
      res.send(err)
    })
  }
}

module.exports = answerController
