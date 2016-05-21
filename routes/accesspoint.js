var express = require('express');
var router = express.Router();

var fs = require('fs');
var sys = require('sys');

// SuperMesh app functions
var SuperMesh = require("../private/js/app_functions.js");
var lshw = require("../private/js/lshw.js");

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

router.get('/lshwnetwork', function(req, res, next) {
	lshw.status(function(err, status) {
		res.send(status);
		console.log(status);
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
		AP_BgnChannel = '1';
		AP_AcChannel = req.body.ap_channel;
	}

	var APDriver;

	lshw.status(function(err, status) {
		console.log(status);
		for (i = 0; i < status.length; i++) {
			//console.log(status[i]);
			if ( status[i].network === 'wlan0' ) {
				if ( status[i].driver === 'brcmfmac' ) {
					//console.log(status[i].driver);
					APDriver = 'nl80211'
				} else if ( status[i].driver === 'rtl8192cu' ) {
					APDriver = 'rtl871xdrv'
				} else {
					APDriver = req.body.ap_driver
				}
			}
		}
	});
	if 

	APData = {
	"wlan_Interface": "wlan0",
	"AP_SSID": req.body.ap_ssid,
	"Country_Code": req.body.ap_country,
	"AP_Password": req.body.ap_pass,
	"AP_Driver": APDriver,
	"AP_802_11n_Enabled_Disabled": AP_BgnEnableDisable,
	"AP_802_11n_Channel": AP_BgnChannel,
	"AP_802_11AC_Enabled_Disabled": AP_AcEnableDisable,
	"AP_802_11AC_Channel": AP_AcChannel
	}

	//console.log('===>> Hostapd DATA recieved >>')
	//console.log('=========== JSON Stringify ===========');
	//console.log(JSON.stringify(APData, null, 2))

	// Write update changes to JSON file interfaces.data
	fs.writeFile(APFile, JSON.stringify(APData, null, 2), function (err) {
		if (err) return console.log(err)
			console.log(JSON.stringify(APData, null, 2));
			console.log('writing to ' + APFile);

			//Execute promissed spanw child process
			SuperMesh.RunCmd('sudo cf-agent -K private/system_scripts/hostapd_conf.cf');
			SuperMesh.RunCmd('sudo systemctl daemon-reload');
			SuperMesh.RunCmd('sudo systemctl restart hostapd');
		});
	
	res.end('{"msg": "success","result": "result"}');
});


// POST to Update Access Point Settings.
router.get('/restartap', function(req, res, next) {
	SuperMesh.RunCmd('sudo systemctl daemon-reload');
	SuperMesh.RunCmd('sudo systemctl restart hostapd');
	res.send('{"msg": "success","result": "result"}');
});

module.exports = router;
