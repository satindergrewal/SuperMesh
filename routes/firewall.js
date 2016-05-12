var express = require('express');
var router = express.Router();

var fs = require('fs');
var sys = require('sys');

// SuperMesh app functions
var SuperMesh = require("../private/js/app_functions.js");

/* GET hostapd settings. */
router.get('/', function(req, res, next) {
  res.render('firewall', {title: 'Controle Centre Admin'});
});

router.get('/getsettings', function(req, res, next) {

	var ifoutput;
	fs.readFile('private/system_scripts/firewall_iptables.data', 'utf8', function (err, data) {
	  if (err) throw err;
	  ifoutput = JSON.parse(data);
	  res.send(ifoutput);
	});
});

/* POST to Update Access Point Settings. */
router.post('/update', function(req, res) {
	var iptablesFile = 'private/system_scripts/firewall_iptables.data'
	var iptablesData = ''

	/*fs.readFile(iptablesFile, 'utf8', function (err,data) {
		if (err) {
			return console.log(err);
		}
		console.log('===== File Read Output ======');
		console.log(JSON.stringify(data, null, 2));
	});*/

	//console.log('======= req.body =======');
	//console.log(req.body.ap_ssid);

	iptablesData = {
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

	//console.log('===>> Hostapd DATA recieved >>')
	//console.log('=========== JSON Stringify ===========');
	//console.log(JSON.stringify(iptablesData, null, 2))

	// Write update changes to JSON file interfaces.data
	fs.writeFile(iptablesFile, JSON.stringify(iptablesData, null, 2), function (err) {
		if (err) return console.log(err)
			console.log(JSON.stringify(iptablesData, null, 2));
			console.log('writing to ' + iptablesFile);

			//Execute exec commands child process
			SuperMesh.RunCmd('sudo cf-agent -K private/system_scripts/firewall_iptables.cf');

			//Enable IPv4 forwarding
			SuperMesh.RunCmd('sudo sh -c "echo 1 > /proc/sys/net/ipv4/ip_forward"');

			//Enable Masquerading on eth0 interface, the Internet Interneface
			SuperMesh.RunCmd('sudo iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE');

			//Forward any packet coming from eth0 (Internet) interface to wlan0 (Access Point) interface
			SuperMesh.RunCmd('sudo iptables -A FORWARD -i eth0 -o wlan0 -m state --state RELATED,ESTABLISHED -j ACCEPT');

			//Forward any packet coming from wlan0 (Access Point) interface to eth0 (Internet) interface
			SuperMesh.RunCmd('sudo iptables -A FORWARD -i wlan0 -o eth0 -j ACCEPT');

			//Save updated iptables rules to ipv4 file
			SuperMesh.RunCmd('sudo sh -c "iptables-save > /etc/network/iptables.ipv4.nat"');
		});
	
	res.end('{"msg": "success","result": "result"}');
});


// POST to Update Access Point Settings.
router.get('/restartiptables', function(req, res, next) {
	SuperMesh.RunCmd('sudo systemctl daemon-reload');
	SuperMesh.RunCmd('sudo systemctl restart iptables');
	res.send('{"msg": "success","result": "result"}');
});

module.exports = router;
