const Users = require('../models/userModel');
const jwt   = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);
require('dotenv').config()

class userController {
  static all (req,res) {
    Users.find({}).then(result=>{
      res.send(result)
    })
    .catch(err=>{
      res.send(err)
    })
  }

  static userInfo (req,res) {
    res.send(req.locals)
  }

  static register (req,res) {
    var hash = bcrypt.hashSync(req.body.password, salt)
    Users.create({
      username:req.body.username,
      password:hash,
      email:req.body.email
    })
    .then(result=>{
      res.send(result)
    })
    .catch(err=>{
      res.send(err)
    })
  }

  static single (req,res) {
    Users.findOne({_id:req.params.id})
    .then(result=>{
      res.send(result)
    })
    .catch(err=>{
      res.send(err)
    })
  }

  static update (req,res) {
    if(req.body.password)
    var hash = bcrypt.hashSync(req.body.password, salt)
    Users.findOneAndUpdate({_id:req.params.id},{
      username:req.body.username,
      password:hash,
      email:req.body.email
    })
    .then(result=>{
      res.send(result)
    })
    .catch(err=>{
      res.send(err)
    })
  }

  static remove (req,res) {
    Users.remove({_id:req.params.id})
    .then(result=>{
      res.send(result)
    })
    .catch(err=>{
      res.send(err)
    })
  }

  static login (req,res) {
    Users.findOne({username:req.body.username})
    .then(data=>{
      console.log('INI ISI DATA', data);
      if (bcrypt.compareSync(req.body.password, data.password)) {
        var token = jwt.sign({
          id       : data._id,
          username : data.username,
          email    : data.email
        }, process.env.SECRET_KEY)
        res.send(token)
      }else{
        res.send(
          'Wrong Password'
        )
      }
    })
    .catch(err=>{
      res.send('username does not exist')
    })
  }

  static verify (req,res,next) {
    jwt.verify(req.body.token, process.env.SECRET_KEY,(err,decoded)=>{
      if(!err){
        req.locals = decoded
        next()
      }
      else{
        console.log(err)
      }
    })
  }
}



module.exports = userController
