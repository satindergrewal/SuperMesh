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
		var iwlist_demo_data = '[{"address":"00:0b:81:ab:14:22","ssid":"BlueberryPi","mode":"master","frequency":2.437,"channel":6,"security":"wpa","quality":48,"signal":87},{"address":"00:0b:81:95:12:21","ssid":"RaspberryPi","mode":"master","frequency":2.437,"channel":6,"security":"wpa2","quality":58,"signal":83},{"address":"00:0b:81:cd:f2:04","ssid":"BlackberryPi","mode":"master","frequency":2.437,"channel":6,"security":"wep","quality":48,"signal":80},{"address":"00:0b:81:fd:42:14","ssid":"CranberryPi","mode":"master","frequency":2.437,"channel":6,"security":"open","quality":32,"signal":71}]';
		res.send(iwlist_demo_data);
		//res.send(networks);
	});

});

/*router.get('/wlan1status', function(req, res, next) {
	var wlan1status = require('wireless-tools/ifconfig');
 
	wlan1status.status('wlan1',function(err, status) {
	  res.send(status);
	});
});*/

router.get('/iwconfig', function(req, res, next) {
	var wlan1iwconfig = require('wireless-tools/iwconfig');
 
	wlan1iwconfig.status(function(err, iwstatus) {
	  res.send(iwstatus);
	});
});

router.get('/iwconfig/wlan1', function(req, res, next) {
	var wlan1iwconfig = require('wireless-tools/iwconfig');
 
	wlan1iwconfig.status('wlan1',function(err, iwstatus) {
		var wlan1_demo_data = '{"interface":"wlan1","access_point":"00:0b:81:95:12:21","frequency":2.437,"ieee":"802.11bg","mode":"master","noise":0,"quality":77,"sensitivity":0,"signal":50,"ssid":"RaspberryPi"}';
		res.send(wlan1_demo_data);
		//res.send(iwstatus);
	});
});

/* POST to Update Network Settings. */
router.post('/wpa_supplicant/setup', function(req, res) {

	/*fs.readFile(interfacesFile, 'utf8', (err, data) => {
	  if (err) throw err;
	  console.log(JSON.stringify(data));
	});*/	

	console.log('======= req.body =======');
	console.log(req.body);
	//console.log('====== req.body.eth0_enable_disable ======');
	//console.log(req.body.eth0_iface);

	//req.body.eth0_enable_disable = ''
	//req.body.eth1_enable_disable = ''
	//req.body.wlan0_enable_disable = ''
	//req.body.wlan1_enable_disable = ''

	res.end('{"msg": "success","result": "result"}');
});


module.exports = router;
