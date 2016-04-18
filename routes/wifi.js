var express = require('express');
var router = express.Router();

// SuperMesh app functions
var SuperMesh = require("../private/js/app_functions.js");

/* GET network settings. */
router.get('/', function(req, res, next) {
  res.render('wifi', {title: 'Controle Centre Admin'});
});

router.get('/iwlist', function(req, res, next) {

	var iwlist = require('wireless-tools/iwlist');
 
	iwlist.scan('wlan1', function(err, networks) {
	  res.send(networks);
	});

});

module.exports = router;
