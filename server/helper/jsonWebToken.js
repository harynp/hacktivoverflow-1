const jwt = require('jsonwebtoken');
require('dotenv').config()

  function isLogin(req,res,next){
    jwt.verify(req.headers.token, process.env.SECRET_KEY,(err,decoded)=>{
      if(!err){
        req.locals = decoded
        next()
      }
      else{
          console.log(err)
          res.send(err)
      }
    })
  }

  function authUser(req,res,next){
    if(req.locals.id === req.params.id){
      next()
    }
    else if (req.locals.id === req.body.id){
      next()
    }
    else{
      res.send("access denied")
    }
  }


module.exports = {
  isLogin,
  authUser
}
