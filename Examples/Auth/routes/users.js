
const express = require('express');
const router  = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
const createErrors  = require('http-errors');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login',passport.authenticate('local', {session: false}), function(req, res, next) {
      console.log(req.user);
      if (!req.user) {
          return next(createErrors(400));
      }
      
      const token = jwt.sign(req.user, 'selanodecourse');
      return res.json({user:req.user, token});
      
   
});

module.exports = router;
