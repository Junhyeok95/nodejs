var express = require('express');
var User = require('../models').User;

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  User.findAll()
    .then((users) => {
      res.render('sequelize', { users }); // views 의 sequelize.pug 를 호출
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });
});

module.exports = router;
