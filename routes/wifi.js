var express = require('express');
var router = express.Router();

var fs = require('fs');
var sys = require('sys');

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
		//var iwlist_demo_data = '[{"address":"00:0b:81:ab:14:22","ssid":"BlueberryPi","mode":"master","frequency":2.437,"channel":6,"security":"wpa","quality":48,"signal":87},{"address":"00:0b:81:95:12:21","ssid":"RaspberryPi","mode":"master","frequency":2.437,"channel":6,"security":"wpa2","quality":58,"signal":83},{"address":"00:0b:81:cd:f2:04","ssid":"BlackberryPi","mode":"master","frequency":2.437,"channel":6,"security":"wep","quality":48,"signal":80},{"address":"00:0b:81:fd:42:14","ssid":"CranberryPi","mode":"master","frequency":2.437,"channel":6,"security":"open","quality":32,"signal":71}]';
		//res.send(iwlist_demo_data);
		res.send(networks);
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
		//var wlan1_demo_data = '{"interface":"wlan1","access_point":"00:0b:81:95:12:21","frequency":2.437,"ieee":"802.11bg","mode":"master","noise":0,"quality":77,"sensitivity":0,"signal":50,"ssid":"RaspberryPi"}';
		//res.send(wlan1_demo_data);
		res.send(iwstatus);
	});
});

/* POST to Update WPA Settings. */
router.post('/wpa_supplicant/setup', function(req, res) {
	var wpaFile = '/opt/SuperMeshData/wpa_supplicant.data'
	var wpaData = ''
	var wpaSecurity = ''

	/*fs.readFile(wpaFile, 'utf8', function (err,data) {
		if (err) {
			return console.log(err);
		}
		console.log(JSON.stringify(data, null, 2));
	});*/

	//console.log('======= req.body =======');
	//console.log(req.body);
	//console.log(req.body.ssid);
	//console.log(req.body.security);
	//console.log(req.body.password);

	if (req.body.security === " open") {
		wpaSecurity = "NONE"
	}
	if (req.body.security === " wpa2" || req.body.security === " wpa" ) {
		wpaSecurity = "WPA-PSK"
	}

	//console.log(wpaSecurity);

	wpaData = {
	'WiFi_SSID' : req.body.ssid,
	'WiFi_Password' : req.body.password,
	'WiFi_Security_WPA_Open' : wpaSecurity,
	'psk_enable_disable' : (req.body.security === " open") ? "#" : ""
	}

	//console.log('===>> WPA DATA recieved >>')
	//console.log('=========== JSON Stringify ===========');
	//console.log(JSON.stringify(wpaData, null, 2))

	// Write update changes to JSON file interfaces.data
	fs.writeFile(wpaFile, JSON.stringify(wpaData, null, 2), function (err) {
		if (err) return console.log(err)
			console.log(JSON.stringify(wpaData, null, 2));
			console.log('writing to ' + wpaFile);

			//Execute promissed spanw child process
			SuperMesh.RunCmd('sudo cf-agent -K private/system_scripts/wpa_supplicant_config.cf; sudo rm /etc/wpa_supplicant/wpa_supplicant.conf.cf-before-edit; sudo systemctl daemon-reload; sudo ifdown wlan1 && sudo ifup wlan1');
			//SuperMesh.RunCmd('sudo systemctl restart networking');
			//SuperMesh.RunCmd('sudo systemctl restart isc-dhcp-server');
			//SuperMesh.RunCmd('sudo systemctl restart hostapd');

		});
	
	res.end('{"msg": "success","result": "result"}');
});

// POST to Update Access Point Settings.
router.get('/restartwifi', function(req, res, next) {
	SuperMesh.RunCmd('sudo ifdown wlan1 && sudo ifup wlan1');
	res.send('{"msg": "success","result": "result"}');
});

module.exports = router;
