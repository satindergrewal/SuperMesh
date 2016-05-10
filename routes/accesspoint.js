var express = require('express');
var router = express.Router();

var fs = require('fs');
var sys = require('sys');

// SuperMesh app functions
var SuperMesh = require("../private/js/app_functions.js");

/* GET hostapd settings. */
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

/* POST to Update Access Point Settings. */
router.post('/update', function(req, res) {
	var APFile = 'private/system_scripts/hostapd_conf.data'
	var APData = ''
	var AP_BgnEnableDisable = '';
	var AP_AcEnableDisable = '';
	var AP_BgnChannel = '';
	var AP_AcChannel = '';

	/*fs.readFile(APFile, 'utf8', function (err,data) {
		if (err) {
			return console.log(err);
		}
		console.log('===== File Read Output ======');
		console.log(JSON.stringify(data, null, 2));
	});*/

	//console.log('======= req.body =======');
	//console.log(req.body.ap_ssid);
	//console.log(req.body.ap_country);
	//console.log(req.body.ap_pass);
	//console.log(req.body.ap_driver);
	//console.log(req.body.ap_bgn_ac);
	//console.log(req.body.ap_channel);

	if (req.body.ap_bgn_ac == 'bgn') {
		AP_BgnEnableDisable = '';
		AP_AcEnableDisable = '# ';
		AP_BgnChannel = req.body.ap_channel;
		AP_AcChannel = '44';
	} else if (req.body.ap_bgn_ac == 'ac') {
		AP_BgnEnableDisable = '# ';
		AP_AcEnableDisable = '';
		AP_BgnChannel = '2';
		AP_AcChannel = req.body.ap_channel;
	}

	APData = {
	"wlan_Interface": "wlan0",
	"AP_SSID": req.body.ap_ssid,
	"Country_Code": req.body.ap_country,
	"AP_Password": req.body.ap_pass,
	"AP_Driver": req.body.ap_driver,
	"AP_802_11n_Enabled_Disabled": AP_BgnEnableDisable,
	"AP_802_11n_Channel": AP_BgnChannel,
	"AP_802_11AC_Enabled_Disabled": AP_AcEnableDisable,
	"AP_802_11AC_Channel": AP_AcChannel
	}

	console.log('===>> Hostapd DATA recieved >>')
	console.log('=========== JSON Stringify ===========');
	console.log(JSON.stringify(APData, null, 2))

	// Write update changes to JSON file interfaces.data
	fs.writeFile(APFile, JSON.stringify(APData, null, 2), function (err) {
		if (err) return console.log(err)
			console.log(JSON.stringify(APData, null, 2));
			console.log('writing to ' + APFile);

			//Execute promissed spanw child process
			var Promise = require('bluebird');
			var exec = require('child_process').exec;

			function promiseFromChildProcess(child) {
			    return new Promise(function (resolve, reject) {
			        child.addListener("error", reject);
			        child.addListener("exit", resolve);
			    });
			}

			var edit_wpa = exec('sudo cf-agent -K private/system_scripts/hostapd_conf.cf');

			promiseFromChildProcess(edit_wpa).then(function (result) {
			    console.log('promise complete: ' + result);
			    console.log('=> hostapd file edited')
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


			var restart_hostapd = exec('sudo systemctl restart hostapd');

			promiseFromChildProcess(restart_hostapd).then(function (result) {
			    console.log('promise complete: ' + result);
			    console.log('=> Hostapd service restarted')
			    
			}, function (err) {
			    console.log('=> Error restarting Hostapd Service.')
			    console.log('promise rejected: ' + err);
			    
			});

			restart_hostapd.stdout.on('data', function (data) {
			    console.log('stdout: ' + data);
			    
			});
			restart_hostapd.stderr.on('data', function (data) {
			    console.log('stderr: ' + data);
			    
			});
			restart_hostapd.on('close', function (code) {
			    console.log('closing code: ' + code);
			    
			});
		});
	
	res.end('{"msg": "success","result": "result"}');
});


/* POST to Update Access Point Settings. */
router.get('/restartap', function(req, res, next) {
	//Execute promissed spanw child process
	var Promise = require('bluebird');
	var exec = require('child_process').exec;
	function promiseFromChildProcess(child) {
	    return new Promise(function (resolve, reject) {
	        child.addListener("error", reject);
	        child.addListener("exit", resolve);
	    });
	}

	var restart_hostapd = exec('sudo systemctl restart hostapd');
	promiseFromChildProcess(restart_hostapd).then(function (result) {
	    console.log('promise complete: ' + result);
	    console.log('=> Hostapd service restarted')
	    
	}, function (err) {
	    console.log('=> Error restarting Hostapd Service.')
	    console.log('promise rejected: ' + err);
	    
	});
	restart_hostapd.stdout.on('data', function (data) {
	    console.log('stdout: ' + data);
	    
	});
	restart_hostapd.stderr.on('data', function (data) {
	    console.log('stderr: ' + data);
	    
	});
	restart_hostapd.on('close', function (code) {
	    console.log('closing code: ' + code);
	    
	});

	res.send('{"msg": "success","result": "result"}');
});

module.exports = router;
