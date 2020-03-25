var passport = require('passport');
var settings = require('../config/settings');
require('../config/passport')(passport);
var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();
var User = require("../model/user");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/user/register', function(req, res){
  if(!req.body.userName || !req.body.password){
    res.json({success : false, msg : 'Please pass username and password'})
  }else{
    var newUser = new User({
      userName : req.body.userName,
      password : req.body.password
    })
    newUser.save(function(err){
      if(err){
        return res.json({success : false, msg : 'username already exists'})
      }
      res.json({success : true, msg : 'Successful create new user'})
    })
  }
})

router.post('/user/login', function(req, res){
  User.findOne({
      userName : req.body.userName
  }, function(err, user){
      if(err) throw err;

      if(!user){
        res.status(401).send({success : false, msg : 'Authentication failed.user not found'})
      }else{
        user.comparePassword(req.body.password, function(err, isMatch){
            if(isMatch && !err){
                let newUser = {
                  userName : req.body.userName,
                  loggedIn : true,
                  userId : user._id
                }
                
                let token = jwt.sign(user.toJSON(), settings.secret);
                res.json({success : true, token : 'JWT' + token, user : newUser})
            }else{
              res.status(401).send({success : false, msg : 'Authentication failed. wrong password'})
            }
        })
      }
  })
})




module.exports = router;
