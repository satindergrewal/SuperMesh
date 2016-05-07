var express = require('express');
var router = express.Router();

var fs = require('fs');
var sys = require('sys');

// SuperMesh app functions
var SuperMesh = require("../private/js/app_functions.js");

/* GET network settings. */
router.get('/', function(req, res, next) {
  res.render('accesspoint', {title: 'Controle Centre Admin'});
});

router.get('/getsettings', function(req, res, next) {

	var ifoutput;
	fs.readFile('private/system_scripts/hostapd_conf.data', 'utf8', function (err, data) {
	  if (err) throw err;
	  ifoutput = JSON.parse(data);
	  res.send(ifoutput);
	});
});

/* POST to Update Network Settings. */
router.post('/wpa_supplicant/setup', function(req, res) {
	var wpaFile = 'private/system_scripts/wpa_supplicant.data'
	var wpaData = ''
	var wpaSecurity = ''

	/*fs.readFile(wpaFile, 'utf8', function (err,data) {
		if (err) {
			return console.log(err);
		}
		console.log(JSON.stringify(data, null, 2));
	});*/

	console.log('======= req.body =======');
	console.log(req.body);
	console.log(req.body.ssid);
	console.log(req.body.security);
	console.log(req.body.password);

	if (req.body.security === " open") {
		wpaSecurity = "NONE"
	}
	if (req.body.security === " wpa2" || req.body.security === " wpa" ) {
		wpaSecurity = "WPA-PSK"
	}

	console.log(wpaSecurity);

	wpaData = {
	'WiFi_SSID' : req.body.ssid,
	'WiFi_Password' : req.body.password,
	'WiFi_Security_WPA_Open' : wpaSecurity,
	'psk_enable_disable' : (req.body.security === " open") ? "#" : ""
	}

	console.log('===>> WPA DATA recieved >>')
	console.log('=========== JSON Stringify ===========');
	console.log(JSON.stringify(wpaData, null, 2))

	// Write update changes to JSON file interfaces.data
	fs.writeFile(wpaFile, JSON.stringify(wpaData, null, 2), function (err) {
		if (err) return console.log(err)
			console.log(JSON.stringify(wpaData, null, 2));
			console.log('writing to ' + wpaFile);

			//Execute promissed spanw child process
			var Promise = require('bluebird');
			var exec = require('child_process').exec;

			function promiseFromChildProcess(child) {
			    return new Promise(function (resolve, reject) {
			        child.addListener("error", reject);
			        child.addListener("exit", resolve);
			    });
			}

			var edit_wpa = exec('sudo cf-agent -K private/system_scripts/wpa_supplicant_config.cf');

			promiseFromChildProcess(edit_wpa).then(function (result) {
			    console.log('promise complete: ' + result);
			    console.log('=> Network file edited')
			    //res.send('{"msg": "success","result": result}');
			}, function (err) {
			    console.log('promise rejected: ' + err);
			    //res.send(err);
			});

			edit_wpa.stdout.on('data', function (data) {
			    console.log('stdout: ' + data);
			    
			});
			edit_wpa.stderr.on('data', function (data) {
			    console.log('stderr: ' + data);
			    
			});
			edit_wpa.on('close', function (code) {
			    console.log('closing code: ' + code);
			    
			});


			var restart_network = exec('sudo systemctl restart networking');

			promiseFromChildProcess(restart_network).then(function (result) {
			    console.log('promise complete: ' + result);
			    console.log('=> Network service restarted')
			    
			}, function (err) {
			    console.log('=> Error restarting Network Service.')
			    console.log('promise rejected: ' + err);
			    
			});

			restart_network.stdout.on('data', function (data) {
			    console.log('stdout: ' + data);
			    
			});
			restart_network.stderr.on('data', function (data) {
			    console.log('stderr: ' + data);
			    
			});
			restart_network.on('close', function (code) {
			    console.log('closing code: ' + code);
			    
			});
		});
	
	res.end('{"msg": "success","result": "result"}');
});

module.exports = router;
