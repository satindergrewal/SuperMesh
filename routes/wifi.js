var express = require('express');
var router = express.Router();

// SuperMesh app functions
var SuperMesh = require("../private/js/app_functions.js");

/* GET network settings. */
router.get('/', function(req, res, next) {
  res.render('wifi', {title: 'Controle Centre Admin'});
});

//Get WiFi list from nearby area
router.get('/iwlist', function(req, res, next) {

	var iwlist = require('wireless-tools/iwlist');
 
	iwlist.scan('wlan1', function(err, networks) {
	  res.send(networks);
	});

});

router.get('/wlan1status', function(req, res, next) {
	var wlan1status = require('wireless-tools/ifconfig');
 
	wlan1status.status('wlan1',function(err, status) {
	  res.send(status);
	  $( "#wlan1_ipaddr" ).val( data['ipv4_address'] );
	  $( "#wlan1_subnet" ).val( data['ipv4_subnet_mask'] );
	  $( "#wlan1_routeip" ).val( data['ipv4_address'] );
	});
});

router.get('/wlan1iwconfig', function(req, res, next) {
	var wlan1iwconfig = require('wireless-tools/iwconfig');
 
	wlan1iwconfig.status('wlan1',function(err, iwstatus) {
	  res.send(iwstatus);
	  $( "#wlan1_ssid" ).val( data['ssid'] );
	});
});

module.exports = router;
