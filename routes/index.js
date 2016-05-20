var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', appHost: req.headers.host });
});

router.get('/login', function(req, res, next) {
	res.render('login', {title: 'Login', appHost: req.headers.host });
})

router.get('/admin', function(req, res, next) {
	res.render('admin', {title: 'Controle Centre Admin', appHost: req.headers.host });
})

module.exports = router;
